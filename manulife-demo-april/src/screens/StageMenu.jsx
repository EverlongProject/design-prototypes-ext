import { ChevronRight } from 'lucide-react'
import { STAGES, STAGE_ORDER } from '../data/stages.js'

export default function StageMenu({ onPick }) {
  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="pt-safe" />
      <div className="px-6 pt-10 pb-6">
        <div className="text-ink-soft text-[13px] font-semibold uppercase tracking-wide mb-1">
          Manulife · League prototype
        </div>
        <h1 className="text-ink font-bold text-[28px] leading-tight">
          Pick a scenario to demo
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-6">
        {STAGE_ORDER.map((key, idx) => {
          const stage = STAGES[key]
          return (
            <button
              key={key}
              onClick={() => onPick(key)}
              className="w-full text-left bg-white border border-stroke rounded-lg p-4 flex items-center gap-3 active:bg-gray-50"
            >
              <div className="w-10 h-10 rounded-full bg-manulife-green-light text-manulife-green flex items-center justify-center font-bold text-[15px] shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-ink font-semibold text-[16px]">{stage.title}</div>
                <div className="text-ink-soft text-[13px] leading-snug mt-0.5">{stage.subtitle}</div>
              </div>
              <ChevronRight size={20} className="text-ink-soft shrink-0" />
            </button>
          )
        })}
      </div>

      <div className="px-6 pb-safe pt-3 text-ink-soft text-[11px] text-center">
        Tap a scenario to start. Use the menu button in-flow to restart.
      </div>
    </div>
  )
}
