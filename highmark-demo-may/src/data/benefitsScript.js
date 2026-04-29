// Linear conversation script for Prototype 2: Benefits Agent Integration.
// Drives the Benefits-page side rail via ChatRunner.
//
// Same shape as visionScript.js and healthCoachScript.js. Reuses the P1
// CoverageCard (service mode) for Beat 4 and the P1 SwordPreviewCard
// (with the "Sword Thrive" label + ctaHref) for Beat 6.
//
// Branching: chips can specify `gotoId` to jump to a turn id. The
// "I'm good, thanks" chips on Beats 5 and 6 use this to skip the
// deductible deep-dive B-flow and land on the closing turn.

const SWORD_THRIVE_LOGIN =
  'https://onboarding.ca.swordhealth.com/c/sword/pre-enrollment/body-areas?program_type=virtual_pt&hide_get_started=true&src=website&co_branded=true&type=wellness&_gl=1*vn3zwb*_gcl_au*MTQwMjgxMzE3OS4xNzcwMzMzOTg3*_ga*MTQ0MzQ0OTIwMC4xNzcwMzMzOTg3*_ga_HFVFXJTPQ1*czE3Nzc0ODMxNTkkbzQkZzEkdDE3Nzc0ODM0NTYkajYwJGwwJGgw'

export const BENEFITS_SCRIPT = [
  // ----- Beat 3 + Beat 4 — confirm coverage with snapshot card -------------
  {
    id: 'b3-thinking',
    type: 'thinking',
    lines: [
      'Pulling your plan documents…',
      'Checking PT coverage and your accumulators…',
    ],
  },
  {
    id: 'b3-a1',
    type: 'agent',
    text: `Yes, physical therapy is covered on your Community Blue HDHP 1 plan. Here's the snapshot:`,
    media: {
      kind: 'coverage',
      serviceLabel: 'PT Coverage',
      plan: 'Community Blue HDHP 1',
      coveredLabel: 'Covered, no referral needed',
      copay: '$25 per visit (after deductible)',
      visitLimit: 'Up to 30 visits per year',
      deductibleSpent: 1500,
      deductibleTotal: 3000,
    },
    advanceAfter: 1500,
  },

  // ----- Beat 5 — Sword Thrive surfaced as covered alternative --------------
  {
    id: 'b5-a1',
    type: 'agent',
    text: `Before you book a clinic, worth flagging something most members don't know: your plan also includes Sword Thrive at $0. It's virtual PT with a real physical therapist guiding you through exercises via your phone camera. For most MSK issues, it works as well as in-person and saves the copays. A typical PT course is 8 to 12 visits, around $200 to $300 in copays for in-person, or $0 with Sword. Want to take a look?`,
    advanceAfter: 400,
  },
  {
    id: 'b5-input',
    type: 'input',
    chips: [
      { label: 'Show me Sword Thrive', primary: true },
      { label: "I'd rather see someone in person", gotoId: 'close' },
    ],
  },

  // ----- Beat 6 — Sword Thrive detail + SSO handoff + follow-up ------------
  {
    id: 'b6-thinking',
    type: 'thinking',
    lines: ['Pulling Sword Thrive details…'],
  },
  {
    id: 'b6-card',
    type: 'agent',
    text: `Sword is one of your Living Health benefits. You can sign in through Highmark with SSO, no separate account needed. Tap Get started and we'll open it in a new tab. You can also find Sword Thrive on this Benefits page anytime, under Additional Benefits.`,
    media: {
      kind: 'sword',
      label: 'Sword Thrive',
      ctaHref: SWORD_THRIVE_LOGIN,
    },
    mediaPosition: 'above',
    gateOnMedia: true,
  },
  {
    id: 'b6-a2',
    type: 'agent',
    text: `Opened in a new tab. Anything else you want me to check while you're here? I can run through your accumulators or look up another benefit.`,
    advanceAfter: 400,
  },
  {
    id: 'b6-input',
    type: 'input',
    chips: [
      // Default advance flows into the deductible B-flow.
      { label: "What's my deductible status?", primary: true },
      { label: "I'm good, thanks", gotoId: 'close' },
    ],
  },

  // ----- B-flow — deductible deep dive --------------------------------------
  {
    id: 'ded-thinking',
    type: 'thinking',
    lines: ['Pulling your accumulators…'],
  },
  {
    id: 'ded-a1',
    type: 'agent',
    text: `You're halfway to your individual deductible. After you hit it, your share drops from full cost to your standard copay on most services. Care this year for Liam, Noah, or yourself counts toward the family deductible too.`,
    media: {
      kind: 'coverage',
      serviceLabel: 'Deductible',
      plan: 'Community Blue HDHP 1',
      coveredLabel: 'In-network individual',
      deductibleSpent: 1500,
      deductibleTotal: 3000,
    },
    mediaPosition: 'above',
    advanceAfter: 600,
  },
  {
    id: 'ded-a2',
    type: 'agent',
    text: `Want me to look at anything else?`,
    advanceAfter: 400,
  },
  {
    id: 'ded-input',
    type: 'input',
    chips: [{ label: "I'm good, thanks", primary: true }],
  },

  // ----- Closing turn -------------------------------------------------------
  {
    id: 'close',
    type: 'agent',
    text: `Take care, Jessica.`,
    advanceAfter: 1000,
  },
]
