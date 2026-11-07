# Welcome and sign-up

First screen ("I have a garden" / "I want to grow") and two short steps for each path.
Questions live in `questions.js`. Only a rough area is asked for, never an address or phone.

**Service `profile`:** `get()` → `{ role, answers }` or `null`; `isSet()`; `edit()` opens sign-up again.
**Event:** `profile:saved` `{ role }`.
**Adds:** menu row "Edit my details" (order 20); a line to `safety.notes`.
**Saved:** `profile`.
