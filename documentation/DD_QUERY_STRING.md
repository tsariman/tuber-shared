# Query String Design Documentation

As currently implemented, the Tuber app has no way to share or remember the app state for loaded or playing bookmarks. The URL could easily hold the necessary information in the query string to make this possible.

## Example Query String

```
https://bookmarktube.com?filter[search_mode]=public&filter[search]=foobar&filter[player_open]=true&filter[show_thumbnail]=true&filter[playing_bookmark_key]=684a4f7a10e1f0d4a6d18d2c
```

In the URL query string above, the following variables and values are available:

```ts
// The query string is converted to the following object:
const filterObject = {
  filter: {
    searchMode: 'public',
    search: 'foobar', // User search query that produced the bookmark list (max 255 chars)
    playerOpen: true,
    showThumbnail: true,
    playingBookmarkKey: '684a4f7a10e1f0d4a6d18d2c' // Prefer Mongo ObjectID for direct bookmark lookup
  }
};
```

### Query Variable Rules

- `search_mode` must be one of: `public`, `private`, `all`.
- `search` must be a non-empty string with a maximum length of 255 characters.
- `playing_bookmark_key` is optional and stores only a bookmark identity value (prefer `_id` / ObjectID).
- `playing_bookmark_page` is deprecated and should not be used for bootstrap lookup.
- Missing query variables, invalid values, or an over-length `search` must prevent URL updates until state is valid.

## What Must Happen

### Search Query Capture
- When the user performs a search using the search field, capture the search parameters
  (search mode, search text, etc.).

### URL Query String Update
- Update the URL query string to reflect the captured search parameters after the bookmark
  list is received (if any).
- Build the full query string first, then run `encodeURIComponent()` on each dynamic value
  before updating the browser URL.

### History State Management
- When the user performs another search, update the current URL without creating a new entry
  in the browser's history stack. This prevents history bloat from multiple intermediate searches.

### Browser Navigation Support
- Ensure the browser's back and forward buttons navigate between distinct search states rather
  than intermediate ones, so users can easily revisit previous searches without stepping
  through every intermediate search they performed.

## State Persistence

Query string values are **not truly persisted** on the server for layout state. Instead, they are
read at bootstrap time and merged into the state returned to the client.

- `search_mode`, `search`, `playing_bookmark_key` — reflect the last known search context.
- `player_open` — controls whether the player should open after bootstrap.
- `show_thumbnail` — controls whether thumbnails should be shown after bootstrap.
- `playing_bookmark_key` remains in the query string even when `player_open` is `false`. It
  represents the last selected bookmark key regardless of player state.

If `playing_bookmark_key` does not resolve to a bookmark in the active list, `bookmarkToPlay`
must be set to `undefined`.

## Currently Playing Bookmark Across Pages

Because bookmark collections keep growing, page positions drift over time. A bookmark that was
on page N when the URL was created may no longer be on that page later.

Decision:

- Resolve `playing_bookmark_key` using a model-level page resolver scoped to the active
  search context (`search_mode`, `search`, auth visibility).
- Determine the containing page by computing bookmark rank/page in the filtered result set
  with deterministic ordering (for example, search score + tie-breakers, or recency order
  when no search query is present).
- Return the full search-result page where the playing bookmark is located, using normal
  pagination semantics (`data.bookmarks`, pagination links, and page metadata).
- If `playing_bookmark_key` is missing or does not resolve within the active search result set,
  return the normal first page of the search query.
- Do not rely on stale stored page-number metadata for bookmark resolution.

Implementation note: server-side page resolution is performed by `resolve_bookmark_page_by_query` in `tuber-server/src/model/bookmark/read.bookmark.collection.by.query.ts`.

### Bootstrap Composition Rule

When `pageSize = 25`, return exactly one standard page of search results (25 bookmarks) in
`data.bookmarks`.

- If the currently playing bookmark resolves within the active search result set, return the full
  page that contains that bookmark.
