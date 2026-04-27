# Highmark Vision Demo, End-to-End Script

**Persona:** Jessica, 47, Pittsburgh-area Highmark West Virginia member. Office worker. Mid-workday at her desk on a Wednesday afternoon.

**Outreach trigger (why the AI texted):** Colonoscopy screening, due based on age. Recommended for everyone 45+ per USPSTF.

**Member's actual priority:** Acute lower back pain, ~1 week.

**Demo arc in one sentence:** The AI reaches out about a colonoscopy, the member pivots to her real concern, the AI adapts gracefully and walks her through PT (with Sword Health as the point solution moment), books her in, then circles back to close the colonoscopy gap before she goes.

**Total runtime:** ~6 to 7 minutes.

**Agents featured:**
- Care Gap Agent (opens the loop with colonoscopy outreach, closes it at the end)
- Health Coach Agent (introduces Sword)
- Benefits Navigation Agent (PT and colonoscopy coverage check)
- Care Navigation Agent (PT provider search, map, booking)

---

## Beat 1: Jessica at work (BUILT)

**Visual:** Spreadsheet screen. Jessica is editing a Google Sheet, mid-task.

**Dialogue:** None.

**Purpose:** Establish she is mid-workday, not actively thinking about healthcare. The AI is meeting her where she is.

**Time:** ~5 seconds.

---

## Beat 2: SMS notification (BUILT)

**Visual:** Phone notification banner slides over the spreadsheet.

**Notification preview text:**
> **Highmark Health**
> You're due for a colonoscopy screening. Tap to schedule in a few minutes.

**Time:** ~3 seconds before tap.

---

## Beat 3: Messages thread (BUILT)

**Visual:** iMessage-style thread with Highmark Health.

**SMS body:**
> Hi Jessica, it's Highmark Health.
>
> Your records show you're due for a colonoscopy, an important screening once you turn 45. Most members get it done in a single Saturday morning, fully covered by your plan.
>
> Want help getting it scheduled?
>
> [Get started →]

**User action:** Taps "Get started."

**Time:** ~10 seconds.

---

## Beat 4: Lands on MyHighmark, AI sidebar slides in (BUILT)

**Visual:** The MyHighmark home renders. After ~3 seconds, the AI sidebar slides in from the right.

**Time:** ~5 seconds (3s pause + slide-in).

---

## Beat 5: Agent intro with embedded video

**The video is part of the agent's first message.** No chip-tap required to surface it. The opening message includes intro text + the video player as a single rich card.

**Agent message #1 (sidebar opens, contains the video):**
> Hi Jessica, I'm your Highmark AI assistant. Glad you tapped through.
>
> A colonoscopy is one of the most important screenings for adults 45 and up. It catches colon cancer early when it's most treatable, and it's fully covered on your plan. Here's a quick 60-second overview of what to expect:
>
> [VIDEO PLAYER EMBEDDED IN MESSAGE]

**Visual:** The video player renders inline as part of the agent's first message bubble (or as an attached card immediately below it). Highmark-branded. Static thumbnail with a play button overlay, a title "Your colonoscopy, explained," and a duration chip "1:02." When tapped, swap to a static "now playing" frame. No real video required.

After ~5 to 8 seconds (long enough for Jessica to feel like she watched a bit, or for the demo operator to manually advance), a second agent message lands.

**Agent message #2 (follow-up):**
> Quick highlights from the video:
>
> - Procedure takes about 30 minutes
> - You'll need to fast for ~24 hours and take a prep medication
> - You'll need someone to drive you home
> - Most members do it on a Saturday morning
>
> Ready to find a doctor?

**Suggested replies:**
- "Yes, find me a doctor"
- "I have questions first"
- *(text input field)*

**Time:** ~75 seconds.

---

## Beat 6: The pivot, Jessica TYPES

**This is the wow moment for "the AI is adaptive, not scripted."** Don't tap a chip. Use the text input. Animate the typing.

**Visual:** Cursor lands in the text input. Characters appear one at a time at a realistic typing pace (~75 wpm, with a couple of small pauses for naturalism). Total typing time roughly 10 to 12 seconds.

