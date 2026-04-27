# Highmark Demo Build Plan

Sequential plan to build the AI Vision Demo end to end. Each phase has concrete tasks, file paths, and a "done when" criterion. Tasks are sequenced so dependencies are obvious. The `DEMO_SCRIPT.md` in this folder is the single source of truth for copy and beat structure. Update this file as you go (check off completed tasks, note deviations).

---

## Where we are right now

**Built:**
- Project scaffold (Vite, React, Tailwind, framer-motion, lucide-react)
- Tailwind tokens matching Figma file `Ej1FaauWAcnqGdXTL604nv` (node `1:3660`)
- App shell: `App.jsx` → `StageMenu.jsx` → `FlowRunner.jsx`
- `SpreadsheetScreen.jsx` (Beat 1)
- `MessagesScreen.jsx` (Beats 2 to 3)
- `HomeScreen.jsx` (Beat 4 visual, full Highmark home matching Figma)
- `AISidebar.jsx` (auto-opens 3s after home renders)
- GitHub Actions workflow building both Manulife and Highmark demos
- `DEMO_SCRIPT.md` with the full 10-minute, 14-beat script

**Not yet built:**
- The conversational arc inside the sidebar (Beats 5 to 13)
- Embedded video player
- Typed user message animation
- Sword preview card
- Map + provider cards + filter + booking
- Recovery Plan canvas (the wow)
- Colonoscopy callback flow
- Live deploy verification (push + GH Pages confirm)

**Scope decision:** Build only the **AI Vision Demo** stage end to end. Leave the **Benefits Agent Integration** and **Health Coach Integration** stages as menu entries with placeholder screens until the vision arc is shippable. If there's bandwidth after, fill those in. If not, hide them in the menu and ship one polished arc.

---

## Phase 1 — Foundation chat primitives

**Goal:** Get the conversation infrastructure in place. Every subsequent phase just composes these primitives. If these are wrong, everything downstream has to be reworked.

### Tasks

- [x] **Confirm local dev works.** `cd highmark-demo-may && npm install && npm run dev`. Confirm the landing menu renders and clicking AI Vision Demo lands on the home screen with the sidebar opening after 3s.
- [ ] **Push to a feature branch and confirm GH Pages deploys.** Branch name `highmark-demo`. Push, watch the Actions tab, confirm `https://everlongproject.github.io/design-prototypes-ext/highmark-demo-may/` renders. Manulife demo should still work at its URL. If anything breaks here, fix before building anything else. *(Branch `highmark-demo-may-v1` pushed; PR awaiting merge to main.)*
- [x] **Create the conversation script data file.** `src/data/visionScript.js` covers Beats 5–7. Schema: `agent` (text + optional `advanceAfter`) and `input` (chips + optional `autoType` for the Beat 6 typed pivot). Will extend with media types (`video`, `card`, `canvas`) in later phases.
- [x] **Build `AgentMessage` component.** `src/components/AgentMessage.jsx`. Full-width text (no bubble), accepts an optional `media` slot for embedded video / card / canvas in later phases.
- [x] **Build `UserMessage` component.** `src/components/UserMessage.jsx`. Right-aligned bubble, Highmark primary fill.
- [x] **Build `TypedUserMessage`.** Implemented as the `autoType` mode of `SuggestedReplies` — the composer types into itself with ~75 wpm, jitter, and pauses on punctuation, then commits as a `UserMessage`. Shift+Right hotkey is the rehearsal safety net.
- [x] **Build `SuggestedReplies` component.** `src/components/SuggestedReplies.jsx`. Stacked chip buttons (primary chip filled, secondary outlined) above the composer. Auto-grow textarea (Enter sends, Shift+Enter newline). Disclaimer below. Auto-type mode for the Beat 6 pivot.
- [x] **Build the `ChatRunner` (driver).** `src/components/ChatRunner.jsx`. Tracks cursor + history, advances on agent stream-done / user submit. Idempotent on turn id (StrictMode-safe). Auto-scrolls new messages into view. Shift+Right hotkey skips to next turn.
- [x] **Wire AISidebar to use ChatRunner.** AIConversation removed; AISidebar now renders `<ChatRunner />`. Beats 5 to 7 verified end-to-end (intro → video placeholder → highlights → typed pivot → coverage → options chips).
- [x] **Port thinking indicator pattern from Manulife.** `src/components/StatusLine.jsx` (sparkle SVG with `#0066B1 → #5BC8E8` Highmark-blue gradient + status text) and `src/components/ThinkingInline.jsx` (crossfades through `lines[]` at `perLine` ms, defaults to 1200ms, calls `onDone` after the last line). Added `thinking` turn type to `visionScript.js`. ChatRunner renders the active thinking turn inside the scrollable history; `onThinkingDone` advances the cursor. Bursts inserted before Beat 7 (`t-coverage`), Beat 8 (`t-options`), Beat 9 (`t-providers`), Beat 11 (`t-booking`), and twice in Beat 12 (`t-callback-slot`, `t-callback-booking`) per the copy in `DEMO_SCRIPT.md`.

