// Single stage for Quest: the Care Navigation Agent flow starring Mari, the
// Tapped-Out Caretaker. Mirrors the Highmark `STAGES` shape so the FlowRunner
// pattern carries over without modification. Add additional stages later if
// the team chooses to demo more agent teams (e.g., Health Coach standalone).

export const STAGES = {
  careNav: {
    key: 'careNav',
    label: 'AI Care Navigation Demo',
    blurb: "Mari's afternoon. Quest reaches out about her annual screening, she books on-site, the Care Navigation Agent auto-bundles a flu shot, and the Health Coach hands off after results.",
    badge: 'Vision',
    steps: [
      { id: 'care-nav-laptop', type: 'laptop' },
      { id: 'care-nav-messages', type: 'messages' },
      { id: 'care-nav-portal', type: 'portal' }
    ]
  }
}

export const STAGE_ORDER = ['careNav']
