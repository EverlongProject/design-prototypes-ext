// Linear conversation script for Prototype 3: Health Coach Integration.
// Drives the Journey-page side rail via ChatRunner.
//
// Same turn shapes as visionScript.js, plus a new turn type:
//   - { type: 'resourceOptions', options: [{ id, name, subtitle, description, costChip, icon, gotoId? }] }
//       Stack of fully-clickable cards. Selecting a card commits a UserMessage
//       (the card name) and advances to gotoId (or +1 if absent).
//
// Branching: chips and resourceOptions options can specify `gotoId` to jump
// to a turn id. The "I'm good, thanks" path uses this to skip past the
// Manage Stress B-flow and land on the closing turn.

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

export const HEALTH_COACH_SCRIPT = [
  // ----- Beat 3 — agent acknowledges + chips ---------------------------------
  {
    id: 'b3-thinking',
    type: 'thinking',
    lines: [
      'Pulling your Health Story…',
      'Looking at stress-related programs and benefits…',
    ],
  },
  {
    id: 'b3-a1',
    type: 'agent',
    text: `Sorry to hear you've been dealing with stress, Jessica. It shows up differently for everyone, sometimes as bad sleep, sometimes as feeling stretched thin, sometimes both. I can pull together what's covered on your plan and what we have in your Health Journey to help. Want me to start there, or tell me more about what's been going on first?`,
    advanceAfter: 400,
  },
  {
    id: 'b3-input',
    type: 'input',
    chips: [{ label: "Show me what's available", primary: true }],
  },

  // ----- Beat 4 — two clickable resource cards ------------------------------
  {
    id: 'b4-thinking',
    type: 'thinking',
    lines: ['Matching to programs and partner solutions…'],
  },
  {
    id: 'b4-a1',
    type: 'agent',
    text: `Here are two options on your plan that could help. Tap one to learn more.`,
    advanceAfter: 400,
  },
  {
    id: 'b4-options',
    type: 'resourceOptions',
    options: [
      {
        id: 'spring',
        name: 'Spring Health',
        subtitle: 'Living Health solution',
        description: 'Therapy, coaching, and meditation, all in one app',
        costChip: '$0 with your plan',
        icon: ASSET('Wellness-Virtual-Coaching.svg'),
        // Default advance — Spring Health detail comes next sequentially.
      },
      {
        id: 'manage-stress',
        name: 'Manage Stress',
        subtitle: 'Health Journey goal',
        description: 'A guided goal track in your Health Journey with daily exercises and reflections',
        costChip: 'Free, opt-in',
        icon: ASSET('mental-wellbeing.svg'),
        gotoId: 'mh-thinking',
      },
    ],
  },

  // ----- Beat 5 — Spring Health detail card + SSO handoff -------------------
  {
    id: 'b5-thinking',
    type: 'thinking',
    lines: ['Pulling Spring Health details…'],
  },
  {
    id: 'b5-card',
    type: 'agent',
    text: `Spring Health is one of your Living Health benefits. You can sign in through Highmark with SSO, no separate account needed. Tap Get started and we'll open it in a new tab. You can also find Spring Health on your Benefits page anytime, under Additional Benefits.`,
    media: { kind: 'springHealth' },
    mediaPosition: 'above',
    gateOnMedia: true,
  },
  {
    id: 'b5-a2',
    type: 'agent',
    text: `Opened in a new tab. While you're still here, anything else feeling off lately? I can walk you through Manage Stress in your Health Journey, or help with another goal.`,
    advanceAfter: 400,
  },
  {
    id: 'b5-input',
    type: 'input',
    chips: [
      // Default advance (no gotoId) flows into the Manage Stress B-flow below.
      { label: 'Show me Manage Stress', primary: true },
      { label: "I'm good, thanks", gotoId: 'close' },
    ],
  },

  // ----- B-flow — Manage Stress goal ----------------------------------------
  {
    id: 'mh-thinking',
    type: 'thinking',
    lines: ['Pulling up the Manage Stress journey…'],
  },
  {
    id: 'mh-card',
    type: 'agent',
    text: `Manage Stress is a 4-week guided goal track in your Health Journey. Daily 10-minute exercises, weekly reflections, free with your plan.`,
    media: { kind: 'manageStress' },
    mediaPosition: 'above',
    gateOnMedia: true,
  },
  {
    id: 'mh-confirm-thinking',
    type: 'thinking',
    lines: [
      'Checking your Health Journey…',
      'Adding goal…',
      'Updating actions…',
    ],
  },
  {
    id: 'mh-confirm',
    type: 'agent',
    text: `All set, it's been added to your Health Journey. You can find it on the Journey page anytime.`,
    advanceAfter: 600,
  },

  // ----- Closing turn -------------------------------------------------------
  {
    id: 'close',
    type: 'agent',
    text: `Do you want to complete your first action?`,
    advanceAfter: 1000,
  },
]
