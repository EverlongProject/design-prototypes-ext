import { motion } from 'framer-motion'

export default function MemberTimeline({ heading, entries = [] }) {
  return (
    <div className="my-2">
      {heading && (
        <div className="text-center text-ink-soft text-[13px] font-semibold mb-3">
          {heading}
        </div>
      )}
      <div className="flex flex-col items-center">
        {entries.map((e, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.7 }}
              className="text-center py-1"
            >
              <div className="text-ink font-bold text-[15px] leading-tight">{e.title}</div>
              <div className="text-ink-soft text-[13px] mt-0.5">{e.date}</div>
            </motion.div>
            {i < entries.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: i * 0.7 + 0.4 }}
                className="w-px h-5 bg-gray-300 my-1 origin-top"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
