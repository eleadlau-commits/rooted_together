# Rooted Together

A community allotment in Durham bringing generations together: up to 20 member plots, three
memberships (Starter, Standard, Supported), Wednesday Social Gardening and Sunday Community and
Skills days, a seed library, harvest markets and a festival. Garden Share is a future plan. A first draft by **Team Green Durham** (Enactus Durham) for pitching and user
testing, not a finished product.

> How might we help older people feel less isolated and more connected to their communities?

**Live site:** https://eleadlau-commits.github.io/rooted_together/ (website) and /try-app/ (the app).

## What's here

| Folder | What it is |
| --- | --- |
| `app/`, `folio/`, `build.py` | The phone app, built with Folio (the framework from Mobile Durham). One folder per feature in `app/features/`. |
| `website/index.html` | The one-page website. Opens on its own. |
| `prototype/index.html` | The first plain-HTML click-through, kept as a backup. |
| `try-app/index.html` | The built app in one file (from `python standalone.py`), for GitHub Pages. Rebuild it after changing `app/`. |

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
