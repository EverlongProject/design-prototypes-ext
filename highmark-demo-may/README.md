# Highmark AI Demo (May 2026)

Desktop web prototype for the May 4, 2026 Highmark pitch. Three prototypes live in one app, pickable from a landing menu:

1. **AI Vision Demo** — Sarah's morning, orchestrated end-to-end across all four agent teams
2. **AI Benefits Agent Integration** — capability-specific sidebar on the Benefits page
3. **AI Health Coach Integration** — capability-specific sidebar on a Journey screen

## Quick start

```bash
cd highmark-demo-may
npm install
npm run dev
```

Opens at http://localhost:5174.

## Live URL (once deployed)

`https://everlongproject.github.io/design-prototypes-ext/highmark-demo-may/`

The GitHub Actions workflow at `.github/workflows/deploy.yml` (in the repo root) now builds both the Manulife and Highmark demos on every push to `main`. Manulife keeps working unchanged.

## Tech

- Vite + React 18 + Tailwind + framer-motion + lucide-react
- Same stack as `manulife-demo-april/`, minus the iOS/PWA pieces
- Fonts: Poppins (headings), Inter (display/body), Roboto (body/buttons), loaded via Google Fonts in `index.html`
- Design tokens in `tailwind.config.js`, pulled directly from Figma file `Ej1FaauWAcnqGdXTL604nv` (node `1:3660`)

## What's done (Cowork scaffold)

- Folder structure, package.json, vite.config.js, tailwind.config.js, postcss, index.html
- Tailwind tokens matching Figma variables (colors, typography, shadows)
- App shell: `StageMenu` (landing) → `FlowRunner` (per-stage runner) → `HomeScreen` (stub)
- Stage data at `src/data/stages.js` with three entries and one placeholder step each
- GitHub Actions workflow updated to build and deploy both Manulife and Highmark demos

## What's next (handoff to Claude Code)

### Immediate

1. `cd highmark-demo-may && npm install`
2. `npm run dev` and verify the landing menu renders at `http://localhost:5174/`
3. Click into each of the three prototypes, confirm the stub HomeScreen appears, Menu button returns to landing
4. Create a feature branch: `git checkout -b highmark-demo`
5. Commit the scaffold and push. Verify the GitHub Pages build succeeds (check Actions tab). Both Manulife and Highmark should deploy.

### Next (the actual UI work)

Build `src/screens/HomeScreen.jsx` to match Figma node `1:3660`. The file already has a block comment listing every section to build. Use the Figma MCP (`get_design_context` on individual child node IDs) to pull per-section reference code as you go.

Suggested order, from easiest wow to hardest:

1. Top nav bar (logo, 5 nav items, Settings) — Figma node `1:3988`
2. Hero greeting + AI search bar — nodes `1:3987` and `1:4043`
3. Popular Shortcuts row (4 quick links) — node `1:3672`
4. My Benefits + Deductible card — node `1:3683`
5. Plan coverage strip (Prescription, Vision, Dental) — node `1:3696`
6. Get Care section + Symptom Checker illustration — node `1:3701`
7. Reward Programs card — node `1:3784`
8. Today's Activities (Cervical Cancer PSA, Step Challenge, Sleep Journey) — node `1:3815`
9. New & Noteworthy carousel — node `1:3903`

### After the home is built

Add new step types to `FlowRunner.jsx` and new steps to `stages.js` to advance the demo through each beat. See the TODO markers in `data/stages.js` for the planned vision-demo sequence.

## Design tokens reference

Key tokens (all available as Tailwind classes, e.g. `bg-highmark-primary`):

| Token | Hex | Figma variable |
|---|---|---|
| `highmark-primary` | `#0066B1` | Interactive/Action Primary |
| `highmark-primary-bright` | `#008DD1` | Decorative/Brand Primary Default |
| `highmark-primary-dark` | `#046B9A` | Decorative/Brand Primary Dark |
| `highmark-secondary` | `#0FB5AE` | Decorative/Brand Secondary/Default |
| `highmark-primary-pastel` | `#EAF5FD` | Surface/Background Secondary |
| `ink` | `#00223C` | On Surface/Text Primary |
| `ink-subdued` | `#495055` | On Surface/Text Subdued |
| `border` | `#E0E2E4` | On Surface/Border Subdued |
| `success` | `#0A884B` | Success/Border Default |

Typography (as Tailwind font-size utilities):

- `text-heading-2` — Inter 24/32 -1 (hero greeting)
- `text-heading-3` — Poppins 18/26 0.25 (section titles)
- `text-body-1` — Inter 16/24 -0.2
- `text-body-2` — Roboto 14/20
- `text-subtitle-1` — Poppins 15/24 -0.2
- `text-caption` — Roboto 12/16
- `text-overline` — Roboto Bold 12/16 0.6

## Context

- Design file: https://www.figma.com/design/Ej1FaauWAcnqGdXTL604nv/-INT--Highmark-AI-Demo-May-2026?node-id=1-3660
- Vision demo script: workshopped in Cowork, 7 beats, ~4.5 min. Sarah Patel, 34, Pittsburgh, back pain, bookended with Care Gap Agent. Recovery Plan is the CTO wow moment (replaces Beat 6).
