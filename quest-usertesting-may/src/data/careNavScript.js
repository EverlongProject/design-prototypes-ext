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

  // Beat 5b — vaccine eligibility intake ------------------------------------
  // After Mari agrees to add the flu shot, the agent runs the standard
  // pre-vaccination safety screen (4 questions). For the user-testing flow
  // we expect "No" to each, mirroring real-world eligibility for a healthy
  // adult; the chips lead with "No" as the primary affordance.
  {
    id: 'b5b-intro',
    type: 'agent',
    text: `Before I book the flu shot, a few quick safety questions to confirm eligibility.`,
    advanceAfter: 600,
  },
  {
    id: 'b5b-q1-a',
    type: 'agent',
    text: `Have you ever had an adverse reaction to a previous dose of Influenza (flu) or Pneumonia vaccine?`,
    advanceAfter: 400,
  },
  {
    id: 'b5b-q1-input',
    type: 'input',
    chips: [
      { label: 'No', primary: true },
      { label: 'Yes' },
    ],
  },
  {
    id: 'b5b-q2-a',
    type: 'agent',
    text: `Have you ever had an adverse reaction to a previous dose of any other vaccine? (Does not include tiredness, soreness, fever, or chills in response to an mRNA COVID-19 vaccine.)`,
    advanceAfter: 400,
  },
  {
    id: 'b5b-q2-input',
    type: 'input',
    chips: [
      { label: 'No', primary: true },
      { label: 'Yes' },
    ],
  },
  {
    id: 'b5b-q3-a',
    type: 'agent',
    text: `Have you ever had Guillain-Barre Syndrome (an illness with sudden muscle weakness)?`,
    advanceAfter: 400,
  },
  {
    id: 'b5b-q3-input',
    type: 'input',
    chips: [
      { label: 'No', primary: true },
      { label: 'Yes' },
    ],
  },
  {
    id: 'b5b-q4-a',
    type: 'agent',
    text: `Have you ever had an active, unstabilized neurological disorder?`,
    advanceAfter: 400,
  },
  {
    id: 'b5b-q4-input',
    type: 'input',
    chips: [
      { label: 'No', primary: true },
      { label: 'Yes' },
    ],
  },

  // Thinking — booking the service ------------------------------------------
  {
    id: 't-booking-service',
    type: 'thinking',
    lines: [
      'Booking service…',
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

  // User-testing variant ends here. The original demo continues with a
  // wrap-up turn ("You're all set…") and the post-results conversation, but
  // for testing we stop the moment the flu shot is confirmed so the
  // participant has no scripted next step.
]

// ---------------------------------------------------------------------------
// Post-results and reschedule conversations were trimmed for the user-testing
// variant. The session ends after the flu shot is confirmed (b6-a1 above)
// and the participant is left in an open-ended state, no scripted follow-up.
// See quest-demo-may for the full multi-conversation flow.
// ---------------------------------------------------------------------------

// Backwards-compatible alias so any direct importers keep working.
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

