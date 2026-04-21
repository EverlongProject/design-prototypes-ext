import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function InlineTag({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
      className="my-2 flex items-center gap-1.5 self-start bg-manulife-green-light text-manulife-green rounded-full pl-1 pr-2.5 py-1 w-fit"
    >
      <div className="w-4 h-4 rounded-full bg-manulife-green text-white flex items-center justify-center">
        <Check size={11} strokeWidth={3} />
      </div>
      <span className="text-xs font-semibold">{label}</span>
    </motion.div>
  )
}
