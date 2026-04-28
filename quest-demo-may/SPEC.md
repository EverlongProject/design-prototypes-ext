# Quest AI Demo, Spec

Project brief for the Quest AI Care Navigation demo, scheduled for the **May 7, 2026 Quest onsite**. Read this first, then `DEMO_SCRIPT.md` for the beat-by-beat conversation.

## Why this project exists

This is the live demo Diogo runs during Session 2 (Experience Design & Agentic Workflows) of the Quest onsite. It re-orients stakeholders to the AI experience, addresses Sam's likely "why AI on top of the League investment" question, and demonstrates that the design operationalizes the behavioral principles Quest's team explored in their January 2026 workshops.

Mirror the structure and conventions of `../highmark-demo-may/`. That project is the source of truth for component patterns, conversation runner architecture, and styling approach.

## Persona and scenario

**Mari Patel, 47.** Working full-time, primary caregiver for her aging mother. Time-pressured, action-oriented behavioral archetype. Easily overwhelmed, frequently abandons scheduling.

**Trigger:** Mari's employer just rolled out the annual wellness screening through Quest. Quest's Care Navigation Agent texts her about it.

**Demo arc in one sentence:** The agent reaches out via SMS, Mari taps in, the agent finds her a lab in natural language, AUTO-BUNDLES a flu shot onto the same visit (the hero moment), Mari secures the appointment, and the Health Coach takes over post-visit when results come in.

**Total runtime:** ~5 to 6 minutes.

**Agents featured:**
- Care Navigation Agent (intake, find, book, bundle)
- Health Coach Agent (post-results handoff to Pack Health)
- (Future-state hook) Quest's results interpreter agent, called out verbally during the demo

## Behavioral levers (call these out by name when narrating)

These map to the five barriers Quest's January workshops identified. The demo script in `DEMO_SCRIPT.md` and the data in `src/data/careNavScript.js` already encode them:

- **Limited attention:** SMS deadline cue ("3 weeks left in your screening window") and social proof ("82% of your team has booked")
- **Friction:** Auto-opt bundling — flu shot pre-added, opt-out affordance visible
- **Present bias:** "Most members are in and out in under 15 minutes" framing in the agent greeting
- **Status quo bias:** Agent does the work on Mari's behalf (auto-bundle, HR doc handoff)
- **Social norms:** Colleague proof points on the confirmation screen

## Tech stack (inherited from Highmark)

| Layer | Choice |
|---|---|
| Framework | React 18, function components, hooks |
| Build | Vite 5 |
| Language | JavaScript / JSX (not TypeScript) |
| Styling | Tailwind CSS 3, custom Figma-derived tokens |
| Animation | framer-motion |
| Icons | lucide-react |
| Dev port | 5175 (Highmark uses 5174) |
| Deploy target | GitHub Pages, served at `/design-prototypes-ext/quest-demo-may/` |

`package.json`, `vite.config.js`, `postcss.config.js`, `tailwind.config.js`, and `.claude/launch.json` are already wired. Run `npm install`, then `npm run dev`.

## Design references

