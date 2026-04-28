import { motion } from 'framer-motion'

function Sparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="qSparkGrad" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00854B" />
          <stop offset="100%" stopColor="#34F870" />
        </linearGradient>
      </defs>
      <path
        d="M8 1.5l1.6 4.1 4.1 1.6-4.1 1.6L8 12.9 6.4 8.8 2.3 7.2l4.1-1.6L8 1.5z"
        fill="url(#qSparkGrad)"
      />
    </svg>
  )
}

export default function StatusLine({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex items-start gap-2 py-1.5"
    >
      <div className="pt-[3px] shrink-0">
        <Sparkle />
      </div>
      <div className="text-[14px] leading-snug text-ink-subdued font-sans">{children}</div>
    </motion.div>
  )
}
