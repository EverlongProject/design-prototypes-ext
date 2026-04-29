// Linear conversation scripts for the Quest AI Care Navigation demo, driven
// by ChatRunner. Same turn types as the Highmark visionScript:
//
//   { type: 'agent', text, advanceAfter?, media?, mediaPosition?, gateOnMedia? }
//   { type: 'input', chips: [{label, primary?, triggersAutoType?}], autoType?: { text } }
//   { type: 'thinking', lines: string[], perLine?: ms }
//   { type: 'user', text }
//
// A 'user' turn renders a UserMessage bubble with the given text and
// auto-advances after a short delay. Used when the conversation needs to land
// a user message that wasn't typed inside the sidebar (e.g. a phrase the user
// already typed into the portal hero search bar before the sidebar reopened).
//
// The script is split into two parts because the demo has a narrative time gap
// between booking the appointment and the results landing. The portal closes
// the sidebar after CARE_NAV_SCRIPT_PRE finishes, surfaces a "Results are in"
// banner on the home screen, and reopens the sidebar with CARE_NAV_SCRIPT_POST
// when the user taps Ask AI.
//
// PERSONA — Mari Patel, 47, working full-time, primary caregiver for her aging
// mother. Behavioral archetype: time-pressured, action-oriented. Tone
// calibration: concise.
//
// SCENARIO — Mari's annual Biometric Screening is due. Quest texts her, she
// taps in, the agent finds her an appointment in natural language, BOOKS the
// screening, then RECOMMENDS adding a flu shot to the same visit (pre-checked
// recommendation requiring explicit confirmation). After results land later,
// the Health Coach takes over.
//
// COMPLIANCE NOTES (decided 2026-04-28):
//   - No team-percentage social proof anywhere (employer-tied data claim).
//   - Flu shot is offered as a text recommendation, not a pre-selected visual
//     card. Explicit consent only.
//   - "Fully covered" replaced with "HSA-eligible" since Mari pays via her
//     HSA, which her employer funds as a benefit.
//   - No "I'll handle HR documentation" promise (overpromising).

