import { ChevronRight } from 'lucide-react'

const BASE = import.meta.env.BASE_URL

const STAGE_CARDS = [
  {
    key: 'stage1',
    eyebrow: 'Stage 1',
    title: 'Jenn – 32 Years Old',
    description: 'The start of her family. New home, first pregnancy, thinking about what comes next.',
    photo: `${BASE}assets/Jenn - 32.png`
  },
  {
    key: 'stage2',
    eyebrow: 'Stage 2',
    title: 'Jenn – 43 Years Old',
    description: 'Peak of life. Raising a kid, managing her career, taking her health seriously for the first time.',
    photo: `${BASE}assets/Jenn - 43.png`
  },
  {
    key: 'stage3',
    eyebrow: 'Stage 3',
    title: 'Jenn – 59 Years Old',
    description: 'Looking ahead. Kids grown, retirement close, focused on the years that matter most.',
    photo: `${BASE}assets/Jenn - 59.png`
  }
]

export default function StageMenu({ onPick }) {
  return (
    <div className="h-full w-full flex flex-col" style={{ backgroundColor: '#14161E' }}>
      <div className="pt-safe" />
      <div className="px-6 pt-10 pb-6 text-center">
        <h1 className="text-white font-bold text-[20px] leading-tight">League x Manulife</h1>
        <div className="text-white/70 text-[15px] italic mt-1">April 22 Demo</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-8">
        {STAGE_CARDS.map((card) => (
          <button
            key={card.key}
            onClick={() => onPick(card.key)}
            className="w-full text-left rounded-xl overflow-hidden active:opacity-90"
            style={{ backgroundColor: '#2B2D3F' }}
          >
            <img
              src={card.photo}
              alt=""
              className="w-full h-[180px] object-cover"
            />
            <div className="p-4 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-white/70 text-[12px] mb-0.5">{card.eyebrow}</div>
                <div className="text-white font-bold text-[16px] leading-tight mb-1">{card.title}</div>
                <div className="text-white/80 text-[13px] leading-snug">{card.description}</div>
              </div>
              <ChevronRight size={20} className="text-white/70 shrink-0" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
