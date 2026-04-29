import { ChevronRight } from 'lucide-react'

// Fully clickable resource card surfaced inside an agent message turn.
// The whole card is the tap target — no chip beneath it. Used in Beat 4
// of the Health Coach script for Spring Health and Manage Stress.

export default function ResourceOptionCard({
  icon,
  name,
  subtitle,
  description,
  costChip,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group w-full text-left bg-white border border-border rounded-lg shadow-card p-4 flex items-start gap-3 hover:border-highmark-primary hover:shadow-md cursor-pointer transition-all"
    >
      {icon && (
        <span className="w-10 h-10 flex items-center justify-center shrink-0">
          <img src={icon} alt="" className="w-9 h-9" />
        </span>
      )}
      <div className="flex-1 min-w-0">
        {subtitle && (
          <p className="font-sans text-overline text-ink-subdued uppercase tracking-wide mb-1">
            {subtitle}
          </p>
        )}
        <p className="font-heading text-subtitle-2 font-semibold text-ink leading-tight mb-1">
          {name}
        </p>
        {description && (
          <p className="font-sans text-body-2 text-ink-subdued leading-snug mb-2">
            {description}
          </p>
        )}
        {costChip && (
          <span className="inline-block bg-highmark-primary-pastel text-highmark-primary font-sans text-caption font-semibold rounded-full px-2.5 py-0.5">
            {costChip}
          </span>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-ink-subdued shrink-0 mt-1 group-hover:text-highmark-primary" />
    </button>
  )
}
