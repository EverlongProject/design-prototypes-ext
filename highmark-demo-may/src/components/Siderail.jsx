import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'

// Page-scoped AI side rail used by P2 (Benefits) and P3 (Journey). Slides
// in from the right, ~320px wide. Page-scoped means this is recreated
// fresh on every nav change — no orchestration across pages, by design.
export default function Siderail({ open, title, onClose, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          className="fixed top-[61px] right-0 bottom-0 w-[500px] z-30 bg-white border-l border-border shadow-[0_0_24px_rgba(0,34,60,0.08)] flex flex-col"
        >
          <div className="px-5 pt-4 pb-3 flex items-center gap-2">
            <h3 className="flex-1 font-heading text-heading-3 font-semibold text-ink leading-tight">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-7 h-7 rounded-full flex items-center justify-center text-ink-subdued hover:bg-surface-secondary shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-5 pb-3 flex items-center gap-1.5 text-highmark-primary font-sans text-caption font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Powered by AI</span>
          </div>

          {/* Children own padding/scroll. ChatRunner uses its own scroll
              container; static placeholder content should wrap itself in a
              padded scroll wrapper. */}
          <div className="flex-1 flex flex-col min-h-0">
            {children}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
