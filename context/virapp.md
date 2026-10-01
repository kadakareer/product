# VirApp

VirApp = Virtual Apprenticeship. Checked against the code on 2026-10-01.

Sections below describe v2 (`monorepo`, code under `functions/`) unless marked otherwise. v3 status is near the end. Read access to all repos comes from `additionalDirectories` in `.claude/settings.local.json` (personal, not committed).

Events are a separate system. See [events.md](events.md).

## Challenge content — Contentful, read-only

Challenge cards, dashboards, and week-by-week content are fetched straight from Contentful on request. The `challengeId` used everywhere in the backend is Contentful's own entry ID — no local copy, no sync step. Publishing a new challenge in Contentful needs no backend changes; it just shows up on the next request.

## User↔challenge link — Firestore, created lazily per-user

Not created when a challenge is published — only when a user enrolls. Two Firestore collections, created together on enroll:

- **Challenge group** — one team's attempt at a challenge. Holds who's invited and **progress** (starts at 0, lives on the group, not the individual).
- **User-challenge-group membership** — one member's status within that group (enrolled/invited/pending/declined/etc.), plus their signup-form answers.

Every enrollment creates a **new group**, even solo — you're always a "group of 1+" from day one. A solo enrollment is just a group that never grows past one member.

Enroll flow: user submits → group gets created → the enrolling user gets added to it with status Pending.

## Signup intake — two paths exist, only one is actually used

- **Tally webhook (the real path)** — applicant fills out the Tally form, which submits straight to the backend and enrolls them immediately. No manual step in between. This is where applicant screening data actually comes from: why they want to join, self-reflection/confidence ratings, resume, whether they want an internship, first-work-experience flag, how they heard about VirApp. Useful for admin decisions beyond just name/email — there's real signal here for evaluating fit.
- **CSV bulk upload (exists, not used in practice)** — a separate admin tool to bulk-upload a spreadsheet of accept/reject decisions. Only carries name/email/challenge/decision — none of the richer Tally screening data. Don't treat this as the signup flow; it isn't how applicants actually get into the system day to day.

## Admin-gated capabilities (found 2026-08-30)

- **View sign-ups** — list all user-challenge groups. Roles: Admin, Program Manager.
- **Update enrollment status** — approve/reject, single-challenge batch or arbitrary user×challenge pairs. Permission: Edit Signups. This is the path actually used for accept/reject, including its email-sending.
- **Bulk email from CSV** — role: Admin, exists but not part of the real workflow (see above).
- Adjacent but not VirApp-specific: coach allowlisting/activation (Admin-only) — a separate concern from application review.

## Email sending — acceptance/rejection

- **Endpoint in use by VirApp admin** — the user×challenge-pairs batch endpoint, with `sendEmail: true`. A one-element array sends a single applicant's email.
- **Two other paths exist, not currently used** — the bulk CSV upload, and the userIds-only batch endpoint (this one never sends email).
- All three share one sender method and one pair of templates (accepted/rejected).
- **Don't confuse with** `sendVirappAcceptance`/`sendVirappDecline` — different templates, different purpose: tells a group leader that an invited kadet accepted/declined the group invite. Not an applicant-status email.

**Sending account**

- Transport is plain SMTP via nodemailer — no OAuth, no service account.
- From address is hardcoded to `team@kadakareer.com`, set independently of the SMTP login credentials — nothing in code enforces they match.
- Most SMTP providers reject or spam-flag a From that isn't the authenticated mailbox (or a verified alias). Switching the sending account means updating **both** the hardcoded from-address and the SMTP host/user/pass env vars, pointed at the new account.
- Repo only holds local/test dummy creds — production creds live outside the repo.

## v3 status

### Backend — broadly built

- **Challenges:** list, get details. Content still comes from Contentful.
- **Groups:** invite an enrolled user, accept or decline an invite, leave a group and revert to solo
- **Weekly submissions:** submit a link or file, get the latest, list all for a week
- **Comments:** list, add, edit, delete on a submission
- **Admin:**
  - List registrations, update one status, batch-update statuses
  - List submissions, review a submission
  - Mark completion, list completions
