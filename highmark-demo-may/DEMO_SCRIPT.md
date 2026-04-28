# Highmark Vision Demo, End-to-End Script

**Persona:** Jessica, 47, Pittsburgh-area Highmark West Virginia member. Office worker. Mid-workday at her desk on a Wednesday afternoon. Two sons on her plan as dependents: **Liam, 18, varsity high school soccer player**, and **Noah, 14, middle school**.

**Outreach trigger (why the AI texted):** Colonoscopy screening, due based on age. Recommended for everyone 45+ per USPSTF.

**Member's actual priority:** Booking PT for Liam, who hurt his hamstring playing soccer. His doctor (Dr. Martinez) referred him to physical therapy on Tuesday.

**Demo arc in one sentence:** The AI reaches out about Jessica's colonoscopy, she pivots to a more pressing need (booking PT for her injured son), the AI adapts and books Liam in, then bundles Jessica's colonoscopy onto the same Saturday morning at the same AHN facility so the family handles two care needs in one trip.

**Total runtime:** ~6 to 7 minutes.

**Agents featured:**
- Care Gap Agent (opens the loop with colonoscopy outreach, closes it at the end via same-day bundling)
- Health Coach Agent (introduces Sword as a virtual PT option for Liam)
- Benefits Navigation Agent (dependent coverage check, sports injury PT)
- Care Navigation Agent (pediatric / sports PT provider search, map, booking, then GI booking)

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
> My son's doctor told me to book him with a physical therapist after he hurt himself playing soccer. Can you help me get him in?

**User action:** Taps Send.

**Time:** ~14 seconds (typing) + ~2 seconds (read).

---

## Beat 7: Agent adapts and asks which son

**Agent:**
> Of course, Jessica. Let's take care of that first, the colonoscopy can wait.
>
> Quick check, which of your two sons?

**Visual:** A `DependentPicker` card slides into the conversation showing Liam and Noah as two compact selectable cards side by side. Each card has an avatar placeholder, name, age, and a small chevron. The card is rendered as part of the agent's message, not as chips below.

**Dependent picker cards:**
- **Liam, 18** (avatar placeholder)
- **Noah, 14** (avatar placeholder)

**User action:** Taps the **Liam** card.

**Agent (after selection, with thinking indicator):**
> Got it.
>
> *[thinking: "Pulling Liam's records..." → "Checking his coverage and referral..."]*

**Visual:** A compact `CoverageCard` lands in the sidebar showing Liam's coverage snapshot.

**Coverage card content:**
> **LIAM PATEL · COMMUNITY BLUE HDHP 1**
> ✓ Deductible met ($1,500 of $1,500)
> PT visits used: 0 of 30
> Sports injury PT: covered

**Agent (continues, below the card):**
> I see Dr. Martinez sent over a PT referral for Liam on Tuesday for a left hamstring strain. His deductible is already met for the year, so PT visits will be his standard $25 copay. I have access to Liam's records as the primary caregiver on his plan, so I can book this for you.
>
> You actually have two ways to handle this. Want to hear them?

**Suggested replies:**
- **"Yes, what are my options"** (default)
- "Just find him a PT"

**User action:** Taps **"Yes, what are my options."**

**Hidden hook:** This is the new wow beat, and the CoverageCard is the fourth proof point that the AI is connected to real data: not just plan documents (general coverage), not just provider directories, not just appointment systems, but real-time per-member accumulator data. Showing Liam's specific deductible state (met) justifies the $25 copay number rather than just asserting it. The HIPAA framing ("primary caregiver on his plan") gets handled in one line so it doesn't trip up a sharp viewer.

**Time:** ~42 seconds.

---

## Beat 8: Sword Health offered (point solution moment)

**Agent:**
> Two paths for Liam:
>
> **Sword Health** — A virtual PT program covered on your plan at $0. Liam works through guided exercises at home, the app uses his phone camera to track his form, and a real physical therapist reviews his progress. Most athletes with hamstring strains see meaningful improvement in 2 to 3 weeks.
>
> **In-person PT** — A clinic near you, $25 per visit copay. Best for hands-on assessment, especially for a sports injury where a hands-on first visit can speed up recovery.
>
> Want a quick look at Sword first?