- If the currently playing bookmark does not resolve in the active search result set, return the
  normal first page.
- Never prepend or append the currently playing bookmark outside the selected page, and never
  return 26 items.

The bootstrap response now carries this state through `pagesData` and the bookmark list data in
`get_bootstrap_authenticated_state` and `post_state_bootstrap_endpoint`.

> **Note:** Query-string values should always be applied during bootstrap, regardless of
> authentication state (including when `sessionValid` is `true`). This supports opening shared
> links in new tabs with full layout restoration.

## Deep Linking & Initial Load Strategy

The app uses a **single history state per session** approach:

- Query string parameters are **read before the bootstrap request is made**. No URL updates
  occur during initialization.
- Query string parameters are forwarded as part of the bootstrap request. The server returns
  `data.bookmarks` pre-filled in the bootstrap response — no additional fetch is needed after
  bootstrap to restore the bookmark list.
- When assembling `data.bookmarks` to return (bootstrap or query-based list restoration),
  filter out non-published bookmarks if the user is not authenticated or the bookmark do not belong to the authenticated user.
- The bookmarks list should include bookmark vote data in the bootstrap response when votes are
  available, so the client can render vote state without an extra fetch.
- When `search` is missing from the query string:
  - If `search_mode` is `public` or `all`, `data.bookmarks` is returned as an empty collection.
    The initial list remains empty client-side until the user performs a search.
  - If `search_mode` is `private`, the server includes the most recent 25 bookmarks created by
    the authenticated user in `data.bookmarks`.
  - The `private` fallback requires a dedicated query path (or aggregation pipeline) that
    filters by current user and sorts in reverse chronological order by bookmark creation time.
- **Only one URL history entry**: All URL updates use `replaceState()`, preventing back/forward
  navigation from stepping through intermediate searches.
- **No URL change detection required**: The app does not monitor URL changes. The query string
  is only read once at bootstrap time.

## Bootstrap No-Search Rules

When `filter[search]` is absent or blank at bootstrap:

- `filter[search_mode]=public` => return empty `data.bookmarks`.
- `filter[search_mode]=all` => return empty `data.bookmarks`.
- `filter[search_mode]=private` => return the 25 most recently created bookmarks for the current user.

Implementation requirements:

- Enforce auth for the `private` fallback. If no authenticated user, return empty
  `data.bookmarks`.
- Use deterministic ordering for recents (recommended: `created_at desc`, then `_id desc` as
  tie-breaker).
- Keep response shape identical to normal bookmark collection loading (same JSON:API resource
  mapping and included vote documents when available).

## Visitor Dialog Rule

During bootstrap, `visitorAlertDialogState` must be suppressed when `filter[search]` is valid
(non-empty and <= 255 chars after trim). In that case, the initial dialog state should not
present the visitor alert.

## URL Update Strategy

URL updates are deferred and conditional:

- **Deferred via debounce**: The URL update should be debounced instead of immediate
  scheduling. Use **150 ms** as the default debounce duration, which is typically fast enough
  to feel instant while preventing redundant updates during rapid UI interactions.
- **Conditional on change**: Before calling `replaceState()`, the settled state is diffed
  against the current URL. The update is skipped if nothing has changed.
- **Suppressed on invalid state or errors**: If required values are missing, values are invalid,
  `search` exceeds 255 chars, or a server request fails (e.g., a bookmark fetch error), the URL
  is not updated. The URL always reflects the last known good state.
- **Guarded by a single flag**: Use a boolean guard (e.g. `canUpdateQueryString`) that is set
  to `true` only when all preconditions pass. Call `replaceState()` only when the flag is `true`.

The following user interactions trigger a URL update (subject to the rules above):

| Interaction              | Triggers URL update? |
|--------------------------|----------------------|
| Submit a search query    | Yes                  |
| Select a bookmark        | Yes                  |
| Open / close the player  | Yes                  |
| Toggle thumbnail display | Yes                  |
| Any interaction on error | No                   |

