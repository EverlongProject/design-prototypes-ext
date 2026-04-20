// Stage 1 flow data — canonical source of truth for every step and every string.
// Edit copy here, not in component files.

const coverage = {
  current: { label: 'Current', policy: 'Optional life insurance', amount: '$100K' },
  recommended: {
    label: 'Recommended',
    policy: 'Optional + Family Term',
    amount: '$350K',
    bullets: ['Includes access to Maven Clinic and KixCare']
  }
}

export const stage1Flow = [
  {
    id: '1.1',
    type: 'title',
    label: 'Jenn, age 32',
    payload: {
      description:
        'Starting a family, new mortgage, thinking about what comes next. Jenn is the kind of member we want to grow with.'
    }
  },
  {
    id: '1.2',
    type: 'home',
    label: 'Unified home'
  },
  {
    id: '1.3',
    type: 'chatFlow',
    label: 'Chat with Manny',
    payload: {
      script: [
        { kind: 'stream', text: 'Hi Jenn! It looks like your family might be growing — congratulations!' },
        { kind: 'stream', text: 'I wanted to share something that might be helpful. Now is a great time to review your life insurance coverage and make sure your family is protected as things change.' },
        { kind: 'stream', text: 'Want me to walk you through your options?' },
        {
          kind: 'chips',
          items: [
            { label: 'Yes, tell me more', primary: true },
            { label: 'Maybe later' }
          ]
        },
        { kind: 'userBubble', text: 'Yes, tell me more' },
        { kind: 'stream', text: 'Right now you have Optional Life Insurance through your group benefits.' },
        { kind: 'stream', text: "One option worth considering is a Family Term policy — it's designed for growing families and can provide up to $250K in additional coverage." },
        { kind: 'stream', text: 'It also comes with access to Maven Clinic for prenatal and mental health care and KixCare for 24/7 pediatric support.' },
        { kind: 'stream', text: 'Does any of that sound relevant to you?' },
        { kind: 'coverage', data: coverage },
        {
          kind: 'chips',
          items: [{ label: "I'm ready to purchase →", primary: true }]
        },
        { kind: 'userBubble', text: "I'm ready to purchase" },
        {
          kind: 'thinking',
          totalMs: 10000,
          lines: [
            'Reviewing current coverage and household profile…',
            'Confirming eligibility…',
            'Pre-approving 20-year Family Term, $350,000…',
            'Generating your policy…'
          ]
        },
        {
          kind: 'resolve',
          heading: 'Your new policy has been approved!',
          subheading:
            '$350K Family Term policy is ready to activate.\nDo you want to proceed? If you have any questions, feel free to just ask.',
          cta: 'Activate new policy →'
        },
        {
          kind: 'thinking',
          totalMs: 6000,
          lines: ['Activating your policy…']
        },
        { kind: 'policyTag' },
        {
          kind: 'confirmation',
          heading: "You're covered, Jenn! 🎉",
          subheading: "Your Family Term policy is active.\nHere's what you've unlocked.",
          tiles: [
            { key: 'kixcare', title: 'KixCare', subtitle: '24/7 pediatric virtual care', asset: '/assets/kixcare-thumb.png' },
            { key: 'maven', title: 'Maven Clinic', subtitle: '3 bonus prenatal visits', asset: '/assets/maven-thumb.png' },
            { key: 'aeroplan', title: 'Aeroplan Points', subtitle: '2,500 welcome bonus', asset: '/assets/aeroplan-thumb.png' }
          ],
          primary: 'View Coverage Details →'
        }
      ]
    }
  }
]
