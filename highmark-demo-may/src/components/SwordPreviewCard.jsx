import { Smartphone, Activity, Home, Calendar } from 'lucide-react'

// Static Sword Health preview card. Phone mockup placeholder with motion-track
// overlay graphic, three "what you get" bullets, and a cost comparison strip.

export default function SwordPreviewCard() {
  return (
    <div className="w-full max-w-[340px] rounded-lg overflow-hidden border border-border shadow-card bg-white">
      <div className="relative h-[170px] bg-gradient-to-br from-[#0F2A4F] to-[#0066B1] flex items-center justify-center overflow-hidden">
        {/* Phone mockup */}
        <div className="relative w-[110px] h-[155px] rounded-2xl bg-[#0a1a2e] border-2 border-white/15 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#143462] to-[#0a1a2e]" />
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-black" />

          {/* Motion-track overlay: stylized skeleton dots + lines */}
          <svg viewBox="0 0 110 155" className="absolute inset-0 w-full h-full">
            {/* Body silhouette dots */}
            <circle cx="55" cy="40" r="4" fill="#5BC8E8" />
            <line x1="55" y1="44" x2="55" y2="80" stroke="#5BC8E8" strokeWidth="1.5" />
            <line x1="55" y1="55" x2="38" y2="70" stroke="#5BC8E8" strokeWidth="1.5" />
            <line x1="55" y1="55" x2="72" y2="70" stroke="#5BC8E8" strokeWidth="1.5" />
            <circle cx="38" cy="70" r="2.5" fill="#5BC8E8" />
            <circle cx="72" cy="70" r="2.5" fill="#5BC8E8" />
            <line x1="55" y1="80" x2="44" y2="115" stroke="#5BC8E8" strokeWidth="1.5" />
            <line x1="55" y1="80" x2="66" y2="115" stroke="#5BC8E8" strokeWidth="1.5" />
            <circle cx="44" cy="115" r="2.5" fill="#5BC8E8" />
            <circle cx="66" cy="115" r="2.5" fill="#5BC8E8" />
            <circle cx="55" cy="80" r="3" fill="#5BC8E8" />
          </svg>

          <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-white/10 backdrop-blur text-[8px] text-white font-sans">
            Tracking… 92%
          </div>
        </div>

        <span className="absolute top-2 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 text-[10px] font-semibold font-sans text-highmark-primary">
          <Activity className="w-3 h-3" /> Sword Health
        </span>
      </div>

      <div className="px-4 py-3">
        <ul className="space-y-1.5 mb-3">
          <Bullet icon={<Smartphone className="w-3.5 h-3.5" />} text="Real PT, guided sessions on your phone" />
          <Bullet icon={<Home className="w-3.5 h-3.5" />} text="From home, on your schedule" />
          <Bullet icon={<Calendar className="w-3.5 h-3.5" />} text="Most members improve in 2–3 weeks" />
        </ul>

        <div className="rounded-md border border-border overflow-hidden text-[12px] font-sans">
          <div className="grid grid-cols-3 bg-surface-secondary text-ink-subdued font-semibold">
            <div className="px-2 py-1.5">Cost / 6 wks</div>
            <div className="px-2 py-1.5 text-center">Sword</div>
            <div className="px-2 py-1.5 text-center">In-person</div>
          </div>
          <div className="grid grid-cols-3 border-t border-border">
            <div className="px-2 py-1.5 text-ink-subdued">Copays</div>
            <div className="px-2 py-1.5 text-center font-semibold text-success">$0</div>
            <div className="px-2 py-1.5 text-center text-ink">~$300</div>
          </div>
          <div className="grid grid-cols-3 border-t border-border">
            <div className="px-2 py-1.5 text-ink-subdued">Where</div>
            <div className="px-2 py-1.5 text-center text-ink">Home</div>
            <div className="px-2 py-1.5 text-center text-ink">Clinic</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Bullet({ icon, text }) {
  return (
    <li className="flex items-start gap-2 text-[13px] text-ink font-sans leading-snug">
      <span className="w-5 h-5 rounded-full bg-highmark-primary-pastel text-highmark-primary flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </span>
      <span>{text}</span>
    </li>
  )
}
