import { Check } from 'lucide-react'

// Compact per-member coverage snapshot. Lands inline in Beat 7 after Liam
// is selected. Styled to match the home-screen deductible card UI:
// overline header, big number with progress bar, then secondary rows.
// Justifies the $25 copay number ("his deductible is already met") rather
// than asserting it. Fourth proof point that the AI is reading per-member
// accumulator data, not just plan documents.

export default function CoverageCard({
  member = 'Liam Smith',
  plan = 'Community Blue HDHP 1',
  deductibleSpent = 1500,
  deductibleTotal = 1500,
  ptVisitsUsed = 0,
  ptVisitsTotal = 30,
  sportsInjuryCovered = true,
}) {
  const deductibleMet = deductibleSpent >= deductibleTotal
  const pct = Math.min(100, (deductibleSpent / deductibleTotal) * 100)

  return (
    <div className="w-full max-w-[340px] bg-surface-card border border-border rounded-lg shadow-card p-5 font-sans">
      <p className="text-overline text-ink-subdued mb-2">
        {member.toUpperCase()} · {plan.toUpperCase()}
      </p>

      <p className="font-heading text-subtitle-1 text-ink mb-1">Deductible</p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-heading text-[24px] font-semibold text-ink leading-none">
          ${deductibleSpent.toLocaleString()}
        </span>
        <span className="text-body-2 text-ink-subdued">
          of ${deductibleTotal.toLocaleString()} spent
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-neutral-medium overflow-hidden mb-1.5">
        <div
          className="h-full rounded-full bg-success"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-body-2 font-semibold text-success text-right mb-4">
        {deductibleMet ? 'Deductible met' : `$${(deductibleTotal - deductibleSpent).toLocaleString()} remaining`}
      </p>

      <div className="border-t border-border pt-3 space-y-2 text-body-2">
        <div className="flex items-center justify-between">
          <span className="text-ink-subdued">PT visits used</span>
          <span className="text-ink font-semibold">
            {ptVisitsUsed} of {ptVisitsTotal}
          </span>
        </div>
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
