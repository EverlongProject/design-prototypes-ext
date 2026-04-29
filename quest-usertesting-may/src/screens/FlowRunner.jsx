// PORT FROM: ../../highmark-demo-may/src/screens/FlowRunner.jsx
// CHANGES:
//   - Step types are now `laptop`, `messages`, `portal` (Quest equivalents).
//   - Swap `highmark-*` color classes for `quest-*`.
import { useState, useCallback } from 'react'
import { STAGES } from '../data/stages.js'
import LaptopScreen from './LaptopScreen.jsx'
import MessagesScreen from './MessagesScreen.jsx'
import PortalScreen from './PortalScreen.jsx'

function renderStep(step, { advance, stageKey }) {
  switch (step.type) {
    case 'laptop':
      return <LaptopScreen onAdvance={advance} />
    case 'messages':
      return <MessagesScreen onAdvance={advance} />
    case 'portal':
      return <PortalScreen stageKey={stageKey} onAdvance={advance} />
    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface-secondary text-ink">
          <div className="text-center">
            <p className="font-heading text-heading-3 mb-2">Step not implemented</p>
            <p className="font-sans text-body-2 text-ink-subdued">type: {step.type}</p>
          </div>
        </div>
      )
  }
}

export default function FlowRunner({ stageKey, onExit }) {
  const stage = STAGES[stageKey]
  const [stepIndex, setStepIndex] = useState(0)
  const step = stage.steps[stepIndex]
  const atEnd = stepIndex >= stage.steps.length - 1

  const advance = useCallback(() => {
    if (atEnd) onExit()
    else setStepIndex((i) => i + 1)
  }, [atEnd, onExit])

  return (
    <div className="relative min-h-screen bg-surface-primary">
      {renderStep(step, { advance, stageKey })}

      <button
        onClick={onExit}
        className="fixed bottom-4 left-4 z-50 bg-ink/80 text-white text-caption font-sans font-semibold rounded-full px-3 py-1.5 backdrop-blur-sm hover:bg-ink transition-colors"
      >
        Menu
      </button>
    </div>
  )
}
