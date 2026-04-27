import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { STAGES } from '../data/stages.js'
import HomeScreen from './HomeScreen.jsx'
import SpreadsheetScreen from './SpreadsheetScreen.jsx'
import MessagesScreen from './MessagesScreen.jsx'

// Map step types to screen components. Add new types here as the flow grows.
function renderStep(step, { advance, stageKey }) {
  switch (step.type) {
    case 'spreadsheet':
      return <SpreadsheetScreen onAdvance={advance} />
    case 'messages':
      return <MessagesScreen onAdvance={advance} />
    case 'home':
      return <HomeScreen stageKey={stageKey} onAdvance={advance} />
    // TODO: add 'chat', 'benefits', 'careNav', 'recoveryPlan', 'careGapClose', etc.
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
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderStep(step, { advance, stageKey })}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={onExit}
        className="fixed bottom-4 left-4 z-50 bg-ink/80 text-white text-caption font-sans font-semibold rounded-full px-3 py-1.5 backdrop-blur-sm hover:bg-ink transition-colors"
      >
        Menu
      </button>
    </div>
  )
}
