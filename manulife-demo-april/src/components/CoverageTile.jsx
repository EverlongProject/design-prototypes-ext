import { Shield, Smile, Activity, Settings } from 'lucide-react'

const ICONS = {
  health: Shield,
  dental: Smile,
  paramedical: Activity
}

function formatCurrency(n) {
  if (typeof n !== 'number') return n
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function CoverageTile({ title, iconKey = 'health', spent, total, remaining }) {
  const Icon = ICONS[iconKey] || Settings
  const pct = total > 0 ? Math.min(100, (spent / total) * 100) : 0

  const remainingValue = remaining ?? total - spent

  return (
    <div className="bg-white border border-stroke rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="text-ink font-bold text-[17px] leading-tight">{title}</div>
        <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
          <Icon size={18} strokeWidth={1.75} />
        </div>
      </div>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-ink font-bold text-[15px]">${spent.toLocaleString()}</span>
        <span className="text-ink-soft text-[13px]">of ${total.toLocaleString()} spent</span>
      </div>

      <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-manulife-green rounded-full" style={{ width: `${pct}%` }} />
      </div>

      <div className="mt-2 text-right text-ink font-semibold text-[13px]">
        {formatCurrency(remainingValue)} remaining
      </div>
    </div>
  )
}
