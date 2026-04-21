import { Sparkles } from 'lucide-react'

function HealthScoreGauge() {
  const ticks = 60
  return (
    <div className="relative w-[110px] h-[110px] mx-auto flex items-center justify-center">
      <svg viewBox="0 0 110 110" className="absolute inset-0">
        {[...Array(ticks)].map((_, i) => {
          const angle = (i / ticks) * 360 - 90
          const rad = (angle * Math.PI) / 180
          const r1 = 42
          const r2 = 52
          const x1 = 55 + Math.cos(rad) * r1
          const y1 = 55 + Math.sin(rad) * r1
          const x2 = 55 + Math.cos(rad) * r2
          const y2 = 55 + Math.sin(rad) * r2
          const t = i / ticks
          const color = t < 0.8
            ? `rgb(${Math.round(180 - t * 120)}, ${Math.round(200 - t * 60)}, ${Math.round(90 - t * 30)})`
            : '#E5E7EB'
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
          )
        })}
      </svg>
      <span className="text-ink text-[42px] font-bold">B</span>
    </div>
  )
}

function NiaLogoBadge() {
  return (
    <div className="w-4 h-4 rounded-full bg-[#5B6B2E] flex items-center justify-center shrink-0">
      <div className="text-[#D8E28F] text-[6px] font-bold italic leading-none" style={{ fontFamily: 'serif' }}>nia</div>
    </div>
  )
}

export default function NiaHealthCard({ onLearnMore }) {
  return (
    <div>
      <div className="text-ink font-bold text-[20px] leading-snug mb-3">
        Your NiaHealth results are in
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-3">
        <div className="bg-gray-50 border border-stroke rounded-lg p-3">
          <div className="text-ink-soft text-[12px] font-semibold mb-1">Overall Health Score</div>
          <HealthScoreGauge />
        </div>
        <div className="bg-gray-50 border border-stroke rounded-lg p-3 flex flex-col">
          <div className="text-ink-soft text-[12px] font-semibold mb-1">Your Nia Age</div>
          <div className="text-ink font-bold text-[36px] leading-none mt-2">40.3</div>
          <div className="flex items-start gap-1 mt-2">
            <NiaLogoBadge />
            <div className="text-manulife-green text-[11px] leading-tight">
              <span className="font-semibold">2.7 years younger</span><br />
              <span className="text-ink-soft">than your calendar age</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onLearnMore}
        className="w-full border border-ink rounded-full py-2.5 text-ink font-semibold text-[14px] flex items-center justify-center gap-1.5 active:bg-gray-50"
      >
        <span>Learn more</span>
        <Sparkles size={14} strokeWidth={2.25} />
      </button>
    </div>
  )
}