**Typed message:**
> Honestly, my back has been killing me for the past week. Can we deal with that first?

**User action:** Taps Send.

**Time:** ~12 seconds (typing) + ~2 seconds (read).

---

## Beat 7: Agent adapts gracefully

**Agent:**
> Of course, Jessica. Let's take care of your back first. The colonoscopy can wait, we'll come back to it.
>
> Quick coverage check on physical therapy:
>
> ✓ PT is covered on your plan
> ✓ $25 copay per visit, no deductible required
> ✓ Up to 30 visits per year
> ✓ No referral needed
>
> You actually have two ways to handle this. Want to hear them?

**Suggested replies:**
- **"Yes, what are my options"** (default)
- "Just find me a PT"

**User action:** Taps **"Yes, what are my options."**

**Hidden hook:** Benefits Navigation Agent. Coverage in plain English, accumulator-aware, removes the "how much will this cost" objection before it forms.

**Time:** ~25 seconds.

---

## Beat 8: Sword Health offered (point solution moment)

**Agent:**
> Two paths:
>
> **Sword Health** — A virtual PT program already covered for you at $0. You work from home with a real physical therapist, the app uses your phone camera to track your form in real time. Most members with back pain see improvement in 2 to 3 weeks.
>
> **In-person PT** — A clinic near you, $25 per visit copay. Best if you want hands-on treatment.
>
> Want a quick look at Sword first?

**Suggested replies:**
- **"Show me Sword"** (default)
- "Skip Sword, find me an in-person PT"

**User action:** Taps **"Show me Sword."**

**Visual:** A Sword preview card slides in below the chat. Phone mockup with motion-tracking overlay, a real PT on video, three "what you get" bullets, and a small cost comparison strip:

| | Sword | In-person |
|---|---|---|
| Cost over 6 weeks | **$0** | ~$300 (12 visits at $25) |
| Where | Home, your phone | Clinic |
| Schedule | On your time | Booked appointments |

**Agent (after the card lands, ~5 seconds later):**
> That's the gist. Want to give it a try, or would you prefer to see someone in person?

**Suggested replies:**
- **"I'd rather see someone in person"** (default)
- "Let me try Sword"

**User action:** Taps **"I'd rather see someone in person."**

**Agent:**
> No problem. Let's find you a PT.

**Visual:** Sword card collapses, the map starts to load.

**Hidden hooks:** Health Coach Agent surfaces Sword. Even though Jessica declined, she now knows it exists and saw the cost difference. This is the "point solution awareness grows over time" moment Mikesh and Brian talked about.

**Time:** ~75 seconds.

---

## Beat 9: PT provider search with map

**Visual:** Map of the Pittsburgh area expands inside the sidebar (or pushes the main page slightly to make room). Pins drop in. Three provider cards slide up from the bottom of the sidebar.

**Card 1 (top, highlighted):**
- Dr. Marcus Patel, PT
- AHN Wexford
- 1.4 mi from your home
- **Tier 1, lowest cost** badge
- Next available: Tomorrow, 4:30pm
- 4.8 ★ (215 reviews)
- "$25 copay" chip

**Card 2:**
- Dr. Olivia Reed, PT
- Allegheny Sports & Spine
- 2.1 mi
- Tier 1
- Next available: Friday, 9:00am

**Card 3:**
- Dr. Henry Cho, PT
- NovaCare Pittsburgh
- 4.7 mi
- Tier 2 (higher copay)
- Next available: Today, 5:00pm

**Agent:**
> Three in-network options. I've sorted by Tier 1 first since your plan covers those at the lowest copay. Dr. Patel at AHN Wexford has availability tomorrow afternoon and is the closest to you.

**Suggested replies:**
- **"Show me weekend slots"** (default)
- "Sort by soonest available"
- "Book Dr. Patel"

**User action:** Taps **"Show me weekend slots."**

**Hidden hooks:** Network steerage made visible. Tier 1 vs. Tier 2 with cost framing. Care Navigation Agent.

**Time:** ~45 seconds.

---

