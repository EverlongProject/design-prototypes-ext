import { Flame, Award } from 'lucide-react'

function MapleLeaf({ size = 12, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2l1.2 3.6 3.8-.8-1.4 3.6 3.4 2-3 2.2 1 3.6-3.6-1-.4 3.8-2-3-2 3-.4-3.8-3.6 1 1-3.6-3-2.2 3.4-2L5 4.8l3.8.8L12 2z" />
    </svg>
  )
}

export default function ManulifeWidget() {
  return (
    <div className="w-full bg-manulife-green rounded-[22px] p-4 text-left">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-white/80 text-[13px] font-semibold">Points</div>
          <div className="text-white text-[32px] leading-none font-bold mt-1">3,275</div>
          <div className="flex items-center gap-1 mt-1.5 text-white/90 text-[12px] font-semibold">
            <Flame size={12} className="text-orange-300" fill="currentColor" strokeWidth={0} />
            <span>35 days streak</span>
          </div>
        </div>
        <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full" style={{
            background: 'conic-gradient(white 0deg 280deg, transparent 280deg 360deg)',
            WebkitMask: 'radial-gradient(circle, transparent 57%, black 59%)',
            mask: 'radial-gradient(circle, transparent 57%, black 59%)'
          }} />
          <Award size={18} className="text-white" />
        </div>
      </div>

      <div className="mt-3 bg-manulife-green-dark/40 rounded-xl px-3 py-2.5 flex items-center justify-between">
        <div>
          <div className="text-white/70 text-[11px] font-semibold">Next Action</div>
          <div className="text-white text-[14px] font-bold leading-tight mt-0.5">Nia Health Screening</div>
        </div>
        <div className="flex items-center gap-1 bg-black/25 rounded-full px-2 py-1 shrink-0">
          <MapleLeaf size={11} className="text-red-400" />
          <span className="text-white text-[12px] font-bold">1000 pts</span>
        </div>
      </div>
    </div>
  )
}
