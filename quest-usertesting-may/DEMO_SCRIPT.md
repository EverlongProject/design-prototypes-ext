# Quest AI Care Navigation Demo, End-to-End Script

**Persona:** Mari Patel, 47, working full-time, primary caregiver for her aging mother. Mid-afternoon at her desk on a Tuesday. Behavioral archetype: time-pressured, action-oriented. Easily overwhelmed, frequently abandons scheduling.

**Outreach trigger (why the AI texted):** Mari's annual Basic Health Profile is due. Her Health Story has no flu vaccine on file for this season.

**Member's actual priority:** Get this off her plate without it eating into her day.

**Demo arc in one sentence:** Quest's Care Navigation Agent reaches out via SMS, Mari taps in, the agent finds her an appointment in natural language, **books the screening, then proactively spots a missing flu shot and offers to add it to the same visit (first hero moment)**, Mari accepts, then later changes her mind and types "Cancel my appointment" — the agent intercepts and **saves the booking with a same-location reschedule (second hero moment)** — and after a narrative time gap the Health Coach re-engages when results land in her portal.

**Total runtime:** ~5 to 6 minutes.

**Agents featured:**
- Care Navigation Agent (intake, find, book, recommend bundle)
- Health Coach Agent (post-results re-engagement, Pack Health enrollment)
- Future-state hook: Quest's results interpreter agent, called out verbally as the plug-in point

