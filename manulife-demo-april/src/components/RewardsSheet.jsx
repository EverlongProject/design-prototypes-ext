import { motion } from 'framer-motion'
import { X, PartyPopper } from 'lucide-react'

function Confetti() {
  const pieces = Array.from({ length: 48 }, (_, i) => i)
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((i) => {
        const angle = (i / pieces.length) * 360 + (i % 2 ? 12 : -12)
        const dist = 220 + (i % 4) * 60
        const delay = (i % 6) * 0.04
        const duration = 1.1 + (i % 5) * 0.15
        const palette = ['#FFFFFF', '#C4A9F7', '#F5E6A8', '#6EE7B7', '#FDBA74']
        const color = palette[i % palette.length]
        const w = 6 + (i % 3) * 2
        const h = 10 + (i % 3) * 3
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * dist,
              y: Math.sin((angle * Math.PI) / 180) * dist,
              opacity: [0, 1, 1, 0],
              rotate: 360 + (i % 2 ? 180 : -180),
            }}
            transition={{ duration, delay, ease: 'easeOut' }}
            className="absolute rounded-[1px]"
            style={{
              top: '18%',
              left: '50%',
              width: w,
              height: h,
              backgroundColor: color,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        )
      })}
    </div>
  )
}

function RewardRow({ eyebrow, title, iconBg, iconContent }) {
  return (
    <div className="bg-[#F5F5F5] border border-stroke rounded-lg p-3 flex items-center gap-3">
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
        <button onClick={onViewDetails} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
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

        <div className="space-y-2 mt-5">
          <RewardRow
            eyebrow="GRAIL Cancer Screening"
            title="1 free screening"
            iconBg="bg-white"
            iconContent={
              <img src={`${import.meta.env.BASE_URL}assets/grail.png`} alt="" className="w-10 h-10 object-contain" />
            }
          />
          <RewardRow
            eyebrow="Bonus Aeroplan Points"
            title="2,500 pts"
            iconBg="bg-white"
            iconContent={
              <img src={`${import.meta.env.BASE_URL}assets/Aeroplan.png`} alt="" className="w-10 h-10 object-contain" />
            }
          />
        </div>

        <button
          onClick={onViewDetails}
          className="w-full mt-5 bg-manulife-green text-white rounded-full py-3 font-semibold text-[15px] active:opacity-80"
        >
          View coverage details
        </button>
        <button onClick={onViewDetails} className="w-full mt-2 text-ink font-semibold text-[14px] py-2">
          View rewards
        </button>
      </div>
    </motion.div>
  )
}
