import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { stage1Flow } from './data/stage1.js'
import TestGallery from './screens/TestGallery.jsx'
import TitleCard from './screens/TitleCard.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import ChatFlow from './screens/ChatFlow.jsx'

function renderStep(step) {
  switch (step.type) {
    case 'title':
      return <TitleCard label={step.label} description={step.payload?.description} />
    case 'home':
      return <HomeScreen />
    case 'chatFlow':
      return <ChatFlow script={step.payload?.script || []} />
    default:
      return null
  }
}

export default function App() {
  if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('test') === '1') {
    return <TestGallery />
  }

  const [stepIndex, setStepIndex] = useState(0)
  const step = stage1Flow[stepIndex]
  const atEnd = stepIndex >= stage1Flow.length - 1

  const advance = useCallback(() => {
    if (!atEnd) setStepIndex((i) => i + 1)
  }, [atEnd])

  // ChatFlow owns its own taps — don't intercept at the outer level.
  const outerTap = step.type === 'chatFlow' ? undefined : advance

  return (
    <div
      className="h-full w-full bg-bg-alt overflow-hidden relative"
      onClick={outerTap}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="h-full w-full"
        >
          {renderStep(step)}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
