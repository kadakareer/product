# Programs Admin — PM TODO

Admin tools for reviewing program signups: approve, reject, waitlist, history, result emails. Built in the v2 backend. Admin and Program Manager can both approve and reject.

## Done

- [x] Ticket: change a registration's status (dropdown, confirmation modal, admin route, reason), and email the Kadet on result, CC programs
- [x] Ticket: track registration status changes, with whether the email was sent
- [x] Ticket: summary tiles above the registrations table (pending review, waitlisted, approved)
- [x] Ticket: confirm a seat (backend field and routes, Kadet buttons on the event page, admin column, filter and confirmed/awaiting tiles)
- [x] Ticket: design review of the sign-ups prototype, and design of the event page for each registration state
- [x] Decided: scope is programs, v2 gets the work, both roles can decide
- [x] Decided: failed result emails are a separate ticket, still to refine

## Write next

Prototyped but with no ticket yet. Each one needs a backend piece.

- [ ] Refine: failed result email handling (drafted in `failed-result-email.html`)
- [ ] Capacity: max participants, overflow to waitlist, fill an open spot
- [ ] Bulk status update across several registrations
- [ ] Read a registration's history for the detail modal, with the admin's name
- [ ] Participant info in the list (school, course, location), with search and filters
- [ ] Program configuration (max participants, duration, deliverables, format)
- [ ] Send a confirmation when the Tally form records a registration

## Decide

Suggested answers are mine. Overrule freely.

### Scope

- [ ] Which event types count as programs? v2 has no program flag, only a type. Decide whether the admin routes are limited to program types.

### Status rules

- [ ] Which status changes are allowed? Suggest any change by admin, since the prototype lets admin set every status.
- [ ] Should cancelling become a status instead of deleting the record? Suggest yes, so the history survives.
- [ ] Does the Kadet see the rejection reason? The prototype puts it in the email.
- [ ] What do Kadets see in the app for rejected and waitlisted? Needs copy.

### Capacity and confirmation

- [ ] Where does capacity live? Suggest a field on the program in Contentful, like the registration close date.
- [ ] Who handles overflow: the backend automatically, or an admin prompt as in the prototype? Suggest the prompt first.
- [ ] In what order is the waitlist promoted? Suggest first in, first out by waitlisted time.

### Email

- [ ] Who owns the email copy? The prototype has drafts for approved, rejected and waitlisted.
- [ ] Is the send toggle on by default? The prototype defaults it on.
- [ ] How do bulk changes email? Suggest one email per person, with failures reported per person.

### Data and performance

- [ ] Backfill existing registrations with a first history row?
- [ ] Paginate the list? Programs can have hundreds of Kadets, and the list fetches the user one registration at a time.
- [ ] Is profile data enough for reviewers? Gated programs capture no application answers today.
- [ ] How are two admins editing the same registration handled?

## Follow up with others

- [ ] Designer: review the prototype and design the event page states (`design-review.html`)
- [ ] Programs team: email copy for the three result emails
- [ ] Programs team: confirm who needs to be CC'd, currently the programs address
- [ ] Engineers: plan the v3 port, since v3 has an automatic waitlist but no admin approve or reject

## Prototype updates

- [ ] Show an "email failed" state on a row, with a Resend button
- [ ] Show a cancelled entry in the history
- [ ] Note in the prototype which parts are not in any ticket yet

## Reference

| What | Where |
|---|---|
| Status change and result email ticket | `status-dropdown-and-email.html` in this folder |
| Failed result email ticket | `failed-result-email.html` in this folder |
| Summary tiles ticket | `summary-tiles.html` in this folder |
| Confirm a seat ticket | `confirmation-state.html` in this folder |
| Design review ticket | `design-review.html` in this folder |
| Status history ticket | `status-change-history.html` in this folder |
| Signups prototype | `prototypes/admin-signups-program.html` |
| Events and registrations context | `context/events.md` |
| Ticket index | `tickets/index.html` |