## Beat 10: Filter and refine

**Visual:** Map re-pins. Cards animate to two results.

**Card 1 (highlighted):**
- Dr. Marcus Patel, PT, AHN Wexford
- **Saturday, May 9 at 10:00am**
- 1.4 mi, Tier 1, $25 copay

**Card 2:**
- Dr. Olivia Reed, PT, Allegheny Sports & Spine
- Saturday, May 16 at 11:30am
- 2.1 mi, Tier 1, $25 copay

**Agent:**
> Two weekend options. Dr. Patel has the soonest, this Saturday at 10am.

**Suggested replies:**
- **"Book Dr. Patel, Saturday at 10"** (default)
- "Tell me more about him"

**User action:** Taps **"Book Dr. Patel, Saturday at 10."**

**Time:** ~30 seconds.

---

## Beat 11: Booking confirmation

**Visual:** A confirmation card slides up inside the sidebar with a green check.

**Confirmation card content:**
> ✓ **Booked**
> Dr. Marcus Patel, PT
> AHN Wexford
> Saturday, May 9 at 10:00am
> $25 copay
> Calendar invite sent to jessica@company.com

**Agent (below the card, after a brief beat):**
> One down. While I have you, your colonoscopy was the original reason I reached out today. Now that your back is sorted, want me to take care of that too?

**Suggested replies:**
- **"Yeah, let's do it"** (default)
- "Not today, ping me later"

**User action:** Taps **"Yeah, let's do it."**

**Time:** ~30 seconds.

---

## Beat 12: The colonoscopy callback (THE CLOSE)

**Agent:**
> I have a Saturday morning slot at AHN Wexford with Dr. Sarah Chen, June 13. Same building as Dr. Patel, fully covered as preventive care.

**Suggested replies:**
- **"Book it"** (default)
- "Show me other options"

**User action:** Taps **"Book it."**

**Visual:** Confirmation card slides up.

**Confirmation card:**
> ✓ **Colonoscopy booked**
> Dr. Sarah Chen, AHN Wexford
> Saturday, June 13 at 9:00am
> $0 cost (preventive)
> Calendar invite sent to jessica@company.com
> Prep plan will land in your inbox the week before

**Agent:**
> All set. Two appointments on the calendar, two care gaps closed. Anything else?

**Suggested replies:**
- **"I'm good, thanks"** (default)
- "What if my back gets worse before Saturday?"

**User action:** Taps **"I'm good, thanks."**

**Agent:**
> Take care, Jessica. Talk soon.

**Visual:** Sidebar slides closed. The MyHighmark home shows two new items in the calendar widget at the top: Saturday's PT visit and the colonoscopy on June 13. Optional: brief cut back to the spreadsheet, with the appointments visible in her macOS calendar mini-widget on her desktop, completing the "back to your day" arc.

**Hidden hooks (the wow moment):** Two HEDIS gaps closed in one session. The Care Gap Agent didn't lose track of the original reason it reached out, even after Jessica pivoted to a different priority. This is the orchestration moment: one conversation, two outcomes, original mission still completed.

**Time:** ~60 seconds.

---

## Beat 13: Final tally (optional reveal frame)

A static closing frame summarizing what just happened, ~10 seconds:

In a few minutes, Jessica:
- Booked PT with a Tier 1 AHN provider for Saturday
- Booked her colonoscopy at AHN Wexford for June 13
- Closed two HEDIS gaps
- Returned to her workday

**Zero phone calls. Zero portal logins. Zero call center deflections. Zero forms.**

The AI led with what it texted about, listened when Jessica had a different priority, adapted, then circled back to close the original loop.

---

## Total time

| Beat | Time |
|---|---|
| 1. Spreadsheet | 5s |
| 2. SMS notification | 3s |
| 3. Messages thread | 10s |
| 4. Land + sidebar opens | 5s |
| 5. Agent intro + embedded video | 65s |
| 6. **Typed pivot** | 14s |
| 7. Agent adapts + coverage | 25s |
| 8. Sword preview | 75s |
| 9. PT provider search | 45s |
| 10. Filter | 30s |
| 11. Booking + callback prompt | 30s |
| 12. Colonoscopy callback | 60s |
| 13. Tally (optional) | 10s |
| **Total** | **~6:17** |

