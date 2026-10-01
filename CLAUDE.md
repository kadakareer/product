@.claude/docs/writing-style.md
@.claude/docs/dev-workflow.md

# Product workspace

Product management for Kadakareer: epics, tickets, prototypes, and context for scoping work. Code lives in other repos, readable from here.

## Where to look

Route by the question, not by layer.

| Question | Source |
|---|---|
| What does the product do today? | v2 code |
| How will it be built? What's the target? | v3 code, its ADRs, its agent rules |
| How do VirApp or events work? | The matching domain doc in `context/` |
| How far along is v3 versus v2? | "v3 status" in the domain doc |
| How do the two frontends differ for a ticket? | Frontend conventions doc |
| Where do epics and tasks live? | Asana reference doc |
| Why does it matter, for whom, how urgent? | Business side. Not wired up yet, so ask. |

## Generation rule

- v2 is the live product. Read it for **behavior**, never for how to build.
- v3 is the rewrite. Read it for the **target**, not for what users have today.
- A ticket that changes behavior cites v2
- A ticket about how to build cites v3
- Prefer v3 when there's a genuine choice. Confirm with engineers.

## Reading order

1. The context index
2. The domain doc: "v2 today", then "v3 status"
3. Code, only to verify a claim or when the doc is silent
4. Recheck any doc whose "last checked" date is old

## Working in other repos

- Read access only from here. Don't edit, commit or push there unless asked.
- Don't copy engineering rules into this repo. Link to the repo that owns them.
- Backend asks for approval before using the Explore agent. Ask first.
- Some repos carry uncommitted work. Don't touch it.

## Reference

| What | Where |
|---|---|
| Context index | `context/README.md` |
| Repo locations by generation | `context/repositories.md` |
| VirApp | `context/virapp.md` |
| Events | `context/events.md` |
| Frontend differences | `context/frontend-conventions.md` |
| Asana | `context/asana.md` |
| v2 frontend | `app-playground`, rules in its `Context.md` and `AGENTS.md` |
| v2 backend | `monorepo`, rules in its `Context.md` and `AGENTS.md` |
| v3 frontend | `app`, rules in `AGENTS.md`, `docs/ai/` and `ADR/` |
| v3 backend | `backend`, rules in `CLAUDE.md` and `docs/adr/` |
