import { ChevronRight } from 'lucide-react'

export default function InfoCard({ icon: Icon, iconTint = 'bg-manulife-green-light text-manulife-green', title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-stroke rounded-lg p-3 flex items-center gap-3 active:bg-gray-50"
    >
      {Icon && (
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconTint}`}>
          <Icon size={20} strokeWidth={2} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-ink font-semibold text-[14px] leading-tight">{title}</div>
        {subtitle && <div className="text-ink-soft text-[12px] leading-snug mt-0.5">{subtitle}</div>}
      </div>
      <ChevronRight size={18} className="text-ink-soft shrink-0" />
    </button>
  )
}
