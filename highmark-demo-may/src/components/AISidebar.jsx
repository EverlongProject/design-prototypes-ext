import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Minus } from 'lucide-react'
import AIConversation from './AIConversation.jsx'

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

export default function AISidebar({ open, onClose }) {
  const [minimized, setMinimized] = useState(false)

  if (!open) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{
          opacity: minimized ? 0 : 1,
          x: minimized ? 40 : 0,
          scale: minimized ? 0.96 : 1,
        }}
        transition={{ type: 'spring', stiffness: 240, damping: 28 }}
        style={{ pointerEvents: minimized ? 'none' : 'auto' }}
        className="fixed top-6 right-6 bottom-6 w-[400px] z-40 bg-surface-card rounded-2xl shadow-[0_24px_60px_rgba(0,34,60,0.18)] border border-border flex flex-col overflow-hidden"
      >
        <SidebarHeader
          onMinimize={() => setMinimized(true)}
          onClose={onClose}
        />
        <AIConversation />
      </motion.div>

      <AnimatePresence>
        {minimized && (
          <motion.button
            key="pill"
            type="button"
            onClick={() => setMinimized(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="fixed bottom-6 right-6 z-40 h-14 pl-3 pr-5 rounded-full bg-highmark-primary text-white shadow-[0_12px_30px_rgba(0,102,177,0.4)] flex items-center gap-2.5 hover:bg-highmark-primary-dark transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <img src={ASSET('AI%20Icon.svg')} alt="" className="w-5 h-5 brightness-0 invert" />
            </span>
            <span className="font-heading text-button-2 font-semibold">Ask Mark</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

function SidebarHeader({ onMinimize, onClose }) {
  return (
    <div className="h-14 px-3 border-b border-border flex items-center gap-2 shrink-0">
      <button
        type="button"
        aria-label="Menu"
        className="w-9 h-9 rounded-full flex items-center justify-center text-ink-subdued hover:bg-surface-secondary"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span className="w-7 h-7 rounded-full bg-highmark-primary-pastel flex items-center justify-center shrink-0">
          <img src={ASSET('AI%20Icon.svg')} alt="" className="w-4 h-4" />
        </span>
        <div className="min-w-0">
          <p className="font-heading text-subtitle-2 text-ink leading-tight truncate">Ask Mark</p>
          <p className="font-sans text-caption text-ink-subdued leading-tight truncate">AI Assistant</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onMinimize}
        aria-label="Minimize"
        className="w-9 h-9 rounded-full flex items-center justify-center text-ink-subdued hover:bg-surface-secondary"
      >
        <Minus className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="w-9 h-9 rounded-full flex items-center justify-center text-ink-subdued hover:bg-surface-secondary"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
