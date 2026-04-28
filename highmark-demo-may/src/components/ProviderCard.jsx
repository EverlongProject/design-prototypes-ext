import { Star, MapPin, Calendar } from 'lucide-react'

// Single PT provider card. Highlighted variant uses a subtle border/shadow + Tier 1 badge.
// Tier-2 providers show their copay prominently to make the cost difference visible.

export default function ProviderCard({
  name,
  practice,
  distance,
  tier,
  nextAvailable,
  rating,
  reviews,
  copay,
  highlighted = false,
}) {
  return (
    <div
      className={`rounded-lg border bg-white p-3 transition-all ${
        highlighted
          ? 'border-highmark-primary shadow-[0_4px_14px_rgba(0,102,177,0.15)]'
          : 'border-border'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="min-w-0">
          <p className="font-heading text-[16px] font-semibold text-ink leading-tight truncate">
            {name}
          </p>
          <p className="font-sans text-[14px] text-ink-subdued leading-snug truncate">
            {practice}
          </p>
        </div>
        {tier === 1 ? (
          <span className="shrink-0 px-1.5 py-0.5 rounded bg-success/15 text-success text-[12px] font-semibold font-sans whitespace-nowrap">
            Tier 1
          </span>
        ) : (
          <span className="shrink-0 px-1.5 py-0.5 rounded bg-neutral-medium text-ink-subdued text-[12px] font-semibold font-sans whitespace-nowrap">
            Tier 2
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 text-[13px] text-ink-subdued font-sans mb-2">
        <span className="inline-flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {distance}
        </span>
        {rating != null && (
          <span className="inline-flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" /> {rating}
            {reviews ? ` (${reviews})` : ''}
          </span>
        )}
        <span
          className={`ml-auto font-semibold ${
            tier === 1 ? 'text-success' : 'text-ink'
          }`}
        >
          {copay}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[14px] text-ink font-sans">
        <Calendar className="w-3.5 h-3.5 text-highmark-primary" />
        <span className="font-medium">Next: {nextAvailable}</span>
      </div>
    </div>
  )
}
