# Rooted Together

Garden Share for Durham: older people who can no longer manage their gardens meet students and
young people who want space to grow food. Plus a seed library, harvest markets and an end of
season festival. A first draft by **Team Green Durham** (Enactus Durham) for pitching and user
testing, not a finished product.

> Notice the overgrown gardens around Durham? Older people have the space, students have the
> energy, and nobody is bringing them together. Elderly cannot manage them, and students have no
> space. Both are missing out on fresh food, exercise, companionship and learning from each other.

## What's here

| Folder | What it is |
| --- | --- |
| `app/`, `folio/`, `build.py` | The phone app, built with Folio (the framework from Mobile Durham). One folder per feature in `app/features/`. |
| `website/index.html` | The one-page website. Opens on its own. |
| `prototype/index.html` | The first plain-HTML click-through, kept as a backup. |

## Running the app

```
python build.py serve        # http://localhost:8000
python build.py test         # Folio's tests, including the delete-a-folder test
python standalone.py         # one HTML file in standalone/, opens with a double-click (needs Node for esbuild)
```

## Rules we build by

- Older users first: big text, strong contrast, simple words, few steps, works on a phone.
- Safeguarding: never show a home address or phone number. Every first introduction goes through the team.
- Placeholders in `[brackets]` for any fact, date, price or partner name. No invented statistics, organisations or quotes.
- Folio's rules: features talk only through services, slots and events (see `folio/README.md`).