### Done when

The sidebar opens, the agent's first message lands, you can tap a chip to advance, you can see the typed user message animate when you reach Beat 6, and the script plays through Beat 7. No video player, no map, no Sword card yet. Pure conversation primitives. Thinking indicators render where the script calls for them.

### Files touched
- `src/data/visionScript.js` (new, extended with `thinking` turn type)
- `src/components/AgentMessage.jsx` (new)
- `src/components/UserMessage.jsx` (new)
- `src/components/SuggestedReplies.jsx` (new)
- `src/components/ChatRunner.jsx` (new, or merged into AISidebar.jsx)
- `src/components/AISidebar.jsx` (update)
- `src/components/StatusLine.jsx` (new, mirrors Manulife pattern)

---

## Phase 2 — Beats 5 to 7 (intro through pivot)

**Goal:** First half of the conversation plays end-to-end. The video shows up, the typed pivot lands, the agent adapts.

### Tasks

- [x] **Build `VideoPlayer` component.** `src/components/VideoPlayer.jsx`. Idle thumbnail (Highmark gradient + logo + duration chip + center play button) → "playing" state with progress bar over `playDuration` (default 6s) → "Watched" badge. Calls `onComplete` once when finished.
- [x] **Wire Beat 5 fully.** Agent #1's `media` is now a video object; the script flag `gateOnMedia: true` makes ChatRunner wait for the video's `onComplete` before advancing to agent #2 (highlights + chips).
- [x] **Wire Beat 6 (the typed pivot).** Already wired in Phase 1 via `SuggestedReplies.autoType`. Verified: chips are visible, after 2.5s the composer types the pivot at ~75 wpm with punctuation/word pauses, then commits as a `UserMessage`.
- [x] **Wire Beat 7 (agent adapts + coverage).** Already wired in Phase 1's script. Verified: agent #1 streams the acknowledgment + coverage check + "want to hear them?" prompt with `Yes, what are my options` / `Just find me a PT` chips.
- [x] **End-to-end manual run-through.** Verified: spreadsheet → SMS notification → Messages → home → sidebar slides in → intro + video play → highlights + chips → typed pivot → coverage check. Phase ends at the Beat 7 chips.

### Done when

You can run the demo from start, get all the way through the typed pivot moment, and reach the "want to hear options?" prompt. The typing animation should look real, not stuttery or instant.

### Files touched
- `src/components/VideoPlayer.jsx` (new)
- `src/data/visionScript.js` (extend through Beat 7)
- `src/components/AISidebar.jsx` or `ChatRunner.jsx` (handle media-embedded messages, auto-typing)

---

## Phase 3 — Beats 8 to 11 (Sword + booking)

**Goal:** PT booking arc complete. Sword shown, declined, in-person provider chosen, appointment booked.

### Tasks