| Surface | Figma node | Link |
|---|---|---|
| Quest portal main screen | `2:7930` | [open in Figma](https://www.figma.com/design/b3RToAfxEmsOH3CzefWPIy/-INT--Quest-AI-Demo-May?node-id=2-7930) |
| AI sidebar designs | `15:751` | [open in Figma](https://www.figma.com/design/b3RToAfxEmsOH3CzefWPIy/-INT--Quest-AI-Demo-May?node-id=15-751) |

When you start working, use the `figma-use` skill to pull design context, extract the real Quest design tokens, and update `tailwind.config.js`. The current values in that file are placeholder approximations of Quest's brand.

## File structure (already scaffolded)

```
quest-demo-may/
├── .claude/launch.json
├── .gitignore
├── README.md
├── SPEC.md                            ← this file
├── DEMO_SCRIPT.md                     ← beat-by-beat
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js                 ← placeholder Quest tokens, refine from Figma
├── vite.config.js
├── public/
│   └── assets/                        ← drop brand assets here (see "Asset list")
└── src/
    ├── App.jsx                        ← StageMenu / FlowRunner switch (DONE)
    ├── main.jsx                       ← root render (DONE)
    ├── index.css                      ← Tailwind imports + base styles (DONE)
    ├── components/
    │   ├── AISidebar.jsx              ← stub, port from Highmark
    │   ├── AgentMessage.jsx           ← stub, port from Highmark
    │   ├── ChatBubble.jsx             ← stub, port from Highmark
    │   ├── ChatRunner.jsx             ← stub, port from Highmark
    │   ├── ConfirmationCard.jsx       ← stub with Quest extras prop
    │   ├── LocationCard.jsx           ← NEW for Quest (replaces ProviderCard)
    │   ├── LocationMap.jsx            ← NEW for Quest (replaces MapView)
    │   ├── LocationSearch.jsx         ← NEW for Quest (replaces ProviderSearch)
    │   ├── StatusLine.jsx             ← stub, port from Highmark
    │   ├── StreamingText.jsx          ← stub, port from Highmark
    │   ├── SuggestedReplies.jsx       ← stub, port from Highmark
    │   ├── ThinkingInline.jsx         ← stub, port from Highmark
    │   └── UserMessage.jsx            ← stub, port from Highmark
    ├── data/
    │   ├── stages.js                  ← single careNav stage (DONE)
    │   └── careNavScript.js           ← three linear scripts: PRE, RESCHEDULE, POST
    │                                     plus three booking objects:
    │                                     SCREENING_BOOKING, SCREENING_WITH_FLU_BOOKING,
    │                                     RESCHEDULED_BOOKING (DONE, full copy)
    └── screens/
        ├── FlowRunner.jsx             ← step dispatcher (DONE)
        ├── LaptopScreen.jsx           ← workspace + SMS notification (stub)
        ├── MessagesScreen.jsx         ← iMessage thread (stub with Quest copy)
        ├── PortalScreen.jsx           ← Quest portal + sidebar (stub, build to Figma)
        └── StageMenu.jsx              ← landing menu (DONE, color-swapped)
```

## Mapping: what changes from Highmark

Components that **port directly** from `../highmark-demo-may/src/components/` with only `highmark-*` → `quest-*` color class swaps:

- `AISidebar.jsx`, `AgentMessage.jsx`, `ChatBubble.jsx`, `ChatRunner.jsx`, `ConfirmationCard.jsx`, `StatusLine.jsx`, `StreamingText.jsx`, `SuggestedReplies.jsx`, `ThinkingInline.jsx`, `UserMessage.jsx`

Components that are **dropped** from Highmark (not used in Quest scenario):

- `DependentPicker.jsx` (Mari is solo in this flow)
- `CoverageCard.jsx` (no member coverage check beat)
- `SwordPreviewCard.jsx` (no point-solution preview)
- `VideoPlayer.jsx` (no video in Quest flow)
- `ProviderSearch.jsx`, `ProviderCard.jsx`, `MapView.jsx` (replaced by Location\* equivalents)

Components that are **new** for Quest:

- `LocationSearch.jsx`, `LocationCard.jsx`, `LocationMap.jsx` (Quest PSC search)

Inside `ChatRunner.jsx`, the media kind switch maps:

- `'locationSearch'` → `<LocationSearch locations={LOCATIONS_ALL} />`
- `'confirmation'` (variant `'screening'`) → `<ConfirmationCard {...SCREENING_BOOKING} />`
- `'confirmation'` (variant `'screeningWithFlu'`) → `<ConfirmationCard {...SCREENING_WITH_FLU_BOOKING} />`
- `'confirmation'` (variant `'rescheduled'`) → `<ConfirmationCard {...RESCHEDULED_BOOKING} />`

`ChatRunner.jsx` also handles a `'user'` turn type (see careNavScript.js header docs): it pushes a UserMessage bubble into history and auto-advances. Used in the RESCHEDULE script to replay the phrase Mari typed into the portal hero search bar before the sidebar reopened.

## Quest portal layout (PortalScreen)

This is the most design-heavy screen and the one with no direct Highmark counterpart. Build it to match Figma node `2:7930`. Key elements likely include:

- Quest top nav with member name (use "Mari" placeholder)
- Hero band with the wellness screening status / call to action
- Recent results section
- Resource tiles
- A right-side area where the AI sidebar slides in

After mounting, the screen should auto-trigger the sidebar open after ~2.8s. The sidebar's `onConversationEnd` callback fires `onAdvance()` which exits back to StageMenu.

## Asset list

Drop the following into `/public/assets/` after exporting from Figma:

- `Quest-Logo.svg` — brand logo
- `Quest-Mark.svg` or `quest-profile.png` — square avatar for SMS notification + iMessage header
- `AI Icon.svg` — sparkle / agent indicator (Quest variant of Highmark's)
- `Workspace.png` — full-screen background for `LaptopScreen` (calendar, email view, or whatever feels natural for a working caretaker)
- Any portal hero imagery referenced in the Figma main screen

The current stubs render text placeholders where these assets should go. Search the codebase for `TODO(claude-code):` comments to find every spot.

## Acceptance criteria

The demo is ready when:

1. `npm run dev` boots and the StageMenu shows one card: "AI Care Navigation Demo"
2. Tapping the card runs the three-step flow: laptop → messages → portal with sidebar
3. The full conversation in `careNavScript.js` plays end-to-end without console errors
4. The flu shot recommendation moment (Beat 10 in DEMO_SCRIPT.md) reads as the hero moment, viewers in the room should pause on it
5. Brand colors come from the real Quest design tokens, not the placeholder values
6. Demo runtime fits inside ~5 to 6 minutes with default `advanceAfter` timings
7. `Shift+Right` arrow advances past the current turn (rehearsal aid, behavior inherited from ChatRunner)

## Working with this scaffold

- The script and data files (`stages.js`, `careNavScript.js`) are intentionally complete. **Do not rewrite the copy.** It encodes the behavioral levers from Quest's January workshops and the flow Diogo aligned on with the team.
- The component stubs are minimal, just enough to keep the build green. Replace each stub by porting from the Highmark equivalent and updating colors.
- The `TODO(claude-code):` comments call out every place that needs real work.
- For everything except the Quest portal layout (PortalScreen) and the new Location\* / BundlePreview components, the implementation is "port from Highmark, swap colors." Don't reinvent.

## When you finish

Update this SPEC.md with anything you discovered that future contributors should know. Drop a short build log into `WORKBACK_PLAN.md` (create if not present) so the team can track what's done.
