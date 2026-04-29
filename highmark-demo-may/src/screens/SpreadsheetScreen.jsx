import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

export default function SpreadsheetScreen({ onAdvance }) {
  const [notificationShown, setNotificationShown] = useState(false)

  return (
    <div
      className="relative min-h-screen bg-black overflow-hidden cursor-pointer"
      onClick={() => !notificationShown && setNotificationShown(true)}
    >
      <img
        src={ASSET('Spreadsheet.png')}
        alt=""
        className="w-full h-auto block select-none pointer-events-none"
      />

      <AnimatePresence>
        {notificationShown && (
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onAdvance?.()
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed top-8 right-8 w-[360px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.18)] px-3.5 py-3 flex items-start gap-3 text-left hover:bg-white transition-colors"
          >
            <img
              src={ASSET('iMessage-logo.png')}
              alt=""
              className="w-10 h-10 rounded-lg shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-semibold text-[13px] text-black truncate">Highmark</span>
                <span className="text-[11px] text-black/50 shrink-0">now</span>
              </div>
              <p className="text-[13px] text-black/85 leading-snug mt-0.5">
                You are due for your colonoscopy. Let's book it in less than 2 minutes.
              </p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
