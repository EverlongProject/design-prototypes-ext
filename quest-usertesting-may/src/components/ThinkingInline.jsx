import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StatusLine from './StatusLine.jsx'

export default function ThinkingInline({ lines, perLine = 1200, onDone }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => {
      if (idx < lines.length - 1) setIdx(idx + 1)
      else onDone?.()
    }, perLine)
    return () => clearTimeout(t)
  }, [idx, lines.length, perLine, onDone])

  return (
    <div className="my-2 min-h-[28px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <StatusLine>{lines[idx]}</StatusLine>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
