import { MapPin, Calendar, Car, Droplet } from 'lucide-react'

export default function LocationCard({
  name,
  address,
  distance,
  nextAvailable,
  parking,
  fingerStick,
  highlighted = false,
}) {
  return (
    <div
      className={`rounded-lg border bg-white p-3 transition-all ${
        highlighted
          ? 'border-quest-primary shadow-[0_4px_14px_rgba(0,133,75,0.15)]'
          : 'border-border'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="min-w-0">
          <p className="font-heading text-[16px] font-semibold text-ink leading-tight truncate">
            {name}
          </p>
          <p className="font-sans text-[14px] text-ink-subdued leading-snug truncate">
            {address}
          </p>
        </div>
        {highlighted && (
          <span className="shrink-0 px-1.5 py-0.5 rounded bg-quest-primary-pastel text-quest-primary-dark text-[12px] font-semibold font-sans whitespace-nowrap">
            Best match
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 text-[13px] text-ink-subdued font-sans mb-2 flex-wrap">
        <span className="inline-flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {distance}
        </span>
        <span className="inline-flex items-center gap-1">
          <Car className="w-3 h-3" /> {parking}
        </span>
        {fingerStick && (
          <span className="inline-flex items-center gap-1 text-quest-primary-dark">
            <Droplet className="w-3 h-3" /> Finger stick
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-[14px] text-ink font-sans">
        <Calendar className="w-3.5 h-3.5 text-quest-primary" />
        <span className="font-medium">{nextAvailable}</span>
      </div>
    </div>
  )
}
