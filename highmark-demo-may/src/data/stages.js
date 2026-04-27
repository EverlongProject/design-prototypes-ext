// Each stage is a sequential flow. Each step has a `type` that maps to a
// screen component in App.jsx. Add new step types as the demo grows.
//
// For this first iteration, every stage opens on the MyHighmark home screen.
// Build out additional steps (hero chat, benefits card, care nav map, etc.)
// as we add screens in Claude Code.

export const STAGES = {
  vision: {
    key: 'vision',
    label: 'AI Vision Demo',
    blurb: "Sarah's morning. Orchestrated AI front door. All four agent teams working together.",
    badge: 'Vision',
    steps: [
      { id: 'vision-spreadsheet', type: 'spreadsheet' },
      { id: 'vision-messages', type: 'messages' },
      { id: 'vision-home', type: 'home' }
      // TODO: add subsequent beats (global AI chat, benefits, health coach, care nav, recovery plan, care gap close)
    ]
  },
  benefits: {
    key: 'benefits',
    label: 'AI Benefits Agent Integration',
    blurb: 'Capability-specific sidebar. Member lands on the Benefits page and asks Highmark AI a coverage question in context.',
    badge: 'Phase 1',
    steps: [
      { id: 'benefits-home', type: 'home' }
      // TODO: add Benefits page + sidebar AI interaction
    ]
  },
  healthCoach: {
    key: 'healthCoach',
    label: 'AI Health Coach Integration',
    blurb: 'Capability-specific sidebar. Member engages the Health Coach from a Journey screen with Sword / Noom / Spring recommendations in context.',
    badge: 'Phase 1',
    steps: [
      { id: 'health-coach-home', type: 'home' }
      // TODO: add Journey page + Health Coach sidebar interaction
    ]
  }
}

export const STAGE_ORDER = ['vision', 'benefits', 'healthCoach']
