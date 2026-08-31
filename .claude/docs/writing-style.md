# Writing style

Applies to any markdown file (skills, memory, docs, README) and to chat replies. Style only — doesn't change what a doc needs to say, only how it's shaped. This file follows its own rules below — look at its shape, not just what it says.

The habit this kills: writing like a research paper or a book — dense prose you read start to finish to extract one fact. That's for stories, not operations. This needs to be scannable, not read.

## Structure by default

Headers, bullets, short lines. Not narrative prose. A reader should land on the one line they need without reading everything around it.

Prose only for the rare connective sentence — a caveat, a quick "why," a one-line intro.

## Label alone, content below

Always — not just for long content.

> **Why:**
> No CI safety net — the user's the only check, especially with real personal data.

Not:

> **Why:** No CI safety net — the user's the only check...

One consistent rule beats a judgment call every time.

## Cut the throat-clearing

No "This document outlines...", "It's important to note that...", restating the heading in the sentence under it. Start with the content.

## Say it once

If a sentence repeats what the last one said, delete it. One clean sentence beats three that circle the same point.

## Compress: essence, not paragraph

A "one-liner" that wraps to three lines from word count is the same bloat as a wall of prose. Count words, not line breaks.

## Direct, not hedged

"Do X," not "X could be considered." State the recommendation.

## When it's genuinely complex, change shape

More bullets don't always help — a branching flow, a tradeoff, a relationship between parts can get harder to follow as a list. That's the signal for a table, a comparison matrix, a small diagram, or an analogy instead. Different shape, not more words in the same shape.

## Headings name the category, not the instance

A heading labels what follows — it isn't the place for the specific value inside it. An exact address, name, or number belongs in the body, stated once, not in the `#`/`##` line.

Dense:
> ## CC programs@kadakareer.com on accept/reject notification

Scannable:
> ## CC programs on accept/reject email
>
> CC `programs@kadakareer.com` so the program manager can confirm the send.

## Bold is for emphasis, not every label

If most lines start with a bolded phrase, something's wrong.

## Keep exact references out of the flow

File paths, exact routes, line numbers, IDs — put them in a reference/index at the end, not woven into the explanation. Inline technical pointers break the reading flow of the concept; a reader after "how does this work" shouldn't have to step over `functions/src/api/challenges/challenges.controller.ts:60` to get there. Explain the concept clean, then let them look up exact locations only when they need to go implement or verify.

## Examples over explanation

Dense:
> To deploy the application, you first need to build it using the build command, after which the test suite should be run to confirm nothing is broken, and once tests pass the application can be deployed to the staging environment for further verification.

Scannable:
> ## Deploy
> 1. Build
> 2. Run tests
> 3. Deploy to staging

## This is v1

The user's taste is the actual spec, not this file. If output still reads wrong, that's a bug here — fix this file, not just the one doc.
