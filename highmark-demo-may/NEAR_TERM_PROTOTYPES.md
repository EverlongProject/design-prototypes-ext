# Near-term Prototypes (P2 + P3) Spec

Companion document to `DEMO_SCRIPT.md` (which covers Prototype 1, the AI Vision Demo). This file covers Prototype 2 (Benefits Agent Integration) and Prototype 3 (Health Coach Integration), which share UI scaffolding and a different UX paradigm from P1.

## What's different about P2 and P3

P1 is the 2027 vision: a global AI front door inside a redesigned MyHighmark home, with a persistent conversation that owns the orchestration across agent teams.

P2 and P3 are the **near-term, ship-this-year** version: a side rail bolted onto the existing MyHighmark experience (Benefits page, Journey page). The side rail is **page-scoped**, not global. If the user navigates away, the conversation is gone.

This contrast is intentional. The pitch tells Highmark "here's what we can do this year (P2 and P3), and here's where it goes (P1)."

## Shared UX behavior

**Entry point.** Each landing page has a prominent `SearchBar` near the top with the heading "Get answers for your questions" and a sparkle-icon input. The user types a question and hits Search.

**Side rail opens.** A `Siderail` component slides in from the right, replacing or covering the existing right-rail content (Common Tasks, Documents, Additional Resources on Benefits; whatever the equivalent is on Journey). The side rail has a title, an X close button in the top right, a "Powered by AI" badge with a sparkle icon, and the agent's response in the body.

**Conversation runs in-page.** The agent message streams or animates in. Subsequent turns (suggested replies, follow-ups) happen inside the side rail. Reuse the chat primitives from P1 (`AgentMessage`, `UserMessage`, `SuggestedReplies`, `ChatRunner` if practical) so we get streaming, chips, and thinking indicators for free.

**Navigation away kills context.** If the user clicks any item in the top nav (Home, Benefits, Get Care, Journey, Support), the side rail closes and the conversation state is dropped. Re-opening the side rail starts fresh.

**Cross-prototype navigation.** Clicking "Benefits" navigates to the P2 page. Clicking "Journey" navigates to the P3 page. Both pages share the same top nav and footer. So inside either prototype, the user can toggle between them through the nav alone.

## Shared components (build once, use in both)

**`MyHighmarkNav.jsx`** — The standalone top nav bar shown on both P2 and P3. Different from P1's embedded TopNav (which lives inside the hero band). Layout: Highmark West Virginia logo on the left, nav items in the center (Home, Benefits, Get Care, Journey, Support), user dropdown on the right ("MICHELLE" per the Figma). Active nav item gets the underline + bold treatment matching the design.

**`SearchBar.jsx`** — The search component used as the AI entry point on both pages. Heading "Get answers for your questions" + an input with sparkle icon, placeholder text varying per page ("Ask about your benefits, claims and coverage" on P2, equivalent on P3), and a "Search" button on the right. On submit, it opens the side rail with the typed query.

**`Siderail.jsx`** — The page-scoped AI panel. Slides in from the right, ~400 to 480px wide based on Figma. Contains:
  - Header: title (e.g., "Help with stress"), X close button
  - "Powered by AI" badge with sparkle icon
  - Body: agent response area, designed to compose existing chat primitives (AgentMessage, UserMessage, SuggestedReplies, etc.)
  - Optional: input/chips at the bottom for follow-up turns

**`Footer.jsx`** — Whatever footer exists at the bottom of the page in the Figma. Likely simple, links + small print.

## Prototype 2: Benefits Agent

**Figma references:**
- Landing page: file `Ej1FaauWAcnqGdXTL604nv`, node `13:9974`
- Side rail open: file `Ej1FaauWAcnqGdXTL604nv`, node `19:12871`

**Page structure (BenefitsScreen.jsx):**
- MyHighmarkNav at top
- Page title: "Benefits"
- SearchBar with heading "Get answers for your questions" and placeholder "Ask about your benefits, claims and coverage"
- Tabs: Active Plan / Past Plan / Pending Plan (Active Plan is selected)
- Recent Claims section: 2 claim cards (Pam Beesly MD / Sabrina Ionescu DDS), each with status, member, claim ID, cost
- Plan Usage section: Your Deductible + Family Deductible cards with progress bars
- Insurance Coverage section: 4 tiles in a 2x2 grid (Medical, Prescription, Dental, Vision)
- Spending Accounts section: 4 tiles (HSA, FSA, Limited Purpose FSA, Transportation Savings Account)
- Additional Benefits section: 4 tiles (Health and Wellbeing/Sharecare, Well360 Virtual Health, Virtual Physical Care/SWORD, Diabetes Management/Onduo)
- Right sidebar (when Siderail is closed): Common Tasks, Documents, Additional Resources

**Side rail open state:**
- Right sidebar gets covered by the Siderail
- Title in the example is "Help with stress" (placeholder query)
- Body shows agent response

**Conversation content:** TBD. Build the UI shell, wire SearchBar to open Siderail with a placeholder agent message for now. Owner will provide actual flow copy later.

## Prototype 3: Health Coach

**Figma references:**
- Landing page: file `Ej1FaauWAcnqGdXTL604nv`, node `13:7469`
- Side rail open: file `Ej1FaauWAcnqGdXTL604nv`, node `19:12173`

**Page structure (JourneyScreen.jsx):**
Build to match Figma node `13:7469`. Pull layout via `get_design_context`. Includes the SearchBar (different placeholder, likely health-journey oriented) and content sections specific to the Journey/Health Coach context.

**Side rail open state:**
Build to match Figma node `19:12173`.

**Conversation content:** TBD. Same approach as P2: build UI shell, wire trigger, placeholder content for now.

## Architecture decisions

**One stage or two in `stages.js`?** Two. Keep `benefits` and `healthCoach` as separate StageMenu entries so users can pick where to start. Inside either stage, the top nav lets you toggle between BenefitsScreen and JourneyScreen.

**New step types or reuse the existing FlowRunner pattern?** Reuse, but add new step types: `benefitsPage` and `journeyPage`. Each stage's `steps` becomes a single-step flow that renders the appropriate page screen. The page-internal nav swaps which page shows up via local state.

**ChatRunner reuse for P2/P3?** Yes if practical. Both prototypes are conversational flows triggered by a user query. The P1 ChatRunner already handles streaming agent messages, chips, and thinking indicators. Wire the Siderail's body to render a ChatRunner instance with a per-prototype script. Scripts can stay empty (single placeholder turn) until conversation content is provided.

**Conversation state lifecycle.** When the user clicks a nav item, the host page re-mounts the Siderail with a new `key`, which kills any in-progress conversation. When the user clicks the X to close, the Siderail unmounts entirely. Either way, no persistence, by design.