**Suggested replies:**
- **"Show me Sword"** (default)
- "Skip Sword, find him an in-person PT"

**User action:** Taps **"Show me Sword."**

**Visual:** A Sword preview card slides in below the chat. Phone mockup with motion-tracking overlay, a real PT on video, three "what you get" bullets, and a small cost comparison strip:

| | Sword | In-person |
|---|---|---|
| Cost over 6 weeks | **$0** | ~$300 (12 visits at $25) |
| Where | Home, his phone | Clinic |
| Schedule | On his time | Booked appointments |

**Agent (after the card lands, ~5 seconds later):**
> That's the gist. Want to give it a try, or would you prefer to see someone in person?

**Suggested replies:**
- **"I'd rather take him in person"** (default)
- "Let's try Sword"

**User action:** Taps **"I'd rather take him in person."**

**Agent:**
> No problem. Let's find him a PT.

**Visual:** Sword card collapses, the map starts to load.

**Hidden hooks:** Health Coach Agent surfaces Sword. Even though Jessica declined for Liam this time, she now knows Sword exists and saw the cost difference. Point solution awareness grows over time.

**Time:** ~75 seconds.

---

## Beat 9: PT provider search with map

**Visual:** Map of the Pittsburgh area expands inside the sidebar (or pushes the main page slightly to make room). Pins drop in. Three provider cards slide up from the bottom of the sidebar.

**Card 1 (top, highlighted):**
- Dr. Marcus Patel, PT (Sports Medicine)
- AHN Sports & Spine, Wexford
- 1.4 mi from your home
- **Tier 1, lowest cost** badge
- Next available: Tomorrow, 4:30pm
- 4.8 ★ (215 reviews)
- "$25 copay" chip

**Card 2:**
- Dr. Olivia Reed, PT (Sports Medicine)
- AHN Sports & Spine, McCandless
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
> Three in-network sports PTs near you. I've sorted by Tier 1 first since your plan covers those at the lowest copay. Dr. Patel at AHN Sports & Spine Wexford has availability tomorrow afternoon and is the closest to your home. He sees a lot of high school athletes.

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
- Dr. Marcus Patel, PT (Sports Medicine), AHN Sports & Spine Wexford
- **Saturday, May 9 at 10:00am**
- 1.4 mi, Tier 1, $25 copay

**Card 2:**
- Dr. Olivia Reed, PT (Sports Medicine), AHN Sports & Spine McCandless
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

## Beat 11: Booking confirmation + same-day callback prompt

**Visual:** A confirmation card slides up inside the sidebar with a green check.

**Confirmation card content:**
> ✓ **Booked for Liam**
> Dr. Marcus Patel, PT (Sports Medicine)
> AHN Sports & Spine, Wexford
> Saturday, May 9 at 10:00am
> $25 copay
> Calendar invite sent to jessica@company.com

**Agent (below the card, after a brief beat):**
> Liam's set for Saturday. While we're here, your colonoscopy was the original reason I reached out today. Since you're already going to be at AHN Wexford that morning for Liam, AHN Wexford has gastroenterology too, and I have an opening Saturday at 8am with Dr. Sarah Chen. Two hours before Liam's PT, same building. You could knock both out in one trip. Want me to book it?

**Suggested replies:**
- **"Yeah, let's do it"** (default)
- "Not this Saturday, ping me later"

**User action:** Taps **"Yeah, let's do it."**

**Hidden hooks:** This is the new orchestration wow. The AI doesn't just remember the original mission, it finds a practical optimization (same day, same building) that no person would think to surface to the member. It saves Jessica a separate trip, which is a tangible value moment any parent in the room will recognize immediately.

**Time:** ~35 seconds.

---

## Beat 12: The colonoscopy bundle (THE CLOSE)

**Agent (with thinking indicator):**
> *[thinking: "Pulling Saturday GI availability at AHN Wexford..." → "Confirming the 8am slot..."]*
>
> Done. Saturday May 9 at 8am with Dr. Sarah Chen at AHN Wexford. Fully covered as preventive care. I'll send your prep instructions Wednesday so you're ready by Friday evening.

