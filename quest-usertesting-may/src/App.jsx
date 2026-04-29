import { useState } from 'react'
import FlowRunner from './screens/FlowRunner.jsx'

// User-testing variant: skip the StageMenu and laptop/SMS intro. The session
// starts directly at the Quest portal with the AI sidebar opening on its
// own, so test participants see the conversational agent the moment they
// land on the prototype.
export default function App() {
  const [resetKey, setResetKey] = useState(0)
  return (
    <FlowRunner
      key={resetKey}
      stageKey="careNav"
      onExit={() => setResetKey((k) => k + 1)}
    />
  )
}
