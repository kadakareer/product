# Frontend conventions

What differs between the two frontends, for writing tickets an engineer can act on. Not a coding guide — each repo owns that.

## Which generation to ticket against

- v2 is live and still gets feature work
- v3 is the rewrite and replaces it
- Every feature added to v2 widens the gap v3 has to close
- Prefer v3 when there's a genuine choice. Ask the engineers when unsure.

## Stack at a glance

| Area | v2 | v3 |
|---|---|---|
| Language | JS and TS mixed | TypeScript |
| Styling | Styled-components, Mantine | Tailwind |
| Server data | Hand-rolled `useApi` (axios), plus some generated hooks | Generated hooks only (Orval) |
| Client state | Context and reducers | Zustand |
| Forms | Formik and Yup | React Hook Form and Zod |
| Page structure | Page folders with view, hooks, index | Feature folders, thin page, data hook, pure view |
| Feature flags | `VITE_SHOW_*` env vars, read through one file | `VITE_SHOW_*` env vars, listed in the env example |

The reasoning for each v3 choice is in the frontend ADRs.

## v2 conventions that matter for tickets

### Analytics

- Always through one wrapper, never raw PostHog calls
- Lazy-loaded, autocapture off
- Event names are title-case and verb-first: "Clicked Search Result", "Accepted cookies"

### Responsive

- Mobile and desktop split through a dedicated hook, not raw media queries
- Breakpoint is 767px

### Buttons

- `Button` for in-page actions
- `ButtonLink` (a router link styled as a button) for navigation CTAs
- Pick by whether the action navigates

### Data fetching

- Some features bypass the generated client. Events is one.
- Anything not in the OpenAPI spec won't appear in generated hooks

## v3 conventions that matter for tickets

- Server data never goes in client state. It goes stale.
- A shared UI component is only promoted at its third consumer
- Direct `axios`, raw `fetch`, `any` and hand-written query hooks are lint errors
- Runbooks exist for common tasks: new feature, API wiring, UI-first build, forms, tests, flags
- A feature can be built UI-first, before its backend exists

## Reference

| What | Where |
|---|---|
| v2 project map | `app-playground/Context.md` |
| v2 analytics wrapper | `app-playground/src/services/analytics.js` |
| v2 breakpoint hook | `app-playground/src/hooks/use-breakpoint.jsx` |
| v2 breakpoint constant and theme | `app-playground/src/styles/index.js` |
| v2 Button and ButtonLink | `app-playground/src/components/atoms/buttons/index.jsx` |
| v2 flags | `app-playground/src/feature-flags.js` |
| v3 agent rules | `app/AGENTS.md` |
| v3 runbooks | `app/docs/ai/README.md` |
| v3 frontend ADRs | `app/ADR/` |
| v3 flags | `app/.env.example` |
