// PORT FROM: ../../highmark-demo-may/src/screens/SpreadsheetScreen.jsx
// PURPOSE: Establishes that Mari is mid-workday at her desk when Quest texts
// her. Same pattern as Highmark's spreadsheet screen but with a different
// background asset (TBD — could be a calendar, an email, or a meeting view;
// pick whichever feels most natural for a working caretaker).
//
// CHANGES:
//   - Swap background asset (place into /public/assets/ as `Workspace.png` or
//     similar — see SPEC.md asset list).
//   - Notification copy: "You're due for your annual wellness screening.
//     Most members are in and out in under 15 minutes."
//   - Notification logo: replace `iMessage-logo.png` with a Quest mark.
//
// Currently a stub that auto-advances on click. Implement fully when porting.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

export default function LaptopScreen({ onAdvance }) {
  const [notificationShown, setNotificationShown] = useState(false)

  return (
    <div
      className="relative min-h-screen bg-neutral-medium overflow-hidden cursor-pointer"
      onClick={() => !notificationShown && setNotificationShown(true)}
    >
      {/* TODO(claude-code): drop in the workspace background image once exported.
          Until then, render a neutral placeholder so the screen flow runs. */}
      <div className="w-full h-screen flex items-center justify-center text-ink-subdued">
        <span className="font-sans text-caption">Workspace background placeholder — click anywhere to trigger SMS</span>
      </div>

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
            <div className="w-10 h-10 rounded-lg shrink-0 bg-quest-primary-pastel flex items-center justify-center">
              {/* TODO(claude-code): replace with Quest iMessage-style logo asset. */}
              <span className="text-quest-primary font-heading text-[10px] font-bold">QUEST</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-semibold text-[13px] text-black truncate">Quest</span>
                <span className="text-[11px] text-black/50 shrink-0">now</span>
              </div>
              <p className="text-[13px] text-black/85 leading-snug mt-0.5">
                Your annual Basic Health Profile is due. 3 weeks left in your screening window. HSA-eligible.
              </p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
