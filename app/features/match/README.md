# Match

The start tab. One example match at a time for the person's role (`examples.js`), using the
`profile` service (copes with it missing). "Request an introduction" only records the request
as "With the team"; the app never contacts the other person.

**Event:** `intro:requested` `{ matchId }`. **Adds:** the Match view; a line to `safety.notes`.
**Saved:** `requests`.

**Switched off** (`enabled: false`): Garden Share is a future plan. Switch it back on when it launches; its sign-up paths would need adding to welcome again.
