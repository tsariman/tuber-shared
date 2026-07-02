# Design Document - To do list

**Legend:**
* :heavy_check_mark: Done
* :clock3: In progress

## To do list

* :heavy_check_mark: Fix that you can longer bootstrap the app at a specific endpoint.
* :heavy_check_mark: Check included states server-side in the authentication phase. The AI 
  included states. You should remove them.
* :heavy_check_mark: Fix the form to edit or create a youtube bookmark. Make sure grammarly
        cannot break the layout by adding `overflowx: hidden`
* :heavy_check_mark: Make sure that user cannot submit edits with any platform if there are no
  changes to the bookmark.
* :heavy_check_mark: Make sure that a username max length is enforce so people cannot create
  crazy long username.
* :heavy_check_mark: Restore the functionality in the dev-install page that resets the database
* :heavy_check_mark: Restore and update the functionality in the dev-install page that populates the database with thousands of bookmarks for testing.
  * :heavy_check_mark: These bookmarks need to be named to indicate the page they are on and the order they are in. A page is 25 bookmarks.
* :heavy_check_mark: Activate and use snackbars for feedback
* :clock12: Add `bookmarkCount` to user schema that will increment when the 
  creates a new bookmark and decrement when the user deletes a bookmark.
* :clock1: Deleted bookmark should be reassigned too an internal user with name
  `delbook`. The bookmark `user_id` will be updated with the `delbook` user id.
* :clock3: Update all forms to not clear out unless successfully submitted
* :clock3: Add "publish" switch to unknown bookmark edit
* :clock3: Enforce publishing rules
* :clock3: For people who are not paying the $3.34 required to publish bookmark,
  make it so when they toggle the publish switch, it opens a page to
  your patreon to pay the tier required to publish bookmarks.
