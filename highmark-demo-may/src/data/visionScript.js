// Linear conversation script for the AI Vision Demo, driven by ChatRunner.
//
// Turn types:
//   - { type: 'agent', text, advanceAfter?, media?, mediaPosition?, gateOnMedia? }
//       agent message; auto-advances after streaming + advanceAfter ms.
//       Empty text + media is allowed (card-only turns).
//   - { type: 'input', chips: [{label, primary?, triggersAutoType?}], autoType?: { text } }
//       suggested replies + composer; advances when user picks a chip or
//       the auto-typed message commits via the Send button.
//   - { type: 'dependentPicker', options: [{ id, name, age }] }
//       inline two-card picker. Selecting a card commits a UserMessage
//       (the option name) and advances.
//   - { type: 'thinking', lines: string[], perLine?: ms }
//       "AI is working" status line crossfade. Advances when ThinkingInline
//       calls onDone. ~1.2s per line by default.
//
// Caregiver scenario: Jessica (47) has two sons on her plan, Liam (18, varsity
// soccer) and Noah (14). The AI texted about Jessica's colonoscopy. She pivots
// to booking PT for Liam (hamstring strain, Dr. Martinez referred Tuesday).
// The AI books Liam's sports PT, then bundles Jessica's colonoscopy onto the
// same Saturday morning at the same AHN Wexford facility, two hours earlier.

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
      text: "My son's doctor told me to book him with a physical therapist after he hurt himself playing soccer. Can you help me get him in?",
    },
  },

  // ----- Thinking before Beat 7 (look up dependents) -------------------------
  {
    id: 't-dependents',
    type: 'thinking',
    lines: [
      'Looking up your dependents…',
      "Pulling Liam and Noah's plans…",
    ],
  },

  // ----- Beat 7 — agent adapts + dependent picker ----------------------------
  {
    id: 'b7-a1',
    type: 'agent',
    text: `Of course, Jessica. Let's take care of that first, the colonoscopy can wait.

Quick check, which of your two sons?`,
    advanceAfter: 200,
  },
  {
    id: 'b7-picker',
    type: 'dependentPicker',
    options: [
      { id: 'liam', name: 'Liam', age: 18 },
      { id: 'noah', name: 'Noah', age: 14 },
    ],
  },
  {
    id: 'b7-a2',
    type: 'agent',
    text: `Got it.`,
    advanceAfter: 200,
  },
  {
    id: 't-records',
    type: 'thinking',
    lines: [
      "Pulling Liam's records…",
      'Checking his coverage and referral…',
    ],
  },
  {
    id: 'b7-a3',
    type: 'agent',
    text: `**His deductible is already met for the year, so PT visits will be his standard $25 copay.** Sports injury PT is covered on your plan, and we already have his referral so no extra step. I have access to Liam's records as the primary caregiver on his plan, so I can book this for you.

You actually have two ways to handle this. Want to hear them?`,
    media: { kind: 'coverage' },
    mediaPosition: 'above',
    advanceAfter: 600,
  },
  {
    id: 'b7-input',
    type: 'input',
    chips: [
      { label: 'Yes, what are my options', primary: true },
      { label: 'Just find him a PT' },
    ],
  },

  // ----- Thinking before Beat 8 (point solution lookup) ----------------------
  {
    id: 't-options',
    type: 'thinking',
    lines: [
      "Checking sports PT coverage on Liam's plan…",
      'Looking at virtual and in-person options…',
    ],
  },

  // ----- Beat 8 — Sword Health offered, framed for Liam ----------------------
  {
    id: 'b8-a1',
    type: 'agent',
    text: `Two paths for Liam:

**Sword Health — A virtual PT program covered on your plan at $0.** Liam works through guided exercises at home, the app uses his phone camera to track his form, and a real physical therapist reviews his progress. Most athletes with hamstring strains see meaningful improvement in 2 to 3 weeks.

**In-person PT — A clinic near you, $25 per visit copay.** Best for hands-on assessment, especially for a sports injury where a hands-on first visit can speed up recovery.

Want a quick look at Sword first?`,
    advanceAfter: 600,
  },
  {
    id: 'b8-input1',
    type: 'input',
    chips: [
      { label: 'Show me Sword', primary: true },
      { label: 'Skip Sword, find him an in-person PT' },
    ],
  },
  // Thinking before the Sword card lands
  {
    id: 't-sword',
    type: 'thinking',
    lines: [
      'Looking up your benefits…',
      'Pulling Sword Health information…',
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
      { label: 'See someone in person', primary: true },
      { label: "Let's try Sword" },
    ],
  },
  {
    id: 'b8-a3',
    type: 'agent',
    text: `No problem. Let's find him a PT.`,
    advanceAfter: 800,
  },

  // ----- Thinking before Beat 9 (provider search) ----------------------------
  {
    id: 't-providers',
    type: 'thinking',
    lines: [
      'Searching sports PTs near you…',
      'Sorting by network tier…',
      'Pulling availability…',
    ],
  },

  // ----- Beat 9 — sports PT provider search ----------------------------------
  {
    id: 'b9-a1',
    type: 'agent',
    text: `Three in-network sports PTs near you. I've sorted by Tier 1 first since your plan covers those at the lowest copay. Dr. Patel at AHN Sports & Spine Wexford has availability tomorrow afternoon and is the closest to your home. He sees a lot of high school athletes.`,
    media: { kind: 'providerSearch', variant: 'all' },
    mediaPosition: 'above',
    advanceAfter: 600,
  },
  {
    id: 'b9-input',
    type: 'input',
    chips: [
      { label: 'Book Dr. Patel' },
      { label: 'Soonest available' },
      { label: 'Weekend availability', primary: true },
    ],
  },

  // Thinking before Beat 10's weekend filter
  {
    id: 't-weekend',
    type: 'thinking',
    lines: [
      'Filtering for weekend availability…',
      'Pulling Saturday slots…',
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
      'Booking Liam with Dr. Patel…',
      'Adding to your calendar…',
      'Sending the confirmation to jessica@company.com…',
    ],
  },

  // ----- Beat 11 — booking confirmation, pivots to same-day bundle ----------
  {
    id: 'b11-a1',
    type: 'agent',
    text: `Liam's set for Saturday. While we're here, your colonoscopy was the original reason I reached out today. Since you're already going to be at AHN Wexford that morning for Liam, AHN Wexford has gastroenterology too, and I have an opening Saturday at 8am with Dr. Sarah Chen. Two hours before Liam's PT, same building. You could knock both out in one trip.

**It's fully covered as preventive care on your plan, $0 out of pocket.** Are you interested in scheduling your colonoscopy?`,
    media: { kind: 'confirmation', variant: 'pt' },
    mediaPosition: 'above',
    advanceAfter: 600,
  },
  {
    id: 'b11-input',
    type: 'input',
    chips: [
      { label: 'I am interested', primary: true },
      { label: 'Not right now' },
    ],
  },

  // ----- Thinking before Beat 12 slot suggestion -----------------------------
  {
    id: 't-callback-slot',
    type: 'thinking',
    lines: [
      'Checking gastroenterology at AHN Wexford…',
      "Looking for a Saturday slot before Liam's PT…",
      'Found one at 8am with Dr. Chen…',
    ],
  },

  // ----- Beat 12 — bundle confirmation prompt --------------------------------
  {
    id: 'b12-a1',
    type: 'agent',
    text: `Saturday May 9 at 8am with Dr. Sarah Chen at AHN Wexford. Fully covered as preventive care. I'll send your prep instructions Wednesday so you're ready by Friday evening.`,
    advanceAfter: 600,
  },
  {
    id: 'b12-input1',
    type: 'input',
    chips: [
      { label: 'Book appointment', primary: true },
      { label: 'Show me other options' },
    ],
  },

  // ----- Thinking before Beat 12 final confirmation --------------------------
  {
    id: 't-callback-booking',
    type: 'thinking',
    lines: [
      'Booking your colonoscopy with Dr. Chen…',
      'Sending preventive care confirmation to jessica@company.com…',
    ],
  },

  // ----- Final confirmation + closing ---------------------------------------
  {
    id: 'b12-a2',
    type: 'agent',
    text: `All set. Two appointments at AHN Wexford on Saturday morning, both care needs handled in one trip. Anything else?`,
    media: { kind: 'confirmation', variant: 'colonoscopy' },
    mediaPosition: 'above',
    advanceAfter: 600,
  },
  {
    id: 'b12-input2',
    type: 'input',
    chips: [
      { label: "I'm good, thanks", primary: true },
      { label: 'What about the prep, what should I expect?' },
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
// Sports medicine PTs (AHN Sports & Spine), not generic adult PT.
export const PROVIDERS_ALL = [
  {
    id: 'patel',
    name: 'Dr. Marcus Patel, PT',
    practice: 'AHN Sports & Spine, Wexford',
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
    practice: 'AHN Sports & Spine, McCandless',
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
  title: 'Booked for Liam',
  doctor: 'Dr. Marcus Patel, PT (Sports Medicine)',
  practice: 'AHN Sports & Spine, Wexford',
  when: 'Saturday, May 9 at 10:00am',
  cost: '$25 copay',
  inviteEmail: 'jessica@company.com',
}

export const COLONOSCOPY_BOOKING = {
  title: 'Colonoscopy booked',
  doctor: 'Dr. Sarah Chen, Gastroenterology',
  practice: 'AHN Wexford (same building as Liam’s PT)',
  when: 'Saturday, May 9 at 8:00am',
  cost: '$0 cost (preventive)',
  inviteEmail: 'jessica@company.com',
  extras: ['Prep plan will land in your inbox Wednesday'],
}