// ---------------------------------------------------------------------------
// Pre-results conversation
// ---------------------------------------------------------------------------
export const CARE_NAV_SCRIPT_PRE = [
  // Beat 1 — agent greeting (archetype-calibrated tone) ----------------------
  {
    id: 'b1-a1',
    type: 'agent',
    text: `Hi Mari, I'm your Quest Care Navigation Assistant. Glad you tapped through.

Your employer's wellness calendar shows your annual Biometric Screening is due. Most members are in and out in under 15 minutes, and your visit is HSA-eligible. Want help finding a spot that works with your week?`,
    advanceAfter: 600,
  },
  {
    id: 'b1-input',
    type: 'input',
    chips: [
      { label: 'Yes, find me a spot', primary: true, triggersAutoType: true },
      { label: 'I have a question first' },
    ],
    autoType: {
      text: 'Find me an appointment near work tomorrow morning, with parking.',
    },
  },

  // Thinking — intent parse + Health Story lookup ---------------------------
  {
    id: 't-find',
    type: 'thinking',
    lines: [
      'Reading your request…',
      'Pulling your work address from your Health Story…',
      'Filtering for parking and morning availability…',
    ],
  },

  // Beat 2 — collection method preference (needle phobia barrier) ------------
  {
    id: 'b2-a1',
    type: 'agent',
    text: `Looks like this is your first Biometric Screening with us. A quick heads up: you can pick between a standard blood draw or a finger stick at most locations. Want me to filter for finger stick availability?`,
    advanceAfter: 600,
  },
  {
    id: 'b2-input',
    type: 'input',
    chips: [
      { label: 'Standard blood draw is fine', primary: true },
      { label: 'Yes, finger stick please' },
    ],
  },

  // Thinking — searching and ranking ----------------------------------------
  {
    id: 't-rank',
    type: 'thinking',
    lines: [
      'Searching labs near your work…',
      'Sorting by your stated preferences…',
      'Pulling tomorrow morning availability…',
    ],
  },

  // Beat 3 — ranked results (map + 3 PSC cards) ------------------------------
  {
    id: 'b3-a1',
    type: 'agent',
    text: `Three Quest Patient Service Centers near your work tomorrow morning. I've put the Wexford location at the top, closest to you, surface parking out front, and an 8:00am open slot.`,
    media: { kind: 'locationSearch', variant: 'all' },
    mediaPosition: 'above',
    advanceAfter: 600,
  },
  {
    id: 'b3-input',
    type: 'input',
    chips: [
      { label: 'Book Wexford at 8am', primary: true },
      { label: 'Show me other times' },
    ],
  },

  // Thinking — booking the appointment --------------------------------------
  {
    id: 't-booking',
    type: 'thinking',
    lines: [
      'Securing your appointment…',
      'Adding to your calendar…',
      'Sending confirmation to mari@company.com…',
    ],
  },

  // Beat 4 — booking confirmation (screening alone) -------------------------
  {
    id: 'b4-a1',
    type: 'agent',
    text: `Done. You're set for Wexford tomorrow at 8:00am.`,
    media: { kind: 'confirmation', variant: 'screening' },
    mediaPosition: 'above',
    advanceAfter: 800,
  },

  // Thinking — care gap check (sets up the recommendation) ------------------
  {
    id: 't-bundle',
    type: 'thinking',
    lines: [
      'Checking your Health Story for any open care gaps…',
      'No flu vaccine on file for this season…',
    ],
  },

  // Beat 5 — RECOMMENDATION moment (text-only, explicit consent) ------------
  // Agent proactively spots the missing flu vaccine and offers to add it to
  // the same visit. No pre-selected visual card, just the question and chips.
  {
    id: 'b5-a1',
    type: 'agent',
    text: `It's flu season, and you haven't had your shot yet. **I can add it to this same visit, same chair, no extra time.** Want me to include it?`,
    advanceAfter: 700,
  },
  {
    id: 'b5-input',
    type: 'input',
    chips: [
      { label: 'Yes, add the flu shot', primary: true },
      { label: 'Just the screening' },
    ],
  },

  // Thinking — adding the flu shot ------------------------------------------
  {
    id: 't-update',
    type: 'thinking',
    lines: [
      'Adding the flu shot to your visit…',
      'Updating your appointment…',
    ],
  },

  // Beat 6 — updated confirmation + prep guidance ---------------------------
  {
    id: 'b6-a1',
    type: 'agent',
    text: `Updated. Both are set for Wexford tomorrow at 8:00am.

A couple of prep notes:

• **No food or drink after midnight tonight.** Your profile checks fasting glucose and lipids, both are inaccurate after eating.
• **Bring a photo ID.** Required for the lab to release results to you.

I'll text you a reminder tonight at 8pm.`,
    media: { kind: 'confirmation', variant: 'screeningWithFlu' },
    mediaPosition: 'above',
    advanceAfter: 800,
  },

  // Beat 7 — wrap-up (no team % social proof, no HR doc claim) --------------
  {
    id: 'b7-a1',
    type: 'agent',
    text: `You're all set. I'll have your results ready in your Quest profile within 48 hours of your visit.`,
    advanceAfter: 600,
  },
  {
    id: 'b7-input',
    type: 'input',
    chips: [
      { label: "I'm good, thanks", primary: true },
      { label: 'What should I expect at the visit?' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Post-results conversation — re-engages after results land
// ---------------------------------------------------------------------------
// The portal sidebar closes after CARE_NAV_SCRIPT_PRE finishes and a "Results
// are in" banner appears on the home. When Mari taps Ask AI, the sidebar
// reopens with this script.
export const CARE_NAV_SCRIPT_POST = [
  {
    id: 'p1-a1',
    type: 'agent',
    text: `Welcome back, Mari. Your results came back. Most numbers look good. **Your cholesterol is borderline at 215**, which is a useful early signal.

Your employer covers a nutrition coaching program through Pack Health at zero cost. Most members see meaningful improvement in 8 to 12 weeks. Want me to enroll you?`,
    advanceAfter: 600,
  },
  {
    id: 'p1-input',
    type: 'input',
    chips: [
      { label: 'Yes, enroll me', primary: true },
      { label: 'Tell me more first' },
    ],
  },
  {
    id: 'p1-close',
    type: 'agent',
    text: `Great. I've sent your enrollment details to your inbox. Take care, Mari. Talk soon.`,
    advanceAfter: 1000,
  },
]

// ---------------------------------------------------------------------------
// Reschedule conversation — Mari changes her mind after booking
// ---------------------------------------------------------------------------
// Plays between PRE and POST. The portal's hero search auto-types "Cancel my
// appointment" after the PRE sidebar closes; that typed phrase is replayed as
// the opening 'user' turn in this script, then the agent saves the booking by
// suggesting a same-location reschedule.
export const CARE_NAV_SCRIPT_RESCHEDULE = [
  {
    id: 'r-u1',
    type: 'user',
    text: 'Cancel my appointment',
  },
  {
    id: 'r-a1',
    type: 'agent',
    text: `Got it, you'd like to cancel your appointment for tomorrow at 8:00am at Quest PSC Wexford. Mind sharing why? It helps me find better options.`,
    advanceAfter: 600,
  },
  {
    id: 'r-input1',
    type: 'input',
    chips: [
      { label: "The time doesn't work", primary: true },
      { label: 'Found a better option' },
      { label: 'I changed my mind' },
      { label: 'Other reason' },
    ],
  },
  {
    id: 'r-t1',
    type: 'thinking',
    lines: [
      'Looking for alternative times…',
      'Checking same-location availability…',
    ],
  },
  {
    id: 'r-a2',
    type: 'agent',
    text: `I have an opening at the **same location, Wexford, on Thursday at 7:30am**. Want me to reschedule instead of canceling?`,
    advanceAfter: 600,
  },
  {
    id: 'r-input2',
    type: 'input',
    chips: [
      { label: 'Yes, reschedule', primary: true },
      { label: 'Just cancel' },
    ],
  },
  {
    id: 'r-t2',
    type: 'thinking',
    lines: [
      'Rescheduling your appointment…',
      'Updating your calendar…',
      'Sending the new confirmation…',
    ],
  },
  {
    id: 'r-a3',
    type: 'agent',
    text: `Done. You're now set for Wexford on Thursday at 7:30am. Same prep notes apply.`,
    media: { kind: 'confirmation', variant: 'rescheduled' },
    mediaPosition: 'above',
    advanceAfter: 800,
  },
  {
    id: 'r-input3',
    type: 'input',
    chips: [{ label: 'Thanks', primary: true }],
  },
]

// Backwards-compatible alias so any direct importers keep working. Prefer the
// PRE / POST exports going forward.
export const CARE_NAV_SCRIPT = CARE_NAV_SCRIPT_PRE

// ---------------------------------------------------------------------------
// Static data referenced by media cards.
// ---------------------------------------------------------------------------

export const LOCATIONS_ALL = [
  {
    id: 'wexford',
    name: 'Quest PSC — Wexford',
    address: '12000 Perry Hwy, Wexford',
    distance: '0.8 mi from work',
    nextAvailable: 'Tomorrow, 8:00am',
    parking: 'Surface lot, free',
    fingerStick: true,
    highlighted: true,
    pin: { x: 30, y: 36 },
  },
  {
    id: 'cranberry',
    name: 'Quest PSC — Cranberry',
    address: '20510 Route 19, Cranberry Twp',
    distance: '2.3 mi from work',
    nextAvailable: 'Tomorrow, 9:30am',
    parking: 'Garage, validated',
    fingerStick: true,
    pin: { x: 58, y: 60 },
  },
  {
    id: 'mccandless',
    name: 'Quest PSC — McCandless',
    address: '9000 McKnight Rd, McCandless',
    distance: '4.1 mi from work',
    nextAvailable: 'Tomorrow, 10:15am',
    parking: 'Surface lot, free',
    fingerStick: false,
    pin: { x: 80, y: 30 },
  },
]

export const SCREENING_BOOKING = {
  title: 'Booked',
  doctor: 'Biometric Screening',
  practice: 'Quest PSC — Wexford',
  when: 'Tomorrow, 8:00am',
  cost: 'HSA-eligible',
  inviteEmail: 'mari@company.com',
  extras: [
    'Bring a photo ID',
  ],
}

export const SCREENING_WITH_FLU_BOOKING = {
  title: 'Booked',
  doctor: 'Biometric Screening + flu shot',
  practice: 'Quest PSC — Wexford',
  when: 'Tomorrow, 8:00am',
  cost: 'HSA-eligible',
  inviteEmail: 'mari@company.com',
  extras: [
    'No food or drink after midnight',
    'Bring a photo ID',
  ],
}

export const RESCHEDULED_BOOKING = {
  title: 'Rescheduled',
  doctor: 'Biometric Screening + flu shot',
  practice: 'Quest PSC — Wexford',
  when: 'Thursday at 7:30am',
  cost: 'HSA-eligible',
  inviteEmail: 'mari@company.com',
  extras: [
    'No food or drink after midnight Wednesday',
    'Bring a photo ID',
  ],
}
