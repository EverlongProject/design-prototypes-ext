function formatCurrency(n) {
  if (typeof n !== 'number') return n
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function CoverageTile({ eyebrow, title, icon, spent, total, remaining, coverageAmount }) {
  const isCoverage = coverageAmount != null
  const pct = !isCoverage && total > 0 ? Math.min(100, (spent / total) * 100) : 0
  const remainingValue = remaining ?? (total != null ? total - spent : 0)

  return (
    <div className="bg-[#F5F5F5] border border-stroke rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {eyebrow && (
            <div className="text-ink-soft text-[11px] font-semibold tracking-[0.08em] uppercase mb-0.5">{eyebrow}</div>
          )}
          <div className="text-ink font-bold text-[18px] leading-tight">{title}</div>
        </div>
        {icon && (
          <div className="w-9 h-9 bg-purple-50 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
            <img src={icon} alt="" className="w-5 h-5 object-contain" />
          </div>
        )}
      </div>

      {isCoverage ? (
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-ink text-[14px]">Coverage</span>
          <span className="text-ink font-bold text-[17px]">{formatCurrency(coverageAmount)}</span>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