Buffer for animation and reading: ~6:30 to 7:00.

---

## Build notes

**Typing animation in Beat 6.** This is the single most important UI moment. Render real characters one by one at ~75 wpm with two small pauses (around the comma and after "week"). Use a blinking cursor. This is the "the AI is not scripted" beat. Don't shortcut it with a fade-in.

**Suggested replies vs. typing.** All other inputs are tap-on-chip. Each beat has a primary chip marked **"(default)"**, those are the click paths.

**Video player in Beat 5.** Embedded directly in the agent's first message, no chip-tap required to surface it. Static placeholder. Highmark-branded thumbnail, play button overlay, duration "1:02." When tapped, swap to a "now playing" frame (could be a still illustration of a doctor, or a Highmark-branded animation loop). No real video needed. The point is the agent treating video as a first-class response type and offering it proactively, not waiting to be asked.

**Sword preview card in Beat 8.** Phone mockup with motion-tracking overlay is the centerpiece. The cost comparison strip ($0 vs. $300) is the persuasive frame. Use a real-looking PT avatar to feel human.

**Map and provider cards in Beats 9 and 10.** Plan early whether the sidebar widens (e.g., 400px to 640px) or whether the home page dims and the map overlays. Either works, pick one. The Tier 1 / Tier 2 framing is the most important visual hook here, the costs should be visible without being preachy.

**Beat 11 to 12 transition.** Beat 11's confirmation card lands, then after a brief beat the agent pivots straight into the colonoscopy callback. No Recovery Plan canvas, no multi-week prep flow. The orchestration wow comes from the AI returning to its original mission after Jessica's detour, not from a big visual.

**Persona tells.** The agent's lines should consistently sound like it knows Jessica: "your home" (not "an address"), "AHN Wexford" (specific provider), "the same building as Dr. Patel" (continuity awareness). None of this needs to be displayed on screen, but the language should reinforce it throughout.

**Thinking indicators (the "AI is working" moments).** Right now the AI feels too instant, which makes Tracy and Stacy assume everything is canned. We want short bursts that show the AI fetching, checking, and reasoning. Pattern: a sparkle icon + a sequence of 2 to 4 short status lines that crossfade through (1.2s per line), then dissolve and the next message lands. Reference implementation in the Manulife project: `manulife-demo-april/src/components/StatusLine.jsx` and the `ThinkingInline` component inside `manulife-demo-april/src/screens/ChatFlow.jsx`. Port the same pattern to Highmark, swap colors to Highmark blue gradient.

Where to insert thinking indicators:

- **Before Beat 7's coverage check** (after the typed pivot lands):
  - "Checking PT coverage on your plan..."
  - "Pulling your current accumulators..."

- **Before Beat 8's options** (after Jessica taps "what are my options"):
  - "Looking at point solutions you're eligible for..."
  - "Comparing virtual and in-person options..."

- **Before Beat 9's map** (after Jessica declines Sword):
  - "Searching in-network providers near you..."
  - "Sorting by network tier..."
  - "Pulling Saturday availability..."

- **Before Beat 11's confirmation** (after Jessica taps "Book Dr. Patel, Saturday at 10"):
  - "Booking with Dr. Patel..."
  - "Adding to your calendar..."
  - "Sending the confirmation to jessica@company.com..."

- **Before Beat 12's slot suggestion** (after Jessica taps "Yeah, let's do it"):
  - "Looking at gastroenterology availability at AHN Wexford..."
  - "Finding a Saturday slot..."

- **Before Beat 12's final confirmation** (after Jessica taps "Book it"):
  - "Booking colonoscopy with Dr. Chen..."
  - "Sending preventive care confirmation to jessica@company.com..."

Each thinking burst adds ~3 to 5 seconds. Total demo runtime stretches from ~6:17 to ~7:00 to 7:30, which is closer to the original target and keeps Tracy from feeling like the demo is rushing past her.
