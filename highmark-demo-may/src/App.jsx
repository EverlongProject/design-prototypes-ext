import { useState } from 'react'
import StageMenu from './screens/StageMenu.jsx'
import FlowRunner from './screens/FlowRunner.jsx'

export default function App() {
  const [activeStage, setActiveStage] = useState(null)

  if (!activeStage) {
    return <StageMenu onPick={setActiveStage} />
  }

  return (
    <FlowRunner
      key={activeStage}
      stageKey={activeStage}
      onExit={() => setActiveStage(null)}
    />
  )
}
