// Stage 2 flow data — copy and flow mirror the Figma source of truth.

const pastaAsset = `${import.meta.env.BASE_URL}assets/pasta-meal.png`

export const stage2Flow = [
  {
    id: '2.0',
    type: 'title',
    label: 'Jenn, age 43',
    payload: {
      stageLabel: 'Stage 2',
      description:
        'A few years in, Jenn is juggling work, family, and her own health. A routine screening surfaces a new goal worth tracking.',
      outerTap: true
    }
  },
  {
    id: '2.1',
    type: 'iosHome',
    label: 'iOS springboard'
  },
  {
    id: '2.2',
    type: 'home',
    label: 'Manulife home (schedule sheet)',
    payload: { variant: 'schedule' }
  },
  {
    id: '2.3',
    type: 'chatFlow',
    label: 'Scheduling with Manny',
    payload: {
      script: [
        {
          kind: 'stream',
          text:
            "Good call Jenn! You're at the age where getting a full picture of your health pays off. Manulife is offering a free NiaHealth biomarker screening — it's an at-home blood draw, zero friction. Here are some times that may work for you."
        },
        {
          kind: 'chips',
          items: [
            { label: 'Tomorrow 2:00 PM' },
            { label: 'Tomorrow 9:00 AM' },
            { label: 'Friday 10:00 AM', primary: true },
            { label: 'Another time' }
          ]
        },
        { kind: 'userBubble', text: 'Friday 10:00 AM' },
        { kind: 'stream', text: 'And just to confirm with you, your address is still 123 Hobert Av, Toronto?' },
        {
          kind: 'chips',
          items: [{ label: 'Yes', primary: true }, { label: 'Use different address' }]
        },
        { kind: 'userBubble', text: 'Yes' },
        {
          kind: 'thinking',
          totalMs: 4000,
          lines: ['Booking your appointment...']
        },
        {
          kind: 'appointmentCard',
          data: { time: 'Friday, 10:00 AM', location: '123 Hobert Av' }
        },
        { kind: 'done' }
      ]
    }
  },
  {
    id: '2.4',
    type: 'iosMessages',
    label: 'iOS Messages — results notification'
  },
  {
    id: '2.5',
    type: 'home',
    label: 'Manulife home (NiaHealth results)',
    payload: { variant: 'niaHealth' }
  },
  {
    id: '2.6',
    type: 'chatFlow',
    label: 'Results review with Manny',
    payload: {
      script: [
        { kind: 'stream', text: 'Your NiaHealth results are in, Jenn.' },
        {
          kind: 'stream',
          text:
            "Overall, there's a lot to feel good about. Your score is B, and your NiaAge is 40.3 — 3 years younger than your calendar age. Your blood sugar and blood pressure both look great."
        },
        {
          kind: 'stream',
          text:
            'One thing worth paying attention to is your cholesterol, which is trending in a direction we should address.'
        },
        { kind: 'stream', text: 'What should we look into further?' },
        {
          kind: 'chips',
          items: [
            { label: 'Cholesterol', primary: true },
            { label: 'Blood sugar' },
            { label: 'Blood pressure' },
            { label: 'Another topic' }
          ]
        },
        { kind: 'userBubble', text: 'Cholesterol' },
        {
          kind: 'stream',
          text:
            'Your total cholesterol has ticked up over the past 18 months, with LDL slightly above healthy range. Not alarming, but manageable if we act now.'
        },
        { kind: 'cholesterolResults' },
        {
          kind: 'stream',
          text:
            "Based on your results, here are two ways to take action. Near-term: add a 'Manage cholesterol' goal. Long-term peace of mind: have a consultation with a nutritionist."
        },
        {
          kind: 'actionCards',
          primaryIndex: 0,
          items: [
            {
              title: 'Manage Cholesterol',
              subtitle: 'Health Goal',
              ctaLabel: 'Add goal to Journey',
              image: `${import.meta.env.BASE_URL}assets/ManageCholesterol.png`
            },
            {
              title: 'Talk to a nutritionist',
              subtitle: 'Virtual Care',
              ctaLabel: 'Start a consultation',
              image: `${import.meta.env.BASE_URL}assets/Nutritionist.png`
            }
          ]
        },
        {
          kind: 'thinking',
          totalMs: 5000,
          lines: [
            "Adding 'Manage Cholesterol' goal to your Journey...",
            'Updating your actions...'
          ]
        },
        { kind: 'goalAddedTag' },
        {
          kind: 'stream',
          text: "Great, you've added a new goal to your journey! Let's check it out in the Journey experience."
        },
        {
          kind: 'chips',
          items: [{ label: 'View Goal', primary: true }]
        },
        { kind: 'done' }
      ]
    }
  },
  {
    id: '2.7',
    type: 'goalDetail',
    label: 'Goal detail (initial)',
    payload: { state: 'initial' }
  },
  {
    id: '2.8',
    type: 'iosLockscreen',
    label: 'iOS lock screen'
  },
  {
    id: '2.9',
    type: 'chatFlow',
    label: 'Meal logging with Manny',
    payload: {
      script: [
        { kind: 'stream', text: "Let's keep your cholesterol plan on track. One photo is all I need." },
        { kind: 'photoCaptureCard', asset: pastaAsset },
        { kind: 'photoMessage', asset: pastaAsset },
        {
          kind: 'thinking',
          totalMs: 5000,
          lines: ['Analyzing photo...', 'Identifying meal...', 'Completing activity...']
        },
        { kind: 'activityCompletedTag' },
        {
          kind: 'mealSummary',
          title: 'Pasta Alfredo with garlic bread',
          nutrition: '~820 cal  ·  1,800mg sodium  ·  42g saturated fat',
          tag: '4th pasta lunch this week'
        },
        {
          kind: 'stream',
          text:
            "The saturated fat is the thing to watch on this one. Alfredo plus garlic bread lands around 3x what you want in a day, and that's the nutrient most tied to your LDL moving up. Stack a few of these in a week and it shows up in your next reading."
        },
        { kind: 'stream', text: "You've been consistent overall. This is just the meal to swap, not the habit." },
        {
          kind: 'goalCard',
          title: 'View Manage Cholesterol goal',
          subtitle: 'Health Goal'
        },
        { kind: 'done' }
      ]
    }
  },
  {
    id: '2.10',
    type: 'goalDetail',
    label: 'Goal detail (updated)',
    payload: { state: 'updated' }
  },
  {
    id: '2.11',
    type: 'title',
    label: 'Stage 2 complete',
    payload: {
      stageLabel: 'Stage 2 Complete',
      description:
        'Scheduling, results, goal setting, and daily habit logging — all in one continuous conversation.',
      outerTap: true
    }
  }
]
