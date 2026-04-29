# Prototype 2: Benefits Agent — Conversation Script

Companion to `NEAR_TERM_PROTOTYPES.md` (UX/architecture), `DEMO_SCRIPT.md` (P1 Vision Demo), and `HEALTH_COACH_SCRIPT.md` (P3). This file is the turn-by-turn script for **Prototype 2: Benefits Agent Integration**, the page-scoped sidebar on the Benefits page.

## Demo summary

**Persona:** Jessica, our same Highmark West Virginia member. On the Benefits page mid-day, looking for an answer about her coverage.

**Entry point:** SearchBar on the Benefits page. Heading *"Have a question about your plan?"*, placeholder *"Try 'Am I covered for physical therapy?' or 'What's my deductible?'"*.

**Path chosen for this demo:** Physical therapy coverage. The deck's "What Members Can Ask" list opens with this exact question, and it's the cleanest setup for the demo's hidden punch: surfacing **Sword Thrive** as a $0 covered alternative the member doesn't know about.

**Demo arc in one sentence:** Jessica asks if PT is covered, the agent confirms with real coverage data (copay, deductible status, visit limits), then surfaces Sword Thrive as a covered alternative the member didn't know about, demonstrating in-context partner solution discovery the "lost-in-network" problem the HSA deck calls out.

**Total runtime:** ~1:30 to 2 minutes. Tight, focused. Same shape as P3 by design.

**Phase 1 capabilities demonstrated (per the Highmark roadmap deck):**
- AI has access to benefits booklets, preventive schedules, eligibility data
- AI surfaces accurate copay and deductible info grounded in plan documents
- Note: This script lightly stretches into Phase 2 (proactive partner solution prompting) at Beat 5. We position this as a near-term capability that's part of the Phase 1 to Phase 2 evolution. Worth flagging to Mikesh and Brian.

