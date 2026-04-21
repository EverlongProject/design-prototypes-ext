// Stage 3 flow data — retirement coverage continuation.

export const stage3Flow = [
  {
    id: '3.1',
    type: 'title',
    label: 'Jenn, age 59',
    payload: {
      stageLabel: 'Stage 3',
      description:
        'Jenn is thinking about retirement in the next few years and starting to plan for what her health and coverage will look like once she stops working.',
      outerTap: true
    }
  },
  {
    id: '3.2',
    type: 'iosMessagesThread',
    label: 'iOS Messages — thread with Manny'
  },
  {
    id: '3.3',
    type: 'chatFlow',
    label: 'Retirement coverage review',
    payload: {
      script: [
        {
          kind: 'stream',
          text:
            "Hi Jenn! Big milestone coming up — retirement is just around the corner. I wanted to reach out to make sure your health coverage is ready for this next chapter."
        },
        { kind: 'stream', text: "Let's take a look at how you've used your coverage." },
        { kind: 'memberCard', name: 'Jenn Wright', memberSince: '2010' },
        {
          kind: 'coverageUsage',
          items: [
            { title: 'Paramedical Coverage', claimed: '$4,200', coverage: '$5,000', utilization: '84%' },
            { title: 'Dental Coverage', claimed: '$1,340', coverage: '$1,500', utilization: '89%' }
          ]
        },
        {
          kind: 'memberTimeline',
          heading: "Here's what 26 years with us looks like",
          entries: [
            { title: 'Joined Manulife Benefits', date: 'May 2010' },
            { title: 'Family Term added', date: 'May 2018' },
            { title: 'NiaHealth Screening: Cholesterol normalized', date: 'May 2026' }
          ]
        },
        {
          kind: 'stream',
          text: 'Now that you are approaching retirement, would you like to continue with your existing coverage?'
        },
        {
          kind: 'chips',
          items: [
            { label: 'Keep existing coverage', primary: true },
            { label: 'Learn more' }
          ]
        },
        { kind: 'userBubble', text: 'Keep existing coverage' },
        {
          kind: 'stream',
          text:
            "Great choice! And the best part is, you won't need to go through any new health assessments or eligibility checks to get there."
        },
        {
          kind: 'stream',
          text: "Based on your history with Manulife, here's what you're already approved for:"
        },
        { kind: 'approvedCoverage' },
        {
          kind: 'stream',
          text:
            "You can purchase this coverage now on your own, or I can connect you with an advisor who will walk you through the next steps."
        },
        {
          kind: 'stream',
          text: 'An advisor can join this chat right now, or schedule a call at a time that works better for you.'
        },
        { kind: 'stream', text: 'What would you prefer?' },
        {
          kind: 'chips',
          items: [
            { label: 'Schedule a call' },
            { label: 'Chat with advisor' },
            { label: 'Purchase now', primary: true }
          ]
        },
        { kind: 'userBubble', text: 'Purchase now' },
        {
          kind: 'thinking',
          totalMs: 3500,
          lines: ['Processing your purchase...', 'Activating your coverage...']
        },
        { kind: 'done' }
      ]
    }
  },
  {
    id: '3.4',
    type: 'home',
    label: 'Manulife home — welcome rewards',
    payload: { variant: 'rewards' }
  },
  {
    id: '3.5',
    type: 'title',
    label: 'Stage 3 complete',
    payload: {
      stageLabel: 'Stage 3 Complete',
      description: 'Coverage review, pre-approved continuation, and welcome rewards — a seamless retirement transition.',
      outerTap: true
    }
  }
]
