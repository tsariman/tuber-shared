# Listing Design Documentation

The Tuber app's goal is to allow users to save moments in online videos that they can return and watch when needed.
These online videos are on major platforms such as YouTube, Rumble, Odysee, Dailymotion, Vimeo... etc.
As of now, when a user decides to save a video moment, he can only access and watch that moment again if he search his bookmarks for it.
Some users may not find it convenient to have to search for a moment that was previously bookmark.
To fix that, we need to implement the `listing` feature. A listing is a set a video moments grouped together into a list.

## Relevant Files

* `tuber-client/src/webapps/tuber/callbacks/prod.bookmarks.200.filter.ts`
* `tuber-server/src/schema/listing/index.ts`
* `tuber-server/src/model/listing/index.ts`
* `tuber-server/src/routes/listings/index.ts`
* `tuber-server/src/routes/listings/post.listing.ep.ts`
* `tuber-server/src/routes/listings/get.listing.by.id.ep.ts`
* `tuber-client/src/webapp/tuber/view/tuber.css`
* `tuber-server/src/state/bootstrap/theme.ts`

## Missing Relevant Files

* `tuber-server/src/routes/listings/delete.listing.by.id.ts`
* `tuber-server/src/routes/listings/patch.listing.by.id.ts`
* `tuber-server/src/state/dialog/listing.manager.dialog.state.ts`
* `tuber-server/src/state/form/listing.manager.form.state.ts`
* `tuber-server/test/routes/listings.post.listing.ep.test.ts`
* `tuber-server/test/routes/listings.get.listing.by.id.ep.test.ts`

## Implementation Findings (May 13, 2026)

- Listing schema is already implemented in the server with listing metadata, bookmark references, and text index support.
- Listing model functions already exist for create, read by id, pagination, and document count.
- `GET /listings/:id` is implemented with an aggregation pipeline that resolves bookmark references and returns JSON:API response data with `included` bookmarks.
- `POST /listings` handler exists in code, but it was not registered in the listings router.
- Listing creation previously trusted `user_id` from request attributes, which allows user ownership spoofing if not overridden by authenticated context.

## Required Tasks

#### MVP (Do first)

- [x] Register `POST /listings` in the listings router.
- [x] Enforce listing ownership by deriving `user_id` from authenticated request context (`req.usr`) in the POST endpoint.
- [ ] Add GET listing privacy guard so private listings are only visible to the owner.
- [ ] Add/update tests for listing route registration and ownership enforcement.

#### Phase 2 (After MVP)

- [ ] Decide whether listing `name` uniqueness must be global or scoped per user.
- [ ] Harden bookmark id conversion in listing aggregation to avoid pipeline failure on invalid `bookmark_id` values.

### UI

#### MVP (Do first)
- [ ] Decide whether the listing manager will be implemented using multiple forms in multiple dialogs.
- [ ] Create a mock of listing manager dialog(s) with form fields.
- [ ] Create the listing manager form state.
- [ ] Add a button to create a new listing.
- [ ] Add a scrollable area to show existing listings.
- [ ] Add a text field to filter existing listings.
- [ ] Add a button to edit an existing listing.
- [ ] Add a button to delete an existing listing.
- [ ] Add a button to change the listing slug.
- [ ] Create the listing manager dialog state and render the listing manager form inside it.
- [ ] Add an appbar button link to open the listing manager dialog.

#### Phase 2 (After MVP)
- [ ] Listing's list of bookmarks could be rearranged using drag and drop.
- [ ] Implement a mini toolbar above listing's bookmark list to add, select, or remove bookmarks from listing.
- [ ] Restyle the Tuber interface.

## Immediate Fixes Applied

- `POST /listings` route registration was added.
- Listing creation now rejects unauthenticated requests and always sets `user_id` from authenticated user context.