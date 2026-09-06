# VirApp backend reference

Source repo: `monorepo/`, code under `functions/`. Read access granted via `additionalDirectories` in `.claude/settings.local.json` (personal, not committed).

VirApp = Virtual Apprenticeship.

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

## Reference

| What | Where |
|---|---|
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
