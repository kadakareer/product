# App-playground frontend reference

Source repo: `app-playground/` (Vite/React, Kadet-facing).

## "What's New" is the Events page, under the hood

Navbar labels it "What's New," but the route, folder, and every file are named `events` — searching the code for "what's new" won't find it.

- Route: `/events`, feature-flagged via `VITE_SHOW_WHATS_NEW`.
- The homepage already has a "What's New" card linking to `/events` — discoverable, just not proactive.
- Data comes from a hand-rolled `useApi`/axios hook, not the orval-generated client — events aren't part of the generated swagger surface even though `orval.config.js` exists for other endpoints.

## Events are Contentful content, not a database entity

Confirmed on the backend: content type `'event'`, mapped through `EventEntryFields` → `EventResponseDto` → `EventsService`. No admin write API exists for events at all — content is authored directly in Contentful, no KadaKareer-side create/update path.

Easy to confuse with the separate VirApp/challenge domain — different system entirely, with its own entities (`ChallengeGroup`/`UserChallengeGroup`) and its own Contentful content types (`challengeDashboard`/`weekByWeek`). Both read as "Contentful + Kadet-facing program," but nothing about events touches challenges or vice versa.

## No registration-close concept exists yet, anywhere

Events only carry `startTime`/`endTime` — no close/deadline field. VirApp/challenge enrollment doesn't gate on dates either: it only checks three non-date criteria (challenge-count threshold, group-size limit, already-enrolled). The closest date field over there, `deadlineDate` on the `challengeDashboard` content type, is display-only (likely a submission/completion deadline) and is never read in enrollment logic — don't borrow it as a pattern for an actual registration cutoff.

**Decision:** add `registrationCloseDate` to the Event content type in Contentful, set manually alongside `startTime`/`endTime` when an event is published. Contentful is already the central place to manage everything else about an event — this is one more field in an existing habit, not a new sync point. Each event's real cutoff lives in its linked Tally form, but there's no way to read that live: Tally's only integration in the backend (`functions/src/api/tally-forms/`) is inbound (webhook on submit), no outbound API to pull a form's own accept-cutoff.

**Open:** check how VirApp's existing Tally form embed behaves once it stops accepting responses — informs what UX to expect when the Events banner CTA lands on a form past `registrationCloseDate`.

## Dismiss/seen UI state has no backend precedent

No notification or "seen" infrastructure exists in the backend. localStorage is the established pattern instead — used today for the cookie-consent banner, plus a generic JSON-based helper (`getLocalStorage`/`setLocalStorage`) that's the right building block for any future per-entity-ID dismiss/seen state.

## PostHog goes through one wrapper

Always `captureAnalyticsEvent(eventName, properties)` — never a raw `posthog.capture` call. Lazy-loaded, autocapture off. Existing event names are title-case, verb-first: `'Clicked Search Result'`, `'Received Search Result'`, `'Accepted cookies'`.

## Responsive & UI conventions

- Mobile/desktop split via a dedicated hook, not raw media queries in JS — breakpoint at 767px.
- Styled-components throughout, no Tailwind.
- `Button` for in-page actions vs. `ButtonLink` (a router `Link` styled as a button) for internal-navigation CTAs — pick based on whether the action navigates.

## Reference

| What | Where |
|---|---|
| Homepage entry | `src/pages/home/index.jsx` |
| Homepage view (`BlueHeaderContainer`, "Hello, Kadet") | `src/pages/home/home.view.jsx` |
| Homepage cards data (incl. "What's New" card) | `src/pages/home/home.hook.jsx` |
| Events/"What's New" page | `src/pages/events/events.view.tsx` |
| Events data fetch hook | `src/pages/events/events.hooks.jsx` |
| Feature flag (`SHOW_EVENTS` / `VITE_SHOW_WHATS_NEW`) | `src/feature-flags.js` |
| Event API interface (backend) | `functions/src/api/events/interfaces/event-entry.interface.ts` |
| Event response DTO (backend) | `functions/src/api/events/dto/event-response.dto.ts` |
| Event mapping service (backend) | `functions/src/api/events/events.service.ts` |
| Challenge entities — separate VirApp system | `functions/src/api/challenges/entities/challenge.entity.ts` |
| `EnrollmentCriteria` enum (backend) | `functions/src/api/users/dto/response-user-challenge.dto.ts` |
| Tally forms module — inbound webhooks only | `functions/src/api/tally-forms/` |
| Event-registration Tally handler | `functions/src/api/tally-forms/services/event-registration-form.service.ts` |
| Cookie-consent dismiss pattern | `src/components/layout/cookie-banner/cookie.hooks.jsx` |
| Generic localStorage helper | `src/services/local-storage.js` |
| PostHog wrapper | `src/services/analytics.js` |
| Breakpoint hook (`useIsMobile`/`useIsDesktop`) | `src/hooks/use-breakpoint.jsx` |
| Breakpoint constant + styled-components theme | `src/styles/index.js` |
| `Button` / `ButtonLink` components | `src/components/atoms/buttons/index.jsx` |
