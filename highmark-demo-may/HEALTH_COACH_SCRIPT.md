# Prototype 3: Health Coach — Conversation Script

Companion to `NEAR_TERM_PROTOTYPES.md` (UX/architecture) and `DEMO_SCRIPT.md` (P1 Vision Demo). This file is the turn-by-turn script for **Prototype 3: Health Coach Integration**, the page-scoped sidebar on the Journey page.

## Demo summary

**Persona:** Jessica, our same Highmark West Virginia member. On the Journey page mid-day, looking for help.

**Entry point:** SearchBar on the Journey page. Heading *"What do you want to work on?"*, placeholder *"Try 'I want to get healthier' or 'I just got diagnosed with diabetes'"*.

**Path chosen for this demo:** Stress. The deck explicitly calls out *"Chat about stress and see rec for Spring Health"* as the Phase 1 demo flow. The Figma side rail open-state already uses "Help with stress" as the example title. We're building exactly what's been pre-validated.

**Demo arc in one sentence:** Jessica types that she needs help with stress, the AI acknowledges and surfaces three relevant resources from her plan (Spring Health, a Stress Less Journey, and a Sleep Better Journey), she picks Spring Health, the AI signs her up in two taps, she returns to her day.

**Total runtime:** ~2 to 2:30 minutes. Tight, focused, near-term feel. Distinctly shorter than the Vision Demo by design.

**Phase 1 capabilities demonstrated (per the deck):**
- All opt-in Health Journey content available to the AI
- Health Coach aware of Living Health solutions the member is eligible for
- AI UX launched via Journey entry point (Mark chat remains separate)

**Business value demonstrated:**
- Increase Living Health solution enrollment (Spring Health one-tap signup)
- Increase Health Journey program engagement (surfaced as alternative)
- Surface underutilized benefits (most members don't know Spring Health is covered at $0)

---

## Beat 1: Jessica on the Journey page (BUILT separately)

**Visual:** Jessica is on the Journey page (P3 landing). MyHighmarkNav at top, Journey content in the body, SearchBar prominent near the top with heading and placeholder.

**Time:** ~3 seconds for the page to settle and the eye to land on the SearchBar.

---

## Beat 2: Jessica types her query

**Visual:** Cursor lands in the SearchBar. Characters appear one by one at ~75 wpm. Short message, so the typing finishes in ~3 seconds.

**Typed query:**
> Help with stress

**User action:** Submit.

**Time:** ~5 seconds (typing + small pause + tap submit).

---

## Beat 3: Side rail slides in, agent acknowledges with thinking indicator

**Visual:** The side rail slides in from the right (~400px wide, starts below the top nav), replacing the Journey page's right-rail content. Header reads "Help with stress" (the user's query, used as the conversation title — the query is *not* echoed as a user bubble inside the conversation; the title carries it). "Powered by AI" badge with sparkle icon below the header. The body starts streaming the agent's first message after a brief thinking indicator.

**Thinking indicator (cycles in side rail body):**
> *"Pulling your Health Story..."*
> *"Looking at stress-related programs and benefits..."*

**Agent message #1:**
> Sorry to hear you've been dealing with stress, Jessica. It shows up differently for everyone, sometimes as bad sleep, sometimes as feeling stretched thin, sometimes both. I can pull together what's covered on your plan and what we have in your Health Journey to help. Want me to start there, or tell me more about what's been going on first?

**Suggested replies:**
- **"Show me what's available"** (single primary chip)

**User action:** Taps **"Show me what's available."**

**Time:** ~12 seconds (slide-in + thinking + read + tap).

**Hidden hook:** First proof point that the AI is connected to per-member data (Health Story reference) and per-plan benefits, not just a generic chatbot.

---

## Beat 4: Agent surfaces two resources (clickable cards)

**Thinking indicator:**
> *"Matching to programs and partner solutions..."*

**Agent message #2:**
> Here are two options on your plan that could help. Tap one to learn more.

**Visual:** Two stacked, clickable resource cards inside the side rail body. **The whole card is the tap target**, not a chip beneath it. Each card has an icon, a category overline rendered above the name (LIVING HEALTH SOLUTION / HEALTH JOURNEY GOAL), the name itself, a one-line description, and a cost/coverage chip. Hover/active state should clearly signal the tap affordance (border highlight + cursor pointer).

**Card 1:**
- Overline: LIVING HEALTH SOLUTION
- **Spring Health**
- Therapy, coaching, and meditation, all in one app
- $0 with your plan

**Card 2:**
- Overline: HEALTH JOURNEY GOAL
- **Manage Stress**
- A guided goal track in your Health Journey with daily exercises and reflections
- Free, opt-in

**User action:** Taps the **Spring Health** card directly.

**Time:** ~18 seconds.

**Hidden hooks:**
- Two clickable cards, no chips, demonstrates that the AI surfaces resources as first-class UI not just text suggestions
- Spring Health (Living Health solution) and Manage Stress (Health Journey goal) cover both Phase 1 capability buckets the deck calls out
- The agent stays neutral, lets the member choose. No "Spring Health is better" claim. Respects member autonomy and avoids steering optics

---

## Beat 5: Spring Health detail + external SSO link

**Visual:** A `SpringHealthCard` slides in. Top of the card is a placeholder image / branded hero block with the Spring Health wordmark on the green brand gradient. The card body has the title **Spring Health** above three "what you get" bullets, a cost row, and a primary CTA.

**Card content:**
- Hero image block (Spring Health green gradient + wordmark)
- Title: **Spring Health**
- Up to 8 therapy sessions per year
- Coaching, meditation, and self-guided exercises included
- Match with a therapist or coach in 48 hours
- Cost row: $0 with your plan
- CTA button: **Get started**

