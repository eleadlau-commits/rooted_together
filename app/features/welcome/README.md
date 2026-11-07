# Welcome and sign-up

First screen ("I'd like a plot" / "I'd like to help out"), short steps for each path, and a page to check the answers.
Questions live in `questions.js`. Never asks for an address or phone number.

**Service `profile`:** `get()` → `{ role, answers }` or `null`; `isSet()`; `edit()` opens sign-up again.
**Event:** `profile:saved` `{ role }`.
**Adds:** menu row "Edit my details" (order 20); a line to `safety.notes`.
**Saved:** `profile`.
