# Quest demo — build log

## Done

- Pulled real Quest tokens from Figma nodes 2:7930 (portal) and 15:751 (sidebar) into `tailwind.config.js`. Quest is a **green** brand:
  - `quest-primary` = `#00854B` (Brand Primary 1)
  - `quest-primary-dark` = `#034C1F` (Brand Primary Dark)
  - `quest-primary-bright` = `#34F870` (Brand Primary 3)
  - `quest-primary-pastel` = `#E8F8EE` (Background Tertiary)
  - `quest-sage` / `sage-deep` (`#B8D4BD` / `#9CC0A6`) sampled from the portal hero band
  - Heading font Figtree, body Inter (fallbacks to system)
- Ported all simple components from `../highmark-demo-may/`: `StreamingText`, `AgentMessage`, `UserMessage`, `ChatBubble`, `StatusLine`, `ThinkingInline`, `SuggestedReplies`, `ConfirmationCard`, `AISidebar`, `ChatRunner`. Color classes swapped to `quest-*`. User bubble uses `quest-primary-dark` to match the Figma sidebar. Sidebar minimized pill uses `quest-primary` with a sparkle icon.
- New components built to match the demo brief: `LocationSearch`, `LocationCard` (Wexford highlighted with "Best match" chip + finger-stick badge + parking + distance), `LocationMap` (stylized SVG with green park/road tones), `BundlePreviewCard` (two-row card with checked auto-opt indicator, "Added automatically based on your Health Story" annotation, visible Remove affordance — the hero moment).
- `ChatRunner` wired to the Quest media kinds: `locationSearch` → `LocationSearch`, `bundlePreview` → `BundlePreviewCard`, `confirmation/screening` → `ConfirmationCard`. `Shift+ArrowRight` rehearsal hotkey preserved from Highmark.
- `PortalScreen` built to Figma 2:7930: sage hero band with Quest logo nav and AI search bar ("Hi Mari, what do you want to do today?"), partnership strip (St Louis University), wellness incentive band ($100 gift card), schedule-a-screening section with three location chips, health-profile-questionnaire row, suggested programs grid, today's-activities side rail, dark green footer. AI sidebar slides in after 2.8s.
- `LaptopScreen` and `MessagesScreen` already had Quest copy and color tokens in place; verified end-to-end paths.
- `npm run dev` boots on port 5175 (curl returns 200), `npx vite build` passes (1881 modules, 307 KB / 97 KB gzip, no errors).

## Notes for future contributors

- **Conversation copy in `careNavScript.js` was left untouched** as instructed — it encodes the behavioral levers from Quest's January workshops.
- The `Interactive/Action Primary` token in Figma was `#0066B1` (a Highmark holdover), but the rest of the variable set and screenshots make it clear the live Quest brand is green. Tokens reflect the green system.
- Asset list from `SPEC.md` is still pending — `Quest-Logo.svg`, `AI Icon.svg`, `Workspace.png`, etc. The portal renders a text wordmark ("Quest®") as a fallback. Drop the real assets into `/public/assets/` when available; search for `TODO(claude-code):` in the source for swap points.
- Highmark's `vite-dev` (Desktop/Claude `.claude/launch.json`) was extended with a `quest-dev` entry on port 5175 so `preview_start quest-dev` works.