**Business value demonstrated:**
- Reduce call center volume (member self-serves a coverage question in 30 seconds)
- Drive Living Health solution adoption (Sword Thrive surfaced at the moment of relevance, the HSA deck's exact thesis)
- Increase awareness of underutilized benefits (members don't know Sword is included)
- Solve the "lost-in-network" problem in real-time

---

## Why this scenario

The HSA deck's central insight is that ~98% of point solution traffic flows through the Benefits page, and even there, only ~2% of eligible members ever engage. Members don't know what's covered until something prompts them. This demo shows the agent being that prompt.

The deck's Care in Claims concept (Concept 2) frames it perfectly: *"You've spent $X on this — here's a covered alternative that could eliminate that cost entirely."* This script applies that same pattern at the moment a member is asking about coverage, before they've spent anything. Same behavioral hook (loss aversion + concreteness + choice reduction), earlier in the journey.

The PT path also threads back to Prototype 1, where Liam's hamstring strain leads to PT booking. Tracy and Stacy will see the same Sword product mentioned twice across the three demos, which reinforces the message: this is a real benefit that the AI surfaces in multiple contexts.

---

## Beat 1: Jessica on the Benefits page (BUILT separately)

**Visual:** Jessica is on the Benefits page (P2 landing). MyHighmarkNav at top, Benefits content in the body (Recent Claims, Plan Usage, Insurance Coverage, etc.), SearchBar prominent near the top with heading and placeholder.

**Time:** ~3 seconds for the page to settle.

---

## Beat 2: Jessica types her query

**Visual:** Cursor lands in the SearchBar. Characters appear one by one at ~75 wpm. ~5 seconds total.

**Typed query:**
> Am I covered for physical therapy?

**User action:** Submit.

**Time:** ~7 seconds (typing + small pause + tap submit).

---

## Beat 3: Side rail slides in, agent acknowledges with thinking indicator

**Visual:** The side rail slides in from the right, replacing the Benefits page's right-rail content (Common Tasks, Documents, Additional Resources). Header reads *"Am I covered for physical therapy?"* (the user's query, used as the conversation title). "Powered by AI" badge with sparkle icon below the header.

**Thinking indicator (cycles in side rail body):**
> *"Pulling your plan documents..."*
> *"Checking PT coverage and your accumulators..."*

**Agent message #1:**
> Yes, physical therapy is covered on your Community Blue HDHP 1 plan. Here's the snapshot:

**Time:** ~10 seconds (slide-in + thinking + read).

**Hidden hook:** First proof point that the AI is grounded in the member's actual plan documents and accumulator data, not just FAQ snippets.

---

## Beat 4: Coverage card lands inline

**Visual:** A `CoverageCard` (reused from P1) renders directly inside the agent message. Compact, structured, easy to scan.

**Coverage card content:**
> **PT Coverage · Community Blue HDHP 1**
> ✓ Covered, no referral needed
> $25 copay per visit (after deductible)
> Up to 30 visits per year
> Deductible: $1,500 of $3,000 met

**Time:** ~10 seconds (card animation + read).

**Hidden hooks:**
- The deductible status answers the unspoken second question ("how much will it actually cost me?") before she has to ask it
- "No referral needed" removes a friction point most members don't know about
- Card mirrors the P1 pattern, so when Tracy sees it she'll recognize the consistency across demos

---

## Beat 5: Agent surfaces Sword Thrive as a covered alternative

**This is the punch beat.** It's the entire reason the Benefits Agent isn't just a search box.

**Agent message #2:**
> Before you book a clinic, worth flagging something most members don't know: your plan also includes Sword Thrive at $0. It's virtual PT with a real physical therapist guiding you through exercises via your phone camera. For most MSK issues, it works as well as in-person and saves the copays. A typical PT course is 8 to 12 visits, around $200 to $300 in copays for in-person, or $0 with Sword. Want to take a look?

**Suggested replies:**
- **"Show me Sword Thrive"** (default)
- "I'd rather see someone in person"

**User action:** Taps **"Show me Sword Thrive."**

**Time:** ~22 seconds.

**Hidden hooks (the lost-in-network resolution):**
- "Most members don't know" framing names the problem the HSA deck is built around, and solves it in this exact moment
- $200 to $300 vs $0 cost framing applies the deck's loss aversion + concreteness pattern
- Choice reduction: one alternative surfaced, not a menu of partner solutions
- This is the proof that the Benefits Agent isn't just a coverage lookup, it actively drives Living Health utilization

---

## Beat 6: Sword Thrive detail + external SSO link

**Visual:** A `SwordPreviewCard` (reused from P1) lands in the side rail. Highmark-branded with Sword Thrive identity. Three what-you-get bullets, cost row, primary CTA.

**Card content:**
- **Sword Thrive, covered by your Highmark plan**
- Virtual PT sessions with a licensed physical therapist
- Phone camera tracks your form in real time, no equipment needed
- Personalized program based on your symptoms and progress
- Cost row: $0 with your plan (vs ~$300 for an in-person PT course)
- CTA button: **Get started**

**Agent message #3 (next to or below the card):**
> Sword is one of your Living Health benefits. You can sign in through Highmark with SSO, no separate account needed. Tap Get started and we'll open it in a new tab. You can also find Sword Thrive on this Benefits page anytime, under Additional Benefits.

**User action:** Taps the **Get started** button on the card. A new browser tab opens to the Sword Thrive login page (URL TBD, owner to provide; placeholder for now: `https://platform.swordhealth.com/login`).

**Agent message #4 (right after the tap, in the side rail):**
> Opened in a new tab. Anything else you want me to check while you're here? I can run through your accumulators or look up another benefit.

**Suggested replies:**
- **"What's my deductible status?"** (default)
- "I'm good, thanks"

**Time:** ~30 seconds.

**Hidden hooks:**
- Real link, real product, no fake enrollment. Same hand-off pattern as Spring Health in P3
- "No separate account, sign in with SSO" repeats the Phase 1 friction-reduction message
- Mentioning Additional Benefits educates the member that Sword lives on the Benefits page permanently. Teaches the surface, not just the answer
- The follow-up keeps the conversation open without forcing it. Sets up the optional B-flow (deductible deep dive) cleanly

---

## End of primary script

The primary script ends at the follow-up question in Beat 6.

If the demo presenter taps **"I'm good, thanks"**, the side rail closes gracefully (or stays open, presenter's choice).

If the demo presenter taps **"What's my deductible status?"**, the conversation continues into a B-flow where the agent shows a deductible breakdown (current spend, remaining, out-of-pocket-max status). This B-flow is TBD detail-wise but the pattern mirrors the coverage card from Beat 4.

---

## Total time

| Beat | Time |
|---|---|
| 1. Land on Benefits page | 3s |
| 2. Type "Am I covered for physical therapy?" | 7s |
| 3. Side rail opens + thinking + intro | 10s |
| 4. Coverage card | 10s |
| 5. Agent surfaces Sword Thrive | 22s |
| 6. Sword detail + Get started + follow-up | 30s |
| **Total** | **~1:22** |

With reading buffer, animations, and Brian's voiceover pacing: ~2 minutes.

---

## Optional B-flow: Deductible deep dive

If the demo presenter taps **"What's my deductible status?"** in Beat 6, extend the conversation:

- Agent thinking: *"Pulling your accumulators..."*
- Agent surfaces a `DeductibleCard` with: in-network individual deductible ($1,500 / $3,000), in-network family deductible ($1,500 / $5,000), out-of-pocket-max ($X / $Y), with progress bars
- Agent explains in plain English: *"You're halfway to your individual deductible. After you hit it, your share drops from full cost to your standard copay on most services. Any care you've already had this year toward Liam, Noah, or yourself counts toward the family deductible too."*
- Agent closes: *"Want me to look at anything else?"*

This B-flow is TBD detail-wise but reuses card patterns from P1 and Beat 4. Author when needed.

---

## Build notes

**Components reused from P1, no new components needed for the primary script:**
- `AgentMessage`, `UserMessage`, `StatusLine` / `ThinkingInline`, `SuggestedReplies`, `ChatRunner` (all from P1 Phase 1)
- `CoverageCard` (built for P1 Beat 7's Liam coverage moment, reused here in Beat 4)
- `SwordPreviewCard` (built for P1 Beat 8's Sword preview, reused here in Beat 6)

This is intentional. P2 demonstrates that the same primitive components compose into a totally different flow without rebuilding anything. That's a real architectural win and a Tracy-relevant talking point: *"the same components ship across all three prototypes."*

**One small adaptation needed:** The `SwordPreviewCard` may need a "Sword Thrive" label variant (vs. generic "Sword" used in P1). Add a `variant` prop or pass the label as a prop. Trivial.

**Script data:** Author `src/data/benefitsScript.js` in the same shape as `visionScript.js` and `healthCoachScript.js`. No new turn types needed beyond what P3 already uses.

**Side rail title:** Set to the user's typed query verbatim. *"Am I covered for physical therapy?"* becomes the conversation title.

**Auto-open vs. manual open:** Side rail opens on SearchBar submit, not auto on page load. Keep it triggered.

**Conversation reset on nav:** Per architecture spec, clicking any nav item closes the side rail and drops the conversation.

**Get started link safety:** Sword Thrive CTA must be a real `<a target="_blank" rel="noopener noreferrer">` wrapping the button, not programmatic `window.open()`. Same constraint as Spring Health in P3.

**Sword Thrive login URL:** Owner to confirm. Placeholder is `https://platform.swordhealth.com/login`. Update before May 4.

---

## What this demo proves

**To Tracy and Stacy:** That the Benefits Agent is more than a coverage chatbot. It's a member advocate that surfaces underutilized point solutions exactly when they matter, solving the "lost-in-network" problem the HSA deck flagged as the central CX challenge.

**Quantifiable claims this demo unlocks:**
- "PT coverage answered in 30 seconds, no call to the call center"
- "Sword Thrive utilization grows because members hear about it at the moment they're researching MSK care"
- "The same point solution mentions itself across three contexts (P1, P2, P3), reinforcing awareness"
- "$200-$300 in avoided copays per case where Sword replaces in-person PT"

**To the member (and to Tracy through that lens):**
1. The AI knows her plan, including the deductible status
2. The AI surfaces benefits she didn't know she had at the moment they're relevant
3. The cost framing is concrete and immediate, not abstract
4. The handoff to Sword is real, frictionless, and SSO-based

**To Mikesh and Brian:** That the deck's Phase 1 Benefits Agent capability has been built, with a small lean into Phase 2 (proactive partner solution surfacing) that the HSA design strategy independently validates as the highest-impact pattern.
