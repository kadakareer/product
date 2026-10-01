# Context index

Start here. Pick the doc by the question you're asking.

## Which doc

| Question | Doc |
|---|---|
| Which repo is what, and where is it? | [repositories.md](repositories.md) |
| How do Virtual Apprenticeship signups, groups, submissions and emails work? | [virapp.md](virapp.md) |
| How do events, registration and "What's New" work? | [events.md](events.md) |
| How do the two frontends differ when writing a ticket? | [frontend-conventions.md](frontend-conventions.md) |
| Where do epics and tasks live in Asana? | [asana.md](asana.md) |

## Two generations

| | Frontend | Backend |
|---|---|---|
| v2 — live | `app-playground` | `monorepo` |
| v3 — rewrite | `app` | `backend` |

- v2 is the source of truth for **what the product does today**
- v3 is the source of truth for **how it should be built**
- Reading v2 code tells you behavior, not good practice
- Reading v3 code tells you the target, not what users have today

## How the domain docs are shaped

- **v2 today** — current behavior, including traps and gaps
- **v3 status** — built, partial, or not started, plus open gaps before porting
- **Reference** — file locations, at the end only

Each doc states the date it was last checked against the code. Code moves fast. Recheck before relying on a claim that old.

## Where engineering rules live

Not copied here, to avoid drift. Read them in the repo that owns them.

- v2 frontend and backend: `Context.md` and `AGENTS.md` in each repo
- v3 frontend: `AGENTS.md`, `docs/ai/`, `ADR/`
- v3 backend: `CLAUDE.md`, `docs/adr/`
