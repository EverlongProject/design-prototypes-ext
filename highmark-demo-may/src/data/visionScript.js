// Linear conversation script for the AI Vision Demo, driven by ChatRunner.
//
// Turn types:
//   - { type: 'agent', text, advanceAfter?, media?, mediaPosition?, gateOnMedia? }
//       agent message; auto-advances after streaming + advanceAfter ms.
//       Empty text + media is allowed (card-only turns).
//   - { type: 'input', chips: [{label, primary?}], autoType?: { text } }
//       suggested replies + composer; advances when user picks a chip or
//       the auto-typed message commits via the Send button.
//   - { type: 'thinking', lines: string[], perLine?: ms }
//       "AI is working" status line crossfade. Advances when ThinkingInline
//       calls onDone. ~1.2s per line by default.
//
// The conversation covers Beats 5–12 plus thinking bursts at the boundaries
// where the AI is doing real work (coverage check, options lookup, provider
// search, booking, callback slot search, callback booking).

export const VISION_SCRIPT = [
  // ----- Beat 5 — agent intro + embedded video --------------------------------
  {
    id: 'b5-a1',
    type: 'agent',
    text: `Hi Jessica, I'm your Highmark AI assistant. Glad you tapped through.

A colonoscopy is one of the most important screenings for adults 45 and up. It catches colon cancer early when it's most treatable, and it's fully covered on your plan. Here's a quick 60-second overview of what to expect:`,
    media: {
      kind: 'video',
      title: 'Your colonoscopy, explained',
      duration: '1:02',
    },
    advanceAfter: 2500,
  },
  {
    id: 'b5-a2',
    type: 'agent',
    text: `Quick highlights from the video:

• Procedure takes about 30 minutes
• You'll need to fast for ~24 hours and take a prep medication
• You'll need someone to drive you home
• Most members do it on a Saturday morning

Ready to find a doctor?`,
    advanceAfter: 600,
  },
  {
    id: 'b5-input',
    type: 'input',
    chips: [
      // "Yes, find me a doctor" stays on top but is the secondary/outlined option.
      // The primary (blue) chip below — and tapping the input — kicks off the
      // Beat 6 auto-typed pivot.
      { label: 'Yes, find me a doctor' },
      { label: 'I have a question first', primary: true, triggersAutoType: true },
    ],
    autoType: {
      text: "Honestly, my back has been killing me for the past week. Can you help me book a physiotherapy session?",
    },
  },

  // ----- Thinking before Beat 7 (PT coverage check) ---------------------------
  {
    id: 't-coverage',
    type: 'thinking',
    lines: [
      'Checking PT coverage on your plan…',
      'Pulling your current accumulators…',
    ],
  },

  // ----- Beat 7 — agent adapts + PT coverage ---------------------------------
  {
    id: 'b7-a1',
    type: 'agent',
    text: `Of course, Jessica. Let's take care of your back first. The colonoscopy can wait, we'll come back to it.

Quick coverage check on physical therapy:

✓ PT is covered on your plan
✓ $25 copay per visit, no deductible required
✓ Up to 30 visits per year
✓ No referral needed

You actually have two ways to handle this. Want to hear them?`,
    advanceAfter: 600,
  },
  {
    id: 'b7-input',
    type: 'input',
    chips: [
      { label: 'Yes, what are my options', primary: true },
      { label: 'Just find me a PT' },
    ],
  },

  // ----- Thinking before Beat 8 (point solution lookup) ----------------------
  {
    id: 't-options',
    type: 'thinking',
    lines: [
      "Looking at point solutions you're eligible for…",
      'Comparing virtual and in-person options…',
    ],
  },

  // ----- Beat 8 — Sword Health offered ---------------------------------------
  {
    id: 'b8-a1',
    type: 'agent',
    text: `Two paths:

Sword Health — A virtual PT program already covered for you at $0. You work from home with a real physical therapist, the app uses your phone camera to track your form in real time. Most members with back pain see improvement in 2 to 3 weeks.

In-person PT — A clinic near you, $25 per visit copay. Best if you want hands-on treatment.

Want a quick look at Sword first?`,
    advanceAfter: 600,
  },
  {
    id: 'b8-input1',
    type: 'input',
    chips: [
      { label: 'Show me Sword', primary: true },
      { label: 'Skip Sword, find me an in-person PT' },
    ],
  },
  {
    id: 'b8-card',
    type: 'agent',
    text: '',
    media: { kind: 'sword' },
    mediaPosition: 'above',
    advanceAfter: 4500,
  },
  {
    id: 'b8-a2',
    type: 'agent',
    text: `That's the gist. Want to give it a try, or would you prefer to see someone in person?`,
    advanceAfter: 400,
  },
  {
    id: 'b8-input2',
    type: 'input',
    chips: [
      { label: "I'd rather see someone in person", primary: true },
      { label: 'Let me try Sword' },
    ],
  },
  {
    id: 'b8-a3',
    type: 'agent',
    text: `No problem. Let's find you a PT.`,
    advanceAfter: 800,
  },

  // ----- Thinking before Beat 9 (provider search) ----------------------------
  {
    id: 't-providers',
    type: 'thinking',
    lines: [
      'Searching in-network providers near you…',
      'Sorting by network tier…',
      'Pulling Saturday availability…',
    ],
  },

  // ----- Beat 9 — PT provider search -----------------------------------------
  {
    id: 'b9-a1',
    type: 'agent',
    text: `Three in-network options. I've sorted by Tier 1 first since your plan covers those at the lowest copay. Dr. Patel at AHN Wexford has availability tomorrow afternoon and is the closest to you.`,
    media: { kind: 'providerSearch', variant: 'all' },
    mediaPosition: 'above',
    advanceAfter: 600,
  },
  {
    id: 'b9-input',
    type: 'input',
    chips: [
      { label: 'Show me weekend slots', primary: true },
      { label: 'Sort by soonest available' },
      { label: 'Book Dr. Patel' },
    ],
  },

  // ----- Beat 10 — filter to weekend slots -----------------------------------
  {
    id: 'b10-a1',
    type: 'agent',
    text: `Two weekend options. Dr. Patel has the soonest, this Saturday at 10am.`,
    media: { kind: 'providerSearch', variant: 'weekend' },
    mediaPosition: 'above',
    advanceAfter: 500,
  },
  {
    id: 'b10-input',
    type: 'input',
    chips: [
      { label: 'Book Dr. Patel, Saturday at 10', primary: true },
      { label: 'Tell me more about him' },
    ],
  },

  // ----- Thinking before Beat 11 (booking) -----------------------------------
  {
    id: 't-booking',
    type: 'thinking',
    lines: [
      'Booking with Dr. Patel…',
      'Adding to your calendar…',
      'Sending the confirmation to jessica@company.com…',
    ],
  },

  // ----- Beat 11 — booking confirmation, pivots straight to callback ---------
  {
    id: 'b11-a1',
    type: 'agent',
    text: `One down. While I have you, your colonoscopy was the original reason I reached out today. Now that your back is sorted, want me to take care of that too?`,
    media: { kind: 'confirmation', variant: 'pt' },
    mediaPosition: 'above',
    advanceAfter: 600,
  },
  {
    id: 'b11-input',
    type: 'input',
    chips: [
      { label: "Yeah, let's do it", primary: true },
      { label: 'Not today, ping me later' },
    ],
  },

  // ----- Thinking before Beat 12 slot suggestion -----------------------------
  {
    id: 't-callback-slot',
    type: 'thinking',
    lines: [
      'Looking at gastroenterology availability at AHN Wexford…',
      'Finding a Saturday slot…',
    ],
  },

  // ----- Beat 12 — colonoscopy callback --------------------------------------
  {
    id: 'b12-a1',
    type: 'agent',
    text: `I have a Saturday morning slot at AHN Wexford with Dr. Sarah Chen, June 13. Same building as Dr. Patel, fully covered as preventive care.`,
    advanceAfter: 600,
  },
  {
    id: 'b12-input1',
    type: 'input',
    chips: [
      { label: 'Book it', primary: true },
      { label: 'Show me other options' },
    ],
  },

  // ----- Thinking before final colonoscopy confirmation ----------------------
  {
    id: 't-callback-booking',
    type: 'thinking',
    lines: [
      'Booking colonoscopy with Dr. Chen…',
      'Sending preventive care confirmation to jessica@company.com…',
    ],
  },

  // ----- Final confirmation + closing ---------------------------------------
  {
    id: 'b12-a2',
    type: 'agent',
    text: `All set. Two appointments on the calendar, two care gaps closed. Anything else?`,
    media: { kind: 'confirmation', variant: 'colonoscopy' },
    mediaPosition: 'above',
    advanceAfter: 600,
  },
  {
    id: 'b12-input2',
    type: 'input',
    chips: [
      { label: "I'm good, thanks", primary: true },
      { label: 'What if my back gets worse before Saturday?' },
    ],
  },
  {
    id: 'b12-close',
    type: 'agent',
    text: `Take care, Jessica. Talk soon.`,
    advanceAfter: 1000,
  },
]