- [x] **Build `SwordPreviewCard` component.** `src/components/SwordPreviewCard.jsx`. Phone-mockup frame (dark gradient + bezel) with an SVG motion-tracking skeleton overlay and a "Tracking… 92%" tag, three what-you-get bullets, and a 6-week cost comparison strip ($0 Sword vs ~$300 in-person).
- [x] **Wire Beat 8 (Sword).** Script turns: agent presents two paths → chips (Show me Sword / Skip Sword) → media-only Sword card turn (4.5s pause) → "That's the gist…" agent message → chips (in-person / try Sword) → "Totally fine, I'll keep Sword in your Health Story" agent message. Empty-text agent turns supported in ChatRunner so a card can land alone before the next agent message streams.
- [x] **Build `MapView` component.** `src/components/MapView.jsx`. Stylized SVG street grid (no external image needed) + absolute-positioned pins driven by `pin: {x, y}` percentages. Highlighted pins are filled with Highmark primary.
- [x] **Build `ProviderCard` component.** `src/components/ProviderCard.jsx`. Name, practice, distance, rating + reviews, copay, next-available row with calendar icon. Tier 1 = success-green badge, Tier 2 = neutral badge. Highlighted variant gets a Highmark-primary border and soft shadow. Composed with `MapView` via `ProviderSearch.jsx`.
- [x] **Wire Beat 9 (provider search).** Single agent message with `media: { kind: 'providerSearch', variant: 'all' }` and `mediaPosition: 'above'` — the map + 3 cards land first, then the agent text streams below. Chips: weekend / soonest / book Patel.
- [x] **Wire Beat 10 (filter to weekend).** Same `providerSearch` media, `variant: 'weekend'`, with the filtered 2-card list and Saturday slot dates. Patel stays highlighted.
- [x] **Build `ConfirmationCard` component.** `src/components/ConfirmationCard.jsx`. Green check header, doctor + practice, calendar/location/email rows, optional `extras` lines. Reused for both PT and the colonoscopy callback.
- [x] **Wire Beat 11 (booking + callback transition).** Two-message Beat 11: (1) agent message with `confirmation` media above + "One down. Your PT is on the calendar.", (2) follow-up "While I have you — your colonoscopy was the original reason I reached out today…" + chips `Yeah, let's do it` / `Not today, ping me later`. No Recovery Plan canvas — descoped per plan revision.

### Done when

You can play from start through booking confirmation and the colonoscopy callback prompt. The map and provider cards look credibly like a real product, not a wireframe. Tier 1 / Tier 2 cost framing is visible without being preachy. Total runtime should be around 4:30 to 5:00 to this point.

### Files touched
- `src/components/SwordPreviewCard.jsx` (new)
- `src/components/MapView.jsx` (new)
- `src/components/ProviderCard.jsx` (new)
- `src/components/ConfirmationCard.jsx` (new)
- `src/data/visionScript.js` (extend through Beat 11)
- `public/assets/` (add map image, Sword mockup, PT avatar)

---

## Phase 4 — Beat 12 colonoscopy callback + Beat 13 tally

**Goal:** Demo plays end to end. The arc closes by returning to the original outreach reason.

### Tasks

- [ ] **Wire Beat 12 (colonoscopy callback).** On "Yeah, let's do it" chip from Beat 11, agent suggests a Saturday slot at AHN Wexford with Dr. Sarah Chen, June 13. Chips: "Book it" / "Show me other options." On book, ConfirmationCard renders with $0 cost (preventive) and `jessica@company.com` calendar invite. Agent closes with "two appointments on the calendar, two care gaps closed. Anything else?" Final chips: "I'm good, thanks" / "What if my back gets worse before Saturday?"
- [ ] **Wire Beat 13 (optional tally frame).** A simple static reveal: bullet list of what was accomplished, "zero phone calls" punchline. Could be inside the sidebar or as a full-screen takeover. Recommend full-screen for impact.
- [ ] **End-to-end timing pass.** Run the demo three times. Should land around 6:00 to 7:00. If too short, lengthen the agent's pause in Beat 11 between confirmation and callback prompt. If too long, trim Beat 5's video duration and Beat 8's Sword card pause.

### Done when

Demo plays from spreadsheet to tally screen without intervention. Two HEDIS gaps closed visibly.