- **Email templates:** received, enrolled, waitlisted, rejected, already registered, participated, submission accepted, submission needs update, and three completion levels

### Status model

| Area | v3 values |
|---|---|
| Enrollment | `PENDING`, `WAITLISTED`, `ENROLLED`, `ENROLLED_GROUP`, `REJECTED`, `WITHDRAWN`, `COMPLETED`, `PARTICIPATED` |
| Invite | `PENDING`, `ACCEPTED`, `DECLINED`, `EXPIRED` |
| Submission review | `PENDING_REVIEW`, `ACCEPTED`, `NEEDS_UPDATE` |
| Completion merit | `OUTSTANDING`, `COMMENDABLE`, `SATISFACTORY`, `NONE` |

Older v2 values (`INVITED`, `UNENROLLED`, `DECLINED`, `NOT_ENROLLED`) are kept only for the migration.

### Differences from v2

- **Weekly submissions exist in both.** Parity on comments and admin review wasn't compared. Needs a side-by-side before porting.
- **Completion merit is new.** Merit levels and an admin "mark completion" action weren't found in the v2 backend.
- **Signup intake** is still a Tally webhook. It creates a `PENDING` registration with the screening answers and emails an "application received" message.
- **Duplicate signups** get an "already registered" email instead of a second record.
- **Admin routes** use the action-style naming (list, update, review, mark).

### Not done yet

- The signup webhook sits behind a feature flag. Production state not checked.
- The code has open TODOs on mapping form field keys to the real Tally form
- One is marked critical: the challenge name isn't captured yet, and the emails use it

### Frontend — partial

- The v3 app has three VirApp pages: marketplace, enrollment, challenge detail
- No submission pages, no comment UI, no admin screens

## Reference

| What | Where |
|---|---|
| v3 challenges controller | `backend/src/api/challenges/challenges.controller.ts` |
| v3 admin challenges controller | `backend/src/api/admin/admin-challenges.controller.ts` |
| v3 status enums | `backend/src/api/challenges/entity/challenge.enums.ts` |
| v3 signup webhook | `backend/src/api/webhooks/services/virapp-registration-form.service.ts` |
| v3 feature flags | `backend/src/core/feature-flags/flags.ts` |
| v3 email templates | `backend/src/core/mail/templates/` |
| v3 VirApp frontend | `app/src/features/virtual-apprenticeship/` |
| Routing | New NestJS controllers served under `/api/v2/**`; legacy code under `/api/**` (`firebase.json` hosting rewrites) |
| `ChallengesController` | `functions/src/api/challenges/challenges.controller.ts` — tagged `@ApiTags('virapp')` |
| `CmsService` (Contentful fetch) | `functions/src/core/cms/cms.service.ts` |
| `ChallengeGroup` entity | `functions/src/api/challenges/entities/challenge.entity.ts` |
| `UserChallengeGroup` entity + `UserChallengeEnrollmentStatus` enum | same file |
| Enroll flow (`enrollSelfAndInvite`, `#addUserToChallengeGroup`) | `functions/src/api/users/users-challenges-new.service.ts` |
| `GET /challenges/signups` | `challenges.controller.ts:60` |
| `PATCH /users/:uid/challengesNew/:challengeId/enrollmentStatus` | `users-challenges-new.controller.ts:527` |
| `PATCH /users/:uid/challengesNew/batchEnrollmentStatus` | `users-challenges-new.controller.ts:564` |
| `POST /challenges/send-email` | `challenges.controller.ts:89` |
| Tally signup webhook (`formSubmissionAndEnroll`) | `webhooks.controller.ts:31`, mapping in `webhooks.service.ts` |
| `enrollSelfAndInvite` (what the webhook calls) | `users-challenges-new.service.ts:243` |
| `sendVirappApplicationResultEmail` | `mail.service.ts:183` |
| `batchUpdateEnrollmentStatusForPairs` (email-sending logic) | `users-challenges-new.service.ts:1552-1618` |
| Mail config / SMTP creds (`getMailConfig`) | `config.service.ts:200-225` |
| Coach allowlisting/activation (`AdminController`) | `functions/src/api/admin/admin.controller.ts` |