**Agent message #3 (next to or below the card):**
> Spring Health is one of your Living Health benefits. You can sign in through Highmark with SSO, no separate account needed. Tap Get started and we'll open it in a new tab. You can also find Spring Health on your Benefits page anytime, under Additional Benefits.

**User action:** Taps the **Get started** button on the card. A new browser tab opens to `https://care.springhealth.com/sign_in`.

**Agent message #4 (right after the tap, in the side rail):**
> Opened in a new tab. While you're still here, anything else feeling off lately? I can walk you through Manage Stress in your Health Journey, or help with another goal.

**Suggested replies:**
- **"Show me Manage Stress"** (default)
- "I'm good, thanks"

**Time:** ~30 seconds.

**Hidden hooks:**
- Real link to the actual Spring Health login screen, not a fake confirmation. The AI hands off cleanly and doesn't pretend to do something it can't (no fake account creation, no fake welcome email)
- "No separate account, sign in with SSO" reduces real-world friction and reinforces the "your plan, your existing identity" message
- Mentioning the Benefits page educates the member that Spring Health lives there permanently. Future utilization grows because she now knows where to find it
- The follow-up question is open-ended and lets the conversation continue without forcing it. Demonstrates the AI as a session companion, not a one-shot Q&A

---

## End of primary script

The primary script ends at the follow-up question in Beat 5.

If the demo presenter taps **"I'm good, thanks"**, the conversation jumps past the Manage Stress B-flow straight to the closing turn.

If the demo presenter taps **"Show me Manage Stress"** (the default primary chip), the conversation flows into the B-flow below.

---

## Total time

| Beat | Time |
|---|---|
| 1. Land on Journey page | 3s |
| 2. Type "Help with stress" | 5s |
| 3. Side rail opens + intro + thinking | 12s |
| 4. Two clickable resource cards | 18s |
| 5. Spring Health card + Get started + follow-up | 30s |
| **Total** | **~1:18** |

With reading buffer, animations, and Brian's voiceover pacing: ~2 minutes.

---

## B-flow: Manage Stress

If the demo presenter taps **"Show me Manage Stress"** in Beat 5, the conversation continues:

- Agent thinking: *"Pulling up the Manage Stress journey…"*
- A `ManageStressCard` lands. Same shape as the Spring Health card: hero image block on top (Highmark blue gradient + "Manage Stress" wordmark), title, three what-you-get bullets (4-week guided goal track / Daily 10-minute exercises / Weekly reflections and check-ins), cost row (Free with your plan), CTA: **Add to my journey**
- On tap of the CTA: a 3-step thinking indicator runs:
  1. *"Checking your Health Journey…"*
  2. *"Adding goal…"*
  3. *"Updating actions…"*
- Confirmation message: *"All set, it's been added to your Health Journey. You can find it on the Journey page anytime."*
- Closing question: *"Do you want to complete your first action?"*

---

## Build notes

**Components reused from P1:** `AgentMessage`, `UserMessage`, `StatusLine` / `ThinkingInline`, `SuggestedReplies`, `ChatRunner`. None of these need changes. The P1 chat primitives compose cleanly into the Siderail body.

**New components needed:**
- `ResourceOptionCard.jsx` — Beat 4's two-card list. Each item is a fully clickable card surface (not a chip). Props: `name`, `subtitle`, `description`, `costChip`, `icon`, `onSelect`. Hover/active state should clearly signal the tap affordance. The whole card is the interactive element. Renders as media inside an agent message turn.
- `SpringHealthCard.jsx` — Beat 5's detail card. Mirrors the `SwordPreviewCard` pattern from P1 with Spring Health branding. Three what-you-get bullets, $0 cost row, one primary CTA labeled **Get started**. The CTA opens `https://care.springhealth.com/sign_in` in a new tab via a regular `<a target="_blank" rel="noopener noreferrer">` wrapping the button (no programmatic window.open, keeps it accessible and respects user gesture).

**Script data:** `src/data/healthCoachScript.js` follows the same shape as `visionScript.js`. New turn type added: `resourceOptions` (an array of clickable resource cards). Branching is supported via a `gotoId` field on chips and resourceOptions options — used to skip the Manage Stress B-flow when the user picks "I'm good, thanks" in Beat 5. Other turn types (agent, thinking, input) already supported.

**Side rail title:** Set to the user's typed query verbatim. So when Jessica types "Help with stress," the side rail header reads "Help with stress." Keeps the side rail feeling responsive to her input.

**Auto-open vs. manual open:** The side rail opens on SearchBar submit (not auto on page load like P1's AISidebar). Keep it triggered, not pre-emptive.

**Conversation reset on nav:** Per architecture spec, clicking any nav item closes the side rail and drops the conversation. The user re-opens fresh next time.

**Get started link safety:** The Spring Health CTA uses `target="_blank" rel="noopener noreferrer"`. Don't programmatically open the tab via JS, the browser will block it on production due to popup blockers. The link must be a real anchor wrapping the button.

---

## What this demo proves

**To Tracy:** That Highmark can ship a meaningful AI experience on the existing platform within a quarter, without a full UX redesign or global orchestration layer. The side rail bolts onto Journey today, and the AI hands off to existing Living Health benefits cleanly.

**To the member (and to Tracy through that lens):**
1. The AI knows what's covered on her plan and what programs she's eligible for
2. The AI matches resources to actual member intent, not generic FAQ answers
3. The handoff to Spring Health is real and frictionless (SSO, no separate account)
4. The whole interaction takes about 90 seconds

**To Mikesh and Brian:** That the deck's "Chat about stress and see rec for Spring Health" demo callout has been built, end to end, exactly as scoped, with no fake enrollment flows that overpromise what Phase 1 actually does.
