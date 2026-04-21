import { motion } from 'framer-motion'
import { X, PartyPopper } from 'lucide-react'

const CONFETTI = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: 5 + Math.random() * 90,
  color: ['#2E8A4C', '#F5A623', '#D94D75', '#8E1C3B', '#2D7BD1', '#A89BB3'][i % 6],
  rot: Math.random() * 360,
  rotEnd: Math.random() * 720,
  delay: Math.random() * 0.3,
  size: 6 + Math.random() * 6,
  dist: 160 + Math.random() * 140
}))

function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {CONFETTI.map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 80, x: 0, rotate: c.rot }}
          animate={{ opacity: [0, 1, 1, 0], y: -c.dist, rotate: c.rotEnd }}
          transition={{ duration: 1.6, delay: c.delay, ease: 'easeOut' }}
          className="absolute"
          style={{
            left: `${c.left}%`,
            top: '35%',
            width: c.size,
            height: c.size * 1.4,
            backgroundColor: c.color,
            borderRadius: 2
          }}
        />
      ))}
    </div>
  )
}

function RewardRow({ eyebrow, title, iconBg, iconContent }) {
  return (
    <div className="bg-white border border-stroke rounded-lg p-3 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="text-ink-soft text-[12px]">{eyebrow}</div>
        <div className="text-ink font-bold text-[22px] leading-tight mt-0.5">{title}</div>
      </div>
      <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${iconBg}`}>
        {iconContent}
      </div>
    </div>
  )
}

export default function RewardsSheet({ open, onViewDetails }) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: open ? 0 : '100%' }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl z-40 overflow-hidden"
      style={{ maxHeight: '78%' }}
    >
      {open && <Confetti />}
      <div className="relative px-5 pt-5 pb-6">
        <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <X size={16} className="text-ink" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <PartyPopper size={26} className="text-manulife-green" strokeWidth={2} />
          </div>
          <div className="text-ink font-bold text-[22px] leading-tight">You're covered, Jenn</div>
          <div className="text-ink-soft text-[14px] leading-snug mt-1 px-2">
            Your individual coverage is active. You're all set for this next chapter.
          </div>
        </div>

        <div className="flex items-center gap-2 mt-5 mb-2">
          <div className="w-2 h-2 rounded-full bg-manulife-green" />
          <div className="text-ink font-bold text-[14px]">Your welcome rewards</div>
        </div>

        <div className="space-y-2">
          <RewardRow
            eyebrow="GRAIL Cancer Screening"
            title="1 free screening"
            iconBg="bg-white border border-stroke"
            iconContent={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 4l2 4 4 .8-3 3 .8 4.2L12 14l-3.8 2 .8-4.2-3-3 4-.8L12 4z" fill="#D94D75" />
                <path d="M12 8l1 2 2 .4-1.5 1.5.4 2.1L12 13l-1.9 1 .4-2.1L9 10.4l2-.4L12 8z" fill="#2D7BD1" />
              </svg>
            }
          />
          <RewardRow
            eyebrow="Bonus Aeroplan Points"
            title="2,500 pts"
            iconBg="bg-[#1A1D29]"
            iconContent={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#E11E38">
                <path d="M12 2l1.2 3.6 3.8-.8-1.4 3.6 3.4 2-3 2.2 1 3.6-3.6-1-.4 3.8-2-3-2 3-.4-3.8-3.6 1 1-3.6-3-2.2 3.4-2L5 4.8l3.8.8L12 2z" />
              </svg>
            }
          />
        </div>

        <button
          onClick={onViewDetails}
          className="w-full mt-5 bg-manulife-green text-white rounded-full py-3 font-semibold text-[15px] active:opacity-80"
        >
          View coverage details
        </button>
        <button className="w-full mt-2 text-ink font-semibold text-[14px] py-2">
          View rewards
        </button>
      </div>
    </motion.div>
  )
}
