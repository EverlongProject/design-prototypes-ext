import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { STAGES } from './data/stages.js'
import TestGallery from './screens/TestGallery.jsx'
import StageMenu from './screens/StageMenu.jsx'
import TitleCard from './screens/TitleCard.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import ChatFlow from './screens/ChatFlow.jsx'
import IOSHome from './screens/IOSHome.jsx'
import IOSMessages from './screens/IOSMessages.jsx'
import IOSMessagesThread from './screens/IOSMessagesThread.jsx'
import IOSLockscreen from './screens/IOSLockscreen.jsx'
import GoalDetail from './screens/GoalDetail.jsx'

function renderStep(step, { advance }) {
  switch (step.type) {
    case 'title':
      return <TitleCard label={step.label} description={step.payload?.description} stageLabel={step.payload?.stageLabel} />
    case 'home':
      return <HomeScreen variant={step.payload?.variant} onLearnMore={advance} />
    case 'chatFlow':
      return <ChatFlow script={step.payload?.script || []} onDone={advance} />
    case 'iosHome':
      return <IOSHome onOpenManulife={advance} />
    case 'iosMessages':
      return <IOSMessages onTapResults={advance} />
    case 'iosMessagesThread':
      return <IOSMessagesThread onTapLink={advance} />
    case 'iosLockscreen':
      return <IOSLockscreen onTapNotification={advance} />
    case 'goalDetail':
      return <GoalDetail state={step.payload?.state} />
    default:
      return null
  }
}

function FlowRunner({ stageKey, onExit }) {
  const stage = STAGES[stageKey]
  const [stepIndex, setStepIndex] = useState(0)
  const step = stage.steps[stepIndex]
  const atEnd = stepIndex >= stage.steps.length - 1

  const advance = useCallback(() => {
    if (atEnd) onExit()
    else setStepIndex((i) => i + 1)
  }, [atEnd, onExit])

  const outerTapDefault = step.type === 'title' || step.type === 'goalDetail' || (step.type === 'home' && !step.payload?.variant)
  const outerTap = (step.payload?.outerTap ?? outerTapDefault) ? advance : undefined

  return (
    <div className="h-full w-full bg-bg-alt overflow-hidden relative" onClick={outerTap}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="h-full w-full"
        >
          {renderStep(step, { advance })}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={(e) => { e.stopPropagation(); onExit() }}
        className="absolute top-2 right-2 z-50 bg-black/40 text-white text-[10px] font-semibold rounded-full px-2 py-1 backdrop-blur-sm"
        style={{ marginTop: 'env(safe-area-inset-top)' }}
      >
        Menu
      </button>
    </div>
  )
}

export default function App() {
  if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('test') === '1') {
    return <TestGallery />
  }

  const [activeStage, setActiveStage] = useState(null)

  if (!activeStage) {
    return <StageMenu onPick={setActiveStage} />
  }

  return <FlowRunner key={activeStage} stageKey={activeStage} onExit={() => setActiveStage(null)} />
}
