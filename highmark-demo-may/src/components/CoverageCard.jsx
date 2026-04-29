import { Check } from 'lucide-react'

// Coverage snapshot card. Two modes share the same shell:
//
// 1) Member mode (P1 Beat 7): per-member accumulator card. Pass `member` as
//    the overline subject. Renders a big deductible figure with progress
//    bar, then PT-visit and sports-injury rows. Justifies "his deductible
//    is already met" rather than asserting a copay.
//
// 2) Service mode (P2 Beat 4): per-service coverage answer. Pass
//    `serviceLabel` (e.g. "PT Coverage") and the service-shaped fields:
//    `coveredLabel`, `copay`, `visitLimit`. The deductible block stays at
//    the bottom as a compact row with progress bar.
//
// Service mode kicks in when serviceLabel or coveredLabel is set.

export default function CoverageCard({
  // Member-mode props
  member = 'Liam Smith',
  // Common
  plan = 'Community Blue HDHP 1',
  // Member-mode rows
  ptVisitsUsed = 0,
  ptVisitsTotal = 10,
  sportsInjuryCovered = true,
  // Service-mode props
  serviceLabel,
  coveredLabel,
  copay,
  visitLimit,
  // Deductible (used in both modes)
  deductibleSpent = 1500,
  deductibleTotal = 1500,
}) {
  const isService = !!(serviceLabel || coveredLabel)
  const deductibleMet = deductibleSpent >= deductibleTotal
  const pct = deductibleTotal > 0
    ? Math.min(100, (deductibleSpent / deductibleTotal) * 100)
    : 0

  if (isService) {
    return (
      <div className="w-full max-w-[340px] bg-surface-card border border-border rounded-lg shadow-card p-5 font-sans">
        <p className="text-overline text-ink-subdued mb-3">
          {(serviceLabel || 'Coverage').toUpperCase()} · {plan.toUpperCase()}
        </p>

        {coveredLabel && (
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-success/15 text-success flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
            </span>
            <p className="font-heading text-subtitle-1 font-semibold text-ink leading-tight">
              {coveredLabel}
            </p>
          </div>
        )}

        <div className="border-t border-border pt-3 space-y-2 text-body-2">
          {copay && (
            <Row label="Copay" value={copay} />
          )}
          {visitLimit && (
            <Row label="Visit limit" value={visitLimit} />
          )}
          {deductibleTotal > 0 && (
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-ink-subdued">Deductible</span>
                <span className="text-ink font-semibold">
                  ${deductibleSpent.toLocaleString()} of ${deductibleTotal.toLocaleString()} met
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-neutral-medium overflow-hidden mt-1.5">
                <div
                  className="h-full rounded-full bg-success"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Member mode (P1 Beat 7) — labeled member header + uniform row list.
  return (
    <div className="w-full max-w-[340px] bg-surface-card border border-border rounded-lg shadow-card p-5 font-sans">
      <p className="font-heading text-[22px] font-semibold text-ink leading-tight">
        {member}
      </p>
      <p className="font-sans text-body-2 text-ink-subdued mb-4">{plan}</p>

      <div className="border-t border-border pt-3 space-y-2 text-body-2">
        <div className="flex items-baseline justify-between">
          <span className="text-ink-subdued">Deductible</span>
          <span
            className={`font-semibold text-right ${
              deductibleMet ? 'text-success' : 'text-ink'
            }`}
          >
            ${deductibleSpent.toLocaleString()} of ${deductibleTotal.toLocaleString()}
            {deductibleMet ? ' met' : ''}
          </span>
        </div>
        <Row label="PT visits used" value={`${ptVisitsUsed} of ${ptVisitsTotal}`} />
        <div className="flex items-center justify-between">
          <span className="text-ink-subdued">Sports injury PT</span>
          <span
            className={`font-semibold inline-flex items-center gap-1 ${
              sportsInjuryCovered ? 'text-success' : 'text-ink-subdued'
            }`}
          >
            <Check className="w-3.5 h-3.5" strokeWidth={3} />
            {sportsInjuryCovered ? 'Covered' : 'Not covered'}
          </span>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-ink-subdued">{label}</span>
      <span className="text-ink font-semibold text-right">{value}</span>
    </div>
  )
}
