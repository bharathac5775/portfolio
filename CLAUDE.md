# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio for Bharath A C (Cloud/DevOps engineer). Plain HTML + CSS + vanilla JavaScript — **no build system, no package manager, no test framework**. The site is served by opening `index.html` directly or via any static file server.

## Running locally

There is no build step. To preview changes:

```bash
# any of these work — pick whichever is convenient
python3 -m http.server 8000
# or
npx --yes serve .
```

Then open `http://localhost:8000`. Opening `index.html` directly via `file://` also works for most things, but a server is needed if a change touches `fetch`/CORS-sensitive code.

## Architecture

Three top-level files do all the work:

- **`index.html`** (~68 KB) — single-page layout. All content (about, experience, projects, skills, certifications, education, contact) is hand-authored as static markup organized into `<section id="...">` blocks: `hero`, `about`, `experience`, `projects`, `skills`, `tech-orbit`, `certifications`, `contact`. The nav menu and scroll-spy logic key off these IDs, so renaming a section ID requires updating both the nav links in `index.html` and the matching selectors in `app.js`.
- **`styles.css`** (~44 KB) — all styling. Uses a "terminal/cloud-ops" visual theme (CSS custom properties, grid background, glow orb, gradient text).
- **`app.js`** (~33 KB) — all interactivity. A single `DOMContentLoaded` handler calls a sequence of `init*` functions, each scoped to one feature: `initHeaderScroll`, `initMobileMenu`, `initMouseGlow`, `initTypedSubtitle`, `initTerminalSimulation`, `initProjectFilter`, `initCertificationsModal`, `initCertificationsSlider`, `initScrollReveal`, `initContactForm`, `initScrollSpy`, `initAntiGravity`. To add a new behavior, add an `init*` function and call it from the bootstrap block at the top of `app.js`.

The contact form (`initContactForm`) is **simulated** — it does not actually send mail. On submit it shows a fake "transmitting" state, then renders a success message containing a `mailto:` link prefilled with the user's input. If real form submission is needed, this is the place to wire in Formspree / EmailJS / a backend.

## Assets

- `assets/profile.jpg` — hero photo.
- `assets/tech-logos/` — ~50 SVG/PNG icons used by the skills/tech-orbit sections. These were fetched by the `download_*.py` scripts in the repo root (devicons, simple-icons, manual sources). The scripts are one-shot utilities — re-run only when adding a new logo. They write into `assets/tech-logos/` and have no other side effects.
- `resume.pdf` — bundled resume; the "Retrieve Resume" nav button currently links to a Google Drive URL in `index.html`, not this local file.

## Conventions

- Section IDs in `index.html` are the source of truth for navigation, scroll-spy active states, and the project/cert filters in `app.js`. Keep them in sync when renaming.
- The visual theme uses bracketed/terminal-style copy (`<BHARATH.OPS/>`, `[SEND]`, `Status 202`). Match that tone when editing user-facing strings.
- No linter, formatter, or test runner is configured. Verify changes by loading the page in a browser and exercising the affected section.
