function ClusterIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="10" cy="10" r="5" fill="#8E1C3B" opacity="0.85" />
      <circle cx="18" cy="10" r="5" fill="#D94D75" opacity="0.85" />
      <circle cx="10" cy="18" r="5" fill="#5B3A8E" opacity="0.85" />
      <circle cx="18" cy="18" r="5" fill="#2D7BD1" opacity="0.85" />
    </svg>
  )
}

export default function ActionCard({ title, subtitle, ctaLabel, ctaEnabled = true, onCta, collapsed = false }) {
  return (
    <div className="border border-stroke rounded-lg p-3 bg-gray-50">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-md bg-white border border-stroke flex items-center justify-center shrink-0">
          <ClusterIcon />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-ink font-bold text-[15px] leading-tight">{title}</div>
          <div className="text-ink-soft text-[12px] leading-tight mt-0.5">{subtitle}</div>
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); if (ctaEnabled) onCta?.() }}
        disabled={!ctaEnabled}
        className={`w-full rounded-full font-semibold text-[14px] ${
          collapsed ? 'py-1.5 text-[13px]' : 'py-2.5'
        } ${ctaEnabled ? 'bg-manulife-green text-white active:opacity-80' : 'bg-manulife-green/60 text-white'}`}
      >
        {ctaLabel}
      </button>
    </div>
  )
}
