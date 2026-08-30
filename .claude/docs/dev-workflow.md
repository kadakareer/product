# Dev workflow

Standing rules for multi-step coding work. Always in effect — not conditional on task type.

## Commit ownership

Never stage, commit, or push without being told to, that turn. Implement the change, then stop. The user reviews, tests, and commits themselves.

## Chunk by testability, not size

Split multi-step work into pieces the user can independently exercise and judge — not just "smallest possible diff."

Bundle steps together when one is meaningless without the other: a removal plus its replacement, a relay server plus the client that talks to it. A chunk that leaves things in a broken-looking, untestable middle state is the wrong cut point.

## New work vs. existing work

- Brand-new page/feature: build the first full version in one pass. Nothing exists yet to regress, so chunking just adds overhead.
- Existing working code: default back to chunk-by-chunk, stop-for-review.

## Confirm-then-act

Answer a yes/no or status question with just the answer — no side-effect edit. If the user follows up with anything that reads as "okay, apply that" (even terse), execute directly. Don't ask again or re-litigate whether it's authorized.

## When "still broken" persists

Before another fix attempt, confirm what the user is actually testing in — real deploy vs. an editor-embedded preview, cache state, which environment. A mismatch there produces symptoms that look exactly like the fix failed.
