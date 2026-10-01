# Events

Kadet-facing events, labelled "What's New" in the navbar. Checked against the code on 2026-10-01.

## Naming trap (v2)

The navbar says "What's New." The route, folder and every file say `events`. Searching the code for "what's new" finds nothing.

- Route is `/events`, behind a feature flag (`VITE_SHOW_WHATS_NEW`)
- The homepage has a "What's New" card linking to it
- A personal event history page sits behind a second flag (`VITE_SHOW_MY_EVENTS`)

## Content vs. registrations

Two separate stores, in both generations.

- **Event content** — Contentful, content type `event`. Authored directly there. No create/update API exists on either backend.
- **Registrations** — Firestore, one record per user per event.
- **Not VirApp.** Challenges are a different system with their own entities and Contentful types. See [virapp.md](virapp.md).

## v2 today

### Registration flow

Two paths, chosen by whether the event has an external form link.

| Event has | What happens |
|---|---|
| External form link | Frontend records `INTERESTED`, then redirects to the form. The form's Tally webhook upgrades the record on submit. |
| No external link | Frontend records `APPLIED` directly. No Tally involved. |

The webhook writes one of two statuses:

| Event setting | Status written |
|---|---|
| Application-gated | `APPLIED` |
| Not gated | `APPROVED` |

Full status set: `INTERESTED`, `APPLIED`, `APPROVED`, `COMPLETED`, `DROPPED_OUT`.

Behaviors worth knowing:

- The webhook refuses to overwrite `APPLIED`, `APPROVED`, `COMPLETED` or `DROPPED_OUT`. Only `INTERESTED` can be upgraded.
- The per-user create and update routes take the status from the caller. The backend only checks it's a valid value.
- A record with no status shows as "Not signed up" in the UI.

### Admin

- Program managers and admins can list an event's registrations, filtered by status
- No admin route to approve, mark attendance, or change another user's status
- The per-user update route sits behind a user-ownership guard. Not checked whether admins pass it.
- Event content is managed in Contentful only

### No registration-close concept

Events carry `startTime` and `endTime` only. Nothing gates registration on a date, in v2 or v3.

VirApp enrollment doesn't gate on dates either. Its `deadlineDate` field is display-only. Don't borrow it as a pattern.

**Decision:**
Add `registrationCloseDate` to the Event content type in Contentful. Set it by hand alongside `startTime` and `endTime` when publishing. It's one more field in an existing habit, not a new sync point.

**Why not read it from Tally:**
Each event's real cutoff lives in its Tally form. The backend's Tally integration is inbound only (webhook on submit). There's no API to read a form's accept-cutoff.

**Open:**
Check how the VirApp Tally embed behaves once it stops accepting responses. That sets the UX when the Events banner CTA lands on a closed form.

### Dismiss and seen state

- No backend notification or "seen" infrastructure
- Established pattern is `localStorage`: cookie-consent banner today, plus a generic JSON helper for any future per-entity dismiss state

## v3 status

### Backend — built

- Kadet: list events, get one by Contentful ID, register, cancel registration, self-report attendance with an attendance code
- Admin: list an event's registrations, mark users as attended
- Registration statuses: `REGISTERED`, `WAITLISTED`, `ATTENDED`
- Registration goes straight through the API. **No Tally form in the events path.**
- Capacity is supported: once an event is full, new registrants are waitlisted
- Waitlisted users can't self-report attendance
- Events with an external link are rejected by the register endpoint, so nothing records interest in them
- No `registrationCloseDate`

### Differences from v2

| Area | v2 | v3 |
|---|---|---|
| Registration entry | Native record, or external Tally form then webhook | Direct API call only. External-link events can't register. |
| Capacity and waitlist | Not found | Built in |
| Statuses | Application lifecycle (`INTERESTED` to `DROPPED_OUT`) | Registration and attendance (`REGISTERED` to `ATTENDED`) |
| Application gating | Per-event flag decides `APPLIED` vs `APPROVED` | No equivalent found |
| Attendance | Not tracked on the platform | Self-report by code, plus admin mark |
| Admin tooling | List registrations only | List plus mark attended |
| Who sets status | Caller, on the per-user route | Server |

### Frontend — not started

- The v3 app has no events feature yet
- Only a placeholder flag (`VITE_SHOW_EVENTS`) in the env example
- Every event screen a Kadet sees today exists only in v2

### Gaps to settle before porting

- Where `INTERESTED` and application gating go in v3's model
- How external-link events are tracked in v3, since the register endpoint refuses them
- Whether v3 keeps any external form for events, or moves fully to native registration

## Reference

| What | Where |
|---|---|
| v2 events page (view) | `app-playground/src/pages/events/events.view.tsx` |
| v2 events data hook | `app-playground/src/pages/events/events.hooks.jsx` |
| v2 homepage cards data | `app-playground/src/pages/home/home.hook.jsx` |
| v2 feature flags | `app-playground/src/feature-flags.js` |
| v2 cookie-consent dismiss pattern | `app-playground/src/components/layout/cookie-banner/cookie.hooks.jsx` |
| v2 localStorage helper | `app-playground/src/services/local-storage.js` |
| v2 event entry interface | `monorepo/functions/src/api/events/interfaces/event-entry.interface.ts` |
| v2 event response DTO | `monorepo/functions/src/api/events/dto/event-response.dto.ts` |
| v2 events service (incl. `upsertFormRegistration`) | `monorepo/functions/src/api/events/events.service.ts` |
| v2 registration status enum | `monorepo/functions/src/api/events/entities/user-event.entity.ts` |
| v2 registrations route | `monorepo/functions/src/api/events/events.controller.ts` |
| v2 Tally event-registration handler | `monorepo/functions/src/api/tally-forms/services/event-registration-form.service.ts` |
| v2 Tally webhook routes | `monorepo/functions/src/api/tally-forms/controllers/tally-forms.controller.ts` |
| v3 events controller | `backend/src/api/events/events.controller.ts` |
| v3 registration entity and statuses | `backend/src/api/events/entity/event-registration.entity.ts` |
| v3 admin events controller | `backend/src/api/admin/admin-events.controller.ts` |
| v3 frontend flags | `app/.env.example` |
