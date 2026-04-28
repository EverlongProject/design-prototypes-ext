import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

// Beat 13 — full-screen tally that fades in once the AI conversation closes.
// Static, narrated by the demo operator. The Menu button (FlowRunner) is
// still available bottom-left to return to the stage menu.

const ACCOMPLISHMENTS = [
  'Booked PT with a Tier 1 AHN provider for Saturday',
  'Booked her colonoscopy at AHN Wexford for June 13',
  'Closed two HEDIS gaps',
  'Returned to her workday',
]

const STEP = 0.35

export default function TallyScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-highmark-primary-deepest via-highmark-primary to-[#5BC8E8] p-12"
    >
      <div className="max-w-2xl w-full text-white">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="font-heading text-[40px] leading-tight font-semibold mb-8"
        >
          In a few minutes, Jessica:
        </motion.h1>

        <ul className="space-y-3 mb-10">
          {ACCOMPLISHMENTS.map((line, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * STEP, duration: 0.4 }}
              className="flex items-start gap-3 text-[18px] leading-snug"
            >
              <span className="mt-1 w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" strokeWidth={3} />
              </span>
              <span>{line}</span>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + ACCOMPLISHMENTS.length * STEP + 0.3, duration: 0.5 }}
          className="font-heading text-[26px] leading-tight font-semibold mb-5"
        >
          Zero phone calls. Zero portal logins. Zero call center deflections. Zero forms.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 + ACCOMPLISHMENTS.length * STEP + 0.9, duration: 0.5 }}
          className="text-[16px] opacity-85 leading-relaxed"
        >
          The AI led with what it texted about, listened when Jessica had a different priority, adapted, then circled back to close the original loop.
        </motion.p>
      </div>
    </motion.div>
  )
}
