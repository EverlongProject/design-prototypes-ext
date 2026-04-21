import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function BottomSheet({ open, onClose, children, title }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            className="absolute inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl max-h-[80%] flex flex-col"
          >
            <div className="flex justify-end px-3 pt-3">
              <button onClick={onClose} className="p-1 text-ink-soft">
                <X size={22} />
              </button>
            </div>
            {title && (
              <div className="px-5 pt-1 text-ink font-bold text-[20px]">{title}</div>
            )}
            <div className="flex-1 overflow-y-auto px-5 pt-1 pb-8" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
