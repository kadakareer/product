---
name: ticket-scoping
description: How to scope a ticket/spec for a piece of work under an epic — explore broad first, split into a focused doc only once something concrete crystallizes. Use when drafting a ticket, spec, or scoping doc for a feature/epic, not for general documentation.
---

Follows `.claude/docs/writing-style.md` — read it first, this skill governs *when to split*, not *how to format*.

## Explore before you split

Don't pre-create ticket files for things still being figured out. Research and reason through the area first — in chat, or one scratch doc — until a specific, actionable change is clear. A half-formed idea in its own file is clutter; the same idea, clear, in its own file is a real artifact.

## One doc, one crystallized piece

Once something concrete emerges (a specific field to add, a specific flow to build), extract *only that piece* into its own file — not the whole exploration, not the reasoning that got you there. The reasoning was worth having once, live; the doc is for what you'll actually reference later.

## Folder per epic, file per piece

`tickets/<epic-name>/<piece-name>.html` — e.g. `tickets/virapp-admin/backend-changes.html`. As more pieces of the same epic crystallize, they become sibling files in the same folder, not sections bolted onto one growing doc. New epics become sibling folders under `tickets/`.

`tickets/index.html` lists every epic and its pieces (mirrors the root `index.html` prototype listing). Add a link there whenever a new epic folder or a new piece file is created — it's hand-maintained, not generated.

## HTML, not markdown

A scoped piece is reader-facing — it needs to open for anyone, formatted, with zero tooling (no MD viewer, no git host rendering it). A single self-contained `.html` file with light inline `<style>` does that; a raw `.md` file opened directly just shows as plain text.

This is specific to scoped-piece deliverables. Skills, `CLAUDE.md`, and context docs stay markdown — Claude Code only reads those as `.md`, and they're not meant to be opened standalone in a browser.

## Shape of a scoped piece

Copy `template.html` (in this skill's folder) as the starting point for any new ticket file — it has the card layout, the What/Where table, and the reference/note/path patterns already wired up. Don't rebuild this structure from scratch each time.

What each part is for:
- One `<section class="card">` per crystallized piece — each item its own visually separated card, not sections bolted onto one long scroll.
- `<h2>`: the specific change, named plainly (what it does, not a ticket number).
- Optional visual (screenshot, mockup, small diagram) right after the intro, before "Technical solution" — only when there's something to actually show; delete the placeholder otherwise.
- The "Technical solution" table matches writing-style's "keep exact references out of the flow" — a reference (name + file path) never sits inline in prose.
- A "Where" cell with more than one file/method: bullet them, one per line — never crammed onto one line with `/` or commas.
- A reference's name and its file path stack on separate lines (the template's `.path` span) — never joined with an em dash, which wraps badly on long paths.
- A clause that qualifies a reference rather than naming another one (a caveat, current behavior) is subordinate to it — the template's `.note` callout, not tacked onto the reference line.

Don't add sections nothing asked for (acceptance criteria, estimates, background story) unless the user wants them — this mirrors the user's actual scoping process, not a template to fill in blindly.
