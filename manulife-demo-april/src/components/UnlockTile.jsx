import { ChevronRight } from 'lucide-react'

export default function UnlockTile({ title, subtitle, asset }) {
  return (
    <div className="bg-white border border-stroke rounded-2xl p-3 shadow-card flex items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-manulife-green-light shrink-0 flex items-center justify-center">
        {asset ? (
          <img src={asset} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-ink font-semibold text-[15px] truncate">{title}</div>
        <div className="text-ink-soft text-xs truncate">{subtitle}</div>
      </div>
      <ChevronRight size={20} className="text-ink-soft shrink-0" />
    </div>
  )
}