**Suggested replies:**
- **"Book it"** (default)
- "Show me other options"

**User action:** Taps **"Book it."**

**Visual:** Confirmation card slides up.

**Confirmation card:**
> ✓ **Colonoscopy booked**
> Dr. Sarah Chen, Gastroenterology
> AHN Wexford (same building as Liam's PT)
> Saturday, May 9 at 8:00am
> $0 cost (preventive)
> Calendar invite sent to jessica@company.com
> Prep plan will land in your inbox Wednesday

**Agent:**
> All set. Two appointments at AHN Wexford on Saturday morning, both care needs handled in one trip. Anything else?

**Suggested replies:**
- **"I'm good, thanks"** (default)
- "What about the prep, what should I expect?"

**User action:** Taps **"I'm good, thanks."**

**Agent:**
> Take care, Jessica. Talk soon.

**Visual:** Sidebar slides closed. The MyHighmark home shows two new items in the calendar widget at the top, both Saturday May 9: Jessica's colonoscopy at 8am and Liam's PT at 10am. Optional: brief cut back to the spreadsheet, with the appointments visible in her macOS calendar mini-widget on her desktop, completing the "back to your day" arc.

**Hidden hooks (the wow moment):** Two HEDIS gaps closed in one session, in one trip, on one Saturday morning. The Care Gap Agent didn't just remember the original mission, it bundled it onto an existing trip the family was already going to make. This is the orchestration moment: one conversation, two outcomes, optimized for the member's life, not for the system's calendar.

**Time:** ~50 seconds.

---

## Beat 13: Final tally (optional reveal frame)

A static closing frame summarizing what just happened, ~10 seconds:

In a few minutes, Jessica:
- Booked Liam's sports PT with a Tier 1 AHN provider for Saturday at 10am
- Bundled her own colonoscopy onto the same Saturday morning at the same AHN building
- Closed two HEDIS gaps
- Returned to her workday

**Zero phone calls. Zero portal logins. Zero separate trips. Zero forms.**

The AI led with what it texted about, listened when Jessica had a different priority, adapted to help her son, then bundled her own care onto the same trip the family was already going to make.

---

## Total time

| Beat | Time |
|---|---|
| 1. Spreadsheet | 5s |
| 2. SMS notification | 3s |
| 3. Messages thread | 10s |
| 4. Land + sidebar opens | 5s |
| 5. Agent intro + embedded video | 65s |
| 6. **Typed pivot** | 16s |
| 7. Agent adapts + dependent picker + coverage card | 42s |
| 8. Sword preview | 75s |
| 9. PT provider search | 45s |
| 10. Filter | 30s |
| 11. Booking + same-day callback prompt | 35s |
| 12. Colonoscopy bundle | 50s |
| 13. Tally (optional) | 10s |
| **Total** | **~6:31** |

Buffer for animation, thinking indicators, and reading: ~7:00 to 7:30.

---

## Build notes

**Typing animation in Beat 6.** This is one of the two most important UI moments (the other being the dependent picker). Render real characters one by one at ~75 wpm with two small pauses (around the comma and after "soccer"). Use a blinking cursor. This is the "the AI is not scripted" beat. Don't shortcut it with a fade-in.

**Dependent picker in Beat 7.** New component: `DependentPicker.jsx`. Two side-by-side selectable cards (Liam, Noah) with avatar placeholders, name, and age. Selecting one commits a `UserMessage` like "Liam" and advances. This is the second wow moment of the demo and demonstrates the AI's family awareness more concretely than any line of agent copy could.

**Coverage card in Beat 7.** New component: `CoverageCard.jsx`. Compact, ~3 lines: plan name, deductible state with progress, PT visits used, sports injury coverage status. Lands inline as the agent's first response after Liam is selected, paired with the "Pulling Liam's records..." thinking indicator. Justifies the $25 copay number ("his deductible is already met") rather than asserting it. Fourth proof point that the AI is connected to real per-member data.

**Suggested replies vs. typing.** All other user inputs are tap-on-chip or tap-on-card. Each beat has a primary chip marked **"(default)"**, those are the click paths.

**Video player in Beat 5.** Embedded directly in the agent's first message, no chip-tap required to surface it. Static placeholder. Highmark-branded thumbnail, play button overlay, duration "1:02." When tapped, swap to a "now playing" frame (could be a still illustration of a doctor, or a Highmark-branded animation loop). No real video needed. The point is the agent treating video as a first-class response type and offering it proactively, not waiting to be asked.

**Sword preview card in Beat 8.** Phone mockup with motion-tracking overlay is the centerpiece. The cost comparison strip ($0 vs. $300) is the persuasive frame. Use a real-looking PT avatar to feel human. Note: the agent does NOT reference Liam moving away or going to college, those facts are not in the AI's knowledge for this demo.

**Map and provider cards in Beats 9 and 10.** Plan early whether the sidebar widens (e.g., 400px to 640px) or whether the home page dims and the map overlays. Either works, pick one. The Tier 1 / Tier 2 framing is the most important visual hook here, the costs should be visible without being preachy. Providers are sports medicine PTs (AHN Sports & Spine), not generic adult PT.

**Beat 11 to 12 transition (the new wow).** Beat 11's confirmation card lands for Liam, then after a brief beat the agent surfaces the practical optimization: same Saturday morning, same AHN building, two hours apart. The orchestration moment isn't just "the AI remembered the original mission," it's "the AI found a way to bundle Jessica's care onto a trip the family was already going to make." That's the demoable proof of an AI that thinks about the member's life, not just the system's calendar.

**Persona tells.** The agent's lines should consistently sound like it knows Jessica's family: "Liam" (by name, after disambiguation), "your home" (not "an address"), "AHN Sports & Spine Wexford" (specific facility), "same building as Liam's PT" (continuity awareness). None of this needs to be displayed on screen, but the language should reinforce it throughout. Things the agent does NOT know in this demo: that Liam is going to college, his school name, when he's leaving home. Don't reference any of that.

**Thinking indicators (the "AI is working" moments).** Right now the AI feels too instant, which makes Tracy and Stacy assume everything is canned. We want short bursts that show the AI fetching, checking, and reasoning. Pattern: a sparkle icon + a sequence of 2 to 4 short status lines that crossfade through (1.2s per line), then dissolve and the next message lands. Reference implementation in the Manulife project: `manulife-demo-april/src/components/StatusLine.jsx` and the `ThinkingInline` component inside `manulife-demo-april/src/screens/ChatFlow.jsx`. Port the same pattern to Highmark, swap colors to Highmark blue gradient.

Where to insert thinking indicators:

- **Before the dependent picker in Beat 7** (after the typed pivot lands):
  - "Looking up your dependents..."
  - "Pulling Liam and Noah's plans..."

- **After Liam is selected, before the CoverageCard lands** (already scripted as the inline thinking moment):
  - "Pulling Liam's records..."
  - "Checking his coverage and referral..."

- **Before Beat 8's options** (after Jessica taps "what are my options"):
  - "Checking sports PT coverage on Liam's plan..."
  - "Looking at virtual and in-person options..."

- **Before Beat 9's map** (after Jessica declines Sword):
  - "Searching sports PTs near you..."
  - "Sorting by network tier..."
  - "Pulling Saturday availability..."

- **Before Beat 11's confirmation** (after Jessica taps "Book Dr. Patel, Saturday at 10"):
  - "Booking Liam with Dr. Patel..."
  - "Adding to your calendar..."
  - "Sending the confirmation to jessica@company.com..."

- **Before Beat 12's slot suggestion** (after Jessica taps "Yeah, let's do it"):
  - "Checking gastroenterology at AHN Wexford..."
  - "Looking for a Saturday slot before Liam's PT..."
  - "Found one at 8am with Dr. Chen..."

- **Before Beat 12's final confirmation** (after Jessica taps "Book it"):
  - "Booking your colonoscopy with Dr. Chen..."
  - "Sending preventive care confirmation to jessica@company.com..."

Each thinking burst adds ~3 to 5 seconds. With these inserted, the demo runs ~7:00 to 7:30 instead of feeling rushed.