### Files touched
- `src/data/visionScript.js` (extend through Beat 13)
- Reuses `ConfirmationCard.jsx` from Phase 3
- Possibly a new `src/screens/TallyScreen.jsx` if the tally is a full-screen takeover

---

## Phase 5 — Polish + rehearsal

**Goal:** Make it feel like a product, not a demo.

### Tasks

- [ ] **Copy review.** Have someone (Brian, Chris, or Mikesh) read through every agent and user message. Any line that doesn't sound like Highmark, kill it.
- [ ] **Animation pass.** Anything stuttery? Anything that feels janky on a mid-spec laptop (since Brian will likely present from one)? Fix.
- [ ] **Cross-browser check.** Chrome (primary), Safari, Edge. Anything broken?
- [ ] **Performance pass.** Lazy-load any large images so the home doesn't take more than 2 seconds to render.
- [ ] **Internal full-team rehearsal.** Brian doing the voiceover, others watching. Time it. Take notes on anything that feels off.
- [ ] **Address rehearsal notes.**

### Done when

You can play the demo three times in a row without a hitch. Brian feels confident voicing it over.

---

## Phase 6 — Final QA and deploy

**Goal:** Production-ready. Anything you ship here is what shows up live.

### Tasks

- [ ] **Final copy polish from rehearsal notes.**
- [ ] **Push to main.** Confirm GitHub Pages builds and serves. Test the live URL on the actual machine that will run the demo.
- [ ] **Save offline backup.** `npm run build` and zip the `dist/` folder. Have it on a USB drive in case the wifi at the pitch is weak.
- [ ] **Final rehearsal.** One more end-to-end run.

### Done when

Live URL works from the demo machine, offline backup is saved, no open issues.

---

## Risk and descope plan

If you fall behind, descope in this order:

1. **Drop Beat 13** (the tally frame). Optional already.
2. **Simplify Beat 8's Sword card.** Cut the cost comparison table, just verbal mention.
3. **Skip Beat 10** (the filter step). Go straight to booking from the first map view.

Protect at all costs:
- The typed pivot in Beat 6
- The Sword preview in Beat 8 (the point solution moment)
- The colonoscopy callback in Beat 12

These three beats are the spine of the story. Without any of them, the demo loses its punch.

If you fall further behind:

4. **Hide the Benefits Agent and Health Coach Integration menu entries.** Disable the buttons or remove them from `STAGE_ORDER` so the menu only shows AI Vision Demo. Saves you from needing to build placeholder screens.

---

## File map (what lives where)

```
src/
├── App.jsx                          [built]
├── main.jsx                         [built]
├── index.css                        [built]
├── data/
│   ├── stages.js                    [built]
│   └── visionScript.js              [Phase 1, extended through Phase 4]
├── screens/
│   ├── StageMenu.jsx                [built]
│   ├── FlowRunner.jsx               [built]
│   ├── SpreadsheetScreen.jsx        [built]
│   ├── MessagesScreen.jsx           [built]
│   └── HomeScreen.jsx               [built]
└── components/
    ├── AISidebar.jsx                [built, will need updates]
    ├── ChatRunner.jsx               [Phase 1]
    ├── AgentMessage.jsx             [Phase 1]
    ├── UserMessage.jsx              [Phase 1]
    ├── SuggestedReplies.jsx         [Phase 1]
    ├── VideoPlayer.jsx              [Phase 2]
    ├── SwordPreviewCard.jsx         [Phase 3]
    ├── MapView.jsx                  [Phase 3]
    ├── ProviderCard.jsx             [Phase 3]
    └── ConfirmationCard.jsx         [Phase 3]
```

---

## How to use this plan in Claude Code

1. Read this file and `DEMO_SCRIPT.md`.
2. Pick the current phase, start with the first unchecked task.
3. Check off tasks as you complete them by editing this file.
4. If something deviates from the plan (a new component, a different approach), note it inline so the plan stays accurate.
5. At the end of each phase, run the demo end to end up to the latest beat. Don't move to the next phase until the current arc plays cleanly.

If a phase is taking longer than expected, look at the descope plan above instead of letting later phases get squeezed.
