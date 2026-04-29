import { useState, useCallback } from 'react'
import { STAGES } from '../data/stages.js'
import HomeScreen from './HomeScreen.jsx'
import SpreadsheetScreen from './SpreadsheetScreen.jsx'
import MessagesScreen from './MessagesScreen.jsx'
import NearTermRunner from './NearTermRunner.jsx'

// Map step types to screen components. Add new types here as the flow grows.
function renderStep(step, { advance, stageKey }) {
  switch (step.type) {
    case 'spreadsheet':
      return <SpreadsheetScreen onAdvance={advance} />
    case 'messages':
      return <MessagesScreen onAdvance={advance} />
    case 'home':
      return <HomeScreen stageKey={stageKey} onAdvance={advance} />
    case 'nearTerm':
      return <NearTermRunner startPage={step.startPage} />
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
      {/* No cross-fade between steps — each screen handles its own entrance.
          The spreadsheet stays under the iMessage window without flashing. */}
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
