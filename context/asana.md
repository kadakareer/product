# Asana workspace reference

Workspace: `1203839320272888` (kadakareer.com)

## Projects

- **Programs - Product** — `1216814037200456` — https://app.asana.com/1/1203839320272888/project/1216814037200456
  Working board: epics (parent tasks) + subtasks (child tasks) together, organized into status sections.
  Custom fields: `Sprint` (enum), `User Impact Level` (enum), `Work Type` (enum, includes "Epic"), `Points` (enum), `Status` (enum, epic-level values are prefixed `(EPIC) ...` e.g. "(EPIC) Scoping", "(EPIC) In Development", "(EPIC) IN UAT"), `Task Type` (multi_enum), `Status details` (text), `Sprints` (multi_enum).
  Sections: Ready to Start, In Progress, Blocked, For Review, Done, On hold, Cancelled.

- **Epics** — `1217975917095947` — https://app.asana.com/1/1203839320272888/project/1217975917095947
  Created 2026-08-30 as a dedicated home for epics as standalone objects, split out of Programs - Product.
  Contains only epic-level rows (10, snapshotted from Programs - Product's parent tasks with `Work Type: Epic`) — no subtasks duplicated here; subtasks continue to live in Programs - Product only, and there is deliberately **no back-link** between the two boards (agreed to avoid two places tracking the same status).
  Sections represent epic status stage (mirrors the source `Status` field's `(EPIC) ...` values): Scoping, In Development, In UAT, Blocked, On hold, Done, Cancelled.
  Each task's description starts with a small metadata header (Impact, Sprint estimate, Linked-tasks-count snapshot) followed by the original epic body text copied from Programs - Product at creation time. These are plain text, not typed custom fields — the MCP Asana tools available here can attach *existing* custom fields to a project but cannot create new field definitions or resolve enum option IDs, so epic metadata is embedded in the description instead of a real custom field.

## Notes on the Asana MCP integration

- Auth: OAuth via `/mcp` → "claude.ai Asana". Once connected, tools are named `mcp__claude_ai_Asana__*`.
- No tool exists to create a new custom field definition, or to fetch an existing field's dropdown option GIDs — `update_project`'s `add_custom_fields` can only attach *existing* fields to a project, and setting an enum value elsewhere requires an option GID you have no way to look up. Work around this by using sections and/or description text for anything that needs new categorical data.
- `get_tasks` can occasionally throw a transient `socket connection was closed` error on large projects — retry with narrower `opt_fields`.
- No `duplicate_task`/clone tool exists, and no attachment-upload tool exists (`get_attachments` is read-only). This matters for copying tasks — see below.

### Description/body formatting limitations (found copying epics into the Epics project, 2026-08-30)

- Task descriptions have two API fields: `notes` (plain text) and `html_notes` (rich text). When the Epics project was first populated, both the read (`get_task`) and write (`create_project`/`create_tasks`) calls used `notes`, so all formatting was flattened to plain text — bullets became indentation, links became bare URLs. **This part is fixable**: re-fetch with `html_notes` and write back with `html_notes` to preserve bold/italic/underline/strikethrough, `<ul>`/`<ol>`/`<li>` lists, `<h1>`/`<h2>` headings, links, blockquotes, and code blocks — `html_notes`'s allowed element set (per the tool schemas) is `body, strong, em, u, s, code, ol, ul, li, a, blockquote, pre, h1, h2, hr, img`.
- **Tables are not fixable via this integration.** The Asana app's own editor does support inserting a real table (columns/rows, resizable, images and lists inside cells) — confirmed by the user, don't doubt this. But `html_notes`'s allowed-element list has no `<table>`, so the API path this integration writes through cannot create, and likely cannot faithfully read back, a table that exists in a task description. If a task has a real table, expect it to degrade to plain text (or drop) when fetched via `notes`/`html_notes`, and there is no way to author one through these tools. Workarounds if tabular data is needed: an attached image of the table, a linked Google Sheet, or a spacing-aligned plain-text grid in a `<pre>` block (not a real table, but stays readable).
- **Images require download + re-upload, and no tool exists to do the upload half.** Links like `.../get_asset?asset_id=...` in a description point to an attachment object scoped to a specific task. To have an image actually render inline (`<img>`) in a *different* task's description, that image must first exist as an attachment on the *destination* task — you can't point `<img>` at an attachment living on another task. `get_attachments` can read/download the source file, but there's no create/upload-attachment tool in this integration to put it on the new task. Net effect: images can't be carried over as true embeds between tasks right now; at best, keep the original `get_asset` URL as a plain clickable link (opens the image, doesn't render inline).