**Behavioral levers (call these out by name when narrating):**
- SMS deadline cue (no employer-tied team % social proof, compliance-safe)
- 15-minute "in and out" framing in the agent greeting
- Proactive collection-method offer addressing needle phobia
- **Agent proactively spots and offers the missing flu shot, no extra navigation** (first hero moment)
- **Cancel becomes reschedule: agent saves the booking instead of losing it** (second hero moment)
- "HSA-eligible" framing (Mari's employer funds her HSA as a benefit)
- Time-shifted re-engagement when results land (narrative gap, then results banner)

---

## Beat 1: Mari at work

**Visual:** Workspace background. Mari is mid-task on a Tuesday afternoon.

**Dialogue:** None.

**Purpose:** Establish she is mid-workday, not actively thinking about her annual screening. The AI is meeting her where she is.

**Time:** ~5 seconds.

---

## Beat 2: SMS notification

**Visual:** Notification banner slides in from the top right.

**Notification preview text:**
> **Quest**
> Your annual Basic Health Profile is due. 3 weeks left in your screening window. HSA-eligible.

**Time:** ~3 seconds before tap.

---

## Beat 3: Messages thread

**Visual:** iMessage-style thread with Quest.

**SMS body:**
> Your annual Basic Health Profile is due. 3 weeks left in your screening window. HSA-eligible. Tap below to find a spot in under 2 minutes.
>
> [Find your spot, Quest Diagnostics, myquest.com]

**User action:** Taps the link preview.

**Time:** ~8 seconds.

---

## Beat 4: Lands on myQuest portal, AI sidebar slides in

**Visual:** The myQuest portal home renders. After ~2.8 seconds, the AI sidebar slides in from the right.

**Time:** ~5 seconds (pause + slide-in).

---

## Beat 5: Agent greeting

**Agent message:**
> Hi Mari, I'm your Quest Care Navigation Assistant. Glad you tapped through.
>
> Your employer's wellness calendar shows your annual Basic Health Profile is due. Most members are in and out in under 15 minutes, and your visit is HSA-eligible. Want help finding a spot that works with your week?

**Suggested replies:**
- **"Yes, find me a spot"** (primary, triggers the auto-typed pivot)
- "I have a question first"

**Hidden hook:** Tone is concise and action-oriented because Mari's archetype reads as time-pressured. Worth narrating in the room: a different archetype would get warmer, longer copy.

**Behavioral lever:** Present bias addressed with concrete time framing, fights the "chore" perception from Workshop 1.

**Time:** ~25 seconds.

---

## Beat 6: Natural language pivot, Mari TYPES

**This is one of two key UX moments (the other is the recommendation in Beat 9).** Don't tap the chip, use the text input. Animate the typing.

**Visual:** Cursor lands in the input. Characters appear one at a time at ~75 wpm with a couple of natural pauses. Total typing ~8 to 10 seconds.

**Typed message:**
> Find me an appointment near work tomorrow morning, with parking.

**User action:** Taps Send.

**Hidden hook:** Three intent dimensions parsed at once, location, time, and attribute. The agent doesn't ask for a zip code because it already knows Mari's work address from her Health Story.

**Time:** ~12 seconds typing + ~2 seconds read.

---

## Beat 7: Health Story lookup, needle phobia check

**Thinking indicator:**
> Reading your request…
> Pulling your work address from your Health Story…
> Filtering for parking and morning availability…

**Agent:**
> Looks like this is your first Basic Health Profile with us. A quick heads up: you can pick between a standard blood draw or a finger stick at most locations. Want me to filter for finger stick availability?

**Suggested replies:**
- **"Standard blood draw is fine"** (primary)
- "Yes, finger stick please"

**User action:** Taps **"Standard blood draw is fine."**

**Behavioral lever:** Needle phobia was a specific barrier flagged in Workshop 1. The agent surfaces the alternative proactively instead of waiting for Mari to bring it up.

**Time:** ~20 seconds.

---

## Beat 8: Ranked PSC results with map

**Thinking indicator:**
> Searching labs near your work…
> Sorting by your stated preferences…
> Pulling tomorrow morning availability…

**Visual:** A static map renders inside the sidebar with three pins. Three PSC cards stack below. Wexford is highlighted as "Best match."

**Card 1 (highlighted):** Quest PSC, Wexford, 0.8 mi from work, surface lot free, finger stick available, tomorrow 8:00am.
**Card 2:** Quest PSC, Cranberry, 2.3 mi, validated garage, finger stick available, tomorrow 9:30am.
**Card 3:** Quest PSC, McCandless, 4.1 mi, surface lot free, tomorrow 10:15am.

**Agent:**
> Three Quest Patient Service Centers near your work tomorrow morning. I've put the Wexford location at the top, closest to you, surface parking out front, and an 8:00am open slot.

**Suggested replies:**
- **"Book Wexford at 8am"** (primary)
- "Show me other times"

**User action:** Taps **"Book Wexford at 8am."**

**Time:** ~30 seconds.

---

## Beat 9: Booking confirmation (screening alone)

**Thinking indicator (after the booking tap):**
> Securing your appointment…
> Adding to your calendar…
> Sending confirmation to mari@company.com…

**Visual:** Confirmation card slides up.

**Confirmation card content:**
> ✓ **Booked**
> Basic Health Profile
> Quest PSC, Wexford
> Tomorrow, 8:00am
> HSA-eligible
> Calendar invite sent to mari@company.com
> • Bring a photo ID

**Agent (below the card):**
> Done. You're set for Wexford tomorrow at 8:00am.

**Time:** ~12 seconds.

---

## Beat 10: Recommendation moment (THE HERO)

**This is the close. Slow down here. Let the question land.**

**Thinking indicator:**
> Checking your Health Story for any open care gaps…
> No flu vaccine on file for this season…

**Agent:**
> It's flu season, and you haven't had your shot yet. **I can add it to this same visit, same chair, no extra time.** Want me to include it?

**Suggested replies:**
- **"Yes, add the flu shot"** (primary)
- "Just the screening"

**User action:** Taps **"Yes, add the flu shot."**

**Hidden hook (the wow):** Mari already has a confirmed booking. The agent doesn't stop there. It checks her Health Story, spots a missing flu shot, and offers to fold it into the same visit, same chair, no extra navigation. That's the recommendation pattern Quest's team explored in Workshop 2 (January 2026), expressed conversationally and with explicit consent. Call it out in the room: "Today, this would be a separate flow if it happened at all. Here, the agent surfaces it the moment it's relevant."

**Behavioral lever:** Friction. The agent removes the work of remembering, navigating, and re-booking, while keeping consent explicit.

**Time:** ~30 seconds.

---

## Beat 11: Updated confirmation + prep guidance

**Thinking indicator:**
> Adding the flu shot to your visit…
> Updating your appointment…

**Visual:** Updated confirmation card replaces the previous one (or stacks below).

**Confirmation card content:**
> ✓ **Booked**
> Basic Health Profile + flu shot
> Quest PSC, Wexford
> Tomorrow, 8:00am
> HSA-eligible
> Calendar invite sent to mari@company.com
> • No food or drink after midnight
> • Bring a photo ID

**Agent (below the card):**
> Updated. Both are set for Wexford tomorrow at 8:00am.
>
> A couple of prep notes:
>
> - **No food or drink after midnight tonight.** Your profile checks fasting glucose and lipids, both are inaccurate after eating.
> - **Bring a photo ID.** Required for the lab to release results to you.
>
> I'll text you a reminder tonight at 8pm.

**Behavioral lever:** Plain-language framing of *why* each prep step matters. Workshop 1's "explain, don't list" theme.

**Time:** ~25 seconds.

---

## Beat 12: Wrap-up

**Agent:**
> You're all set. I'll have your results ready in your Quest profile within 48 hours of your visit.

**Suggested replies:**
- **"I'm good, thanks"** (primary)
- "What should I expect at the visit?"

**User action:** Taps **"I'm good, thanks."**

**Note:** Removed the "three colleagues booked this week" line and the "I'll handle HR documentation automatically" promise. Both were compliance risks. Less is more here.

**Time:** ~10 seconds.

---

## Beat 12.5: Cancel and reschedule (the save)

**Visual:** The AI sidebar slides closed. The portal becomes interactive again. After ~1.5 seconds, the cursor lands in the hero search bar and the phrase **"Cancel my appointment"** auto-types in character by character. After it settles, the sidebar reopens with a fresh conversation seeded by that user message.

**Why this beat exists:** Cancelling is the riskiest moment in the whole flow. Most apps treat cancel as a one-click destructive path. Here, the agent intercepts intent, asks why, and offers to *save* the booking with a same-location reschedule. This is the second hero beat: the agent saving the booking, not just losing it.

**Agent (after the user message lands):**
> Got it, you'd like to cancel your appointment for tomorrow at 8:00am at Quest PSC Wexford. Mind sharing why? It helps me find better options.

**Suggested replies:**
- **"The time doesn't work"** (primary)
- "Found a better option"
- "I changed my mind"
- "Other reason"

**User action:** Taps **"The time doesn't work."**

**Thinking indicator:**
> Looking for alternative times…
> Checking same-location availability…

**Agent:**
> I have an opening at the **same location, Wexford, on Thursday at 7:30am**. Want me to reschedule instead of canceling?

**Suggested replies:**
- **"Yes, reschedule"** (primary)
- "Just cancel"

**User action:** Taps **"Yes, reschedule."**

**Thinking indicator:**
> Rescheduling your appointment…
> Updating your calendar…
> Sending the new confirmation…

**Visual:** Confirmation card slides up with a green check.

**Confirmation card content:**
> ✓ **Rescheduled**
> Basic Health Profile + flu shot
> Quest PSC — Wexford
> Thursday at 7:30am
> HSA-eligible
> Calendar invite sent to mari@company.com
> • No food or drink after midnight Wednesday
> • Bring a photo ID

**Agent (below the card):**
> Done. You're now set for Wexford on Thursday at 7:30am. Same prep notes apply.

**Suggested replies:**
- **"Thanks"** (primary)

**User action:** Taps **"Thanks."** Sidebar closes; flow proceeds to the results banner.

**Time:** ~45 seconds.

---

## Beat 13: Sidebar closes, "Results are in" banner appears

**Visual:** The AI sidebar slides closed. After a brief delay (~800ms simulating time passing), a "Results are in" banner appears at the top of the portal home, just above the Wellness Incentive card.

**Banner content:**
> ✓ **Your results are in**
> Your Basic Health Profile results are ready to view in your Quest profile.
> [View results] [Ask AI ✨]

**User action:** Taps **"Ask AI."**

**Hidden hook:** This narrative time gap sells the "AI re-engages when relevant" idea. Without it, the entire conversation reads as one canned script. Worth narrating: "Mari finishes her workday, gets her screening, and a couple of days later her results come in. The agent doesn't text her again, it just shows up where she already lives, the portal."

**Time:** ~10 seconds.

---

## Beat 14: Sidebar reopens with Health Coach handoff

**Visual:** Sidebar slides in again. Fresh conversation state. The Care Navigation Agent welcomes her back and hands off context.

**Agent:**
> Welcome back, Mari. Your results came back. Most numbers look good. **Your cholesterol is borderline at 215**, which is a useful early signal.
>
> Your employer covers a nutrition coaching program through Pack Health at zero cost. Most members see meaningful improvement in 8 to 12 weeks. Want me to enroll you?

**Suggested replies:**
- **"Yes, enroll me"** (primary)
- "Tell me more first"

**User action:** Taps **"Yes, enroll me."**

**Agent:**
> Great. I've sent your enrollment details to your inbox. Take care, Mari. Talk soon.

**Hidden hook:** This is the results-to-resources cross-merchandising Quest's team prioritized in Workshop 2, and the future plug-in point for Quest's results interpreter agent. Narrate it: "This handoff is between Care Navigation and Health Coach today. Quest's results interpreter agent plugs in right here in the future, and the orchestration extends across all three teams."

**Time:** ~40 seconds.

---

## Behavioral lever recap (close the demo on this)

The barriers from Quest's January framework, addressed across the flow:

| Barrier | Where it shows up |
|---|---|
| Limited attention | SMS deadline cue (no employer-tied social proof, compliance-safe) |
| Friction | **Agent proactively spots and offers the missing flu shot, no extra navigation (Beat 10, hero)** |
| Present bias | "Under 15 minutes" framing (Beat 5), HSA-eligible reframe (throughout) |
| Status quo bias | Agent does the work on her behalf throughout |
| Social norms | Intentionally restrained, dropped employer-tied claims for compliance |

This recap takes 30 seconds. It's the strongest possible close: it tells Quest you not only built the experience, you built it on their thinking and you respected the compliance edges they care about.

---

## Total time

| Beat | Time |
|---|---|
| 1. Workspace | 5s |
| 2. SMS notification | 3s |
| 3. Messages thread | 8s |
| 4. Land + sidebar opens | 5s |
| 5. Agent greeting | 25s |
| 6. Typed find-care request | 14s |
| 7. Health Story + needle phobia check | 20s |
| 8. Ranked PSC results | 30s |
| 9. Booking confirmation | 12s |
| 10. **Flu shot recommendation (hero)** | 30s |
| 11. Updated confirmation + prep | 25s |
| 12. Wrap-up | 10s |
| 12.5. **Cancel and reschedule (the save)** | 45s |
| 13. Results-are-in banner | 10s |
| 14. Health Coach handoff | 40s |
| **Total** | **~5:12** |

Buffer for animation, thinking indicators, and reading: **~5:00 to 6:00**.

---

## Build notes

**Typing animation in Beat 6.** Real characters one by one at ~75 wpm. Use a blinking cursor. This is the "the AI is not scripted" beat. Don't shortcut with a fade-in.

**Recommendation moment in Beat 10.** Text-only. The agent's question stands on its own, no card. We deliberately removed the visual pre-selection treatment to keep the consent feel obvious in a clinical context. The two-step thinking indicator before the question (`Checking your Health Story for any open care gaps… / No flu vaccine on file for this season…`) does the work of showing the agent's reasoning.

**Two confirmation card variants.** `confirmation` with `variant: 'screening'` shows just the Basic Health Profile after Beat 9. `confirmation` with `variant: 'screeningWithFlu'` replaces it after Beat 11 once the flu shot is added.

**Phase machine in PortalScreen.** Five phases drive the flow: `before-screening` (sidebar auto-opens with PRE script), `pre-cancel` (sidebar closed; hero search auto-types "Cancel my appointment"), `cancel-conversation` (sidebar reopens with RESCHEDULE script), `after-screening` (sidebar closed, results banner visible), `results-conversation` (sidebar reopens with POST script). The sidebar uses `key={phase}` to force a fresh ChatRunner instance on phase change. The `done` phase exits to the StageMenu.

**Hero auto-type in Beat 12.5.** Same timing as the sidebar's `SuggestedReplies.autoType` (TYPING_BASE_MS=35, TYPING_JITTER=25, TYPING_PAUSE_PUNCT=240). The hero input is `readOnly` while typing so the user can't interfere. After the phrase settles (~400ms), the phase flips to `cancel-conversation` and the sidebar opens; the typed phrase is replayed inside the new conversation as the opening `user` turn.

**Sidebar geometry.** Build to match Figma node `15:751`. Highmark's 550px width is a reasonable default if Figma hasn't been measured yet.

**Persona tells.** The agent's lines should consistently reinforce that it knows Mari's context: "your Health Story" (not "your records"), "near your work" (not "near you"), "this season" (specific, not generic), "first Basic Health Profile with us" (history-aware). None of this needs to be displayed on screen, but the language reinforces it throughout.

**Things the agent does NOT know in this demo:**
- Mari's mother's specific health conditions (just "caregiver" context)
- Mari's exact employer or which Pack Health tier they cover
- Any Quest internal tooling beyond what's reachable through her Health Story

If a question comes up in the room: "the Health Story has the data the agent uses; it doesn't have everything."

---

## Source data

The full conversation lives in `src/data/careNavScript.js` as two arrays:
- `CARE_NAV_SCRIPT_PRE` (Beats 5 through 12, the booking flow)
- `CARE_NAV_SCRIPT_POST` (Beat 14, the results conversation)

Location, booking, and bundle objects also live there. Don't rewrite the copy unless explicitly directed.