// Provider data used by both Beat 9 (all) and Beat 10 (weekend filter).
export const PROVIDERS_ALL = [
  {
    id: 'patel',
    name: 'Dr. Marcus Patel, PT',
    practice: 'AHN Wexford',
    distance: '1.4 mi',
    tier: 1,
    nextAvailable: 'Tomorrow, 4:30pm',
    rating: 4.8,
    reviews: 215,
    copay: '$25',
    highlighted: true,
    pin: { x: 28, y: 38 },
  },
  {
    id: 'reed',
    name: 'Dr. Olivia Reed, PT',
    practice: 'Allegheny Sports & Spine',
    distance: '2.1 mi',
    tier: 1,
    nextAvailable: 'Friday, 9:00am',
    rating: 4.7,
    reviews: 168,
    copay: '$25',
    pin: { x: 58, y: 60 },
  },
  {
    id: 'cho',
    name: 'Dr. Henry Cho, PT',
    practice: 'NovaCare Pittsburgh',
    distance: '4.7 mi',
    tier: 2,
    nextAvailable: 'Today, 5:00pm',
    rating: 4.5,
    reviews: 92,
    copay: '$45 copay',
    pin: { x: 82, y: 28 },
  },
]

export const PROVIDERS_WEEKEND = [
  {
    ...PROVIDERS_ALL[0],
    nextAvailable: 'Saturday, May 9 at 10:00am',
    highlighted: true,
  },
  {
    ...PROVIDERS_ALL[1],
    nextAvailable: 'Saturday, May 16 at 11:30am',
    highlighted: false,
  },
]

export const PT_BOOKING = {
  title: 'Booked',
  doctor: 'Dr. Marcus Patel, PT',
  practice: 'AHN Wexford',
  when: 'Saturday, May 9 at 10:00am',
  cost: '$25 copay',
  inviteEmail: 'jessica@company.com',
}

export const COLONOSCOPY_BOOKING = {
  title: 'Colonoscopy booked',
  doctor: 'Dr. Sarah Chen',
  practice: 'AHN Wexford',
  when: 'Saturday, June 13 at 9:00am',
  cost: '$0 cost (preventive)',
  inviteEmail: 'jessica@company.com',
  extras: ['Prep plan will land in your inbox the week before'],
}
