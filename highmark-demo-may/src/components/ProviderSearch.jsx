import MapView from './MapView.jsx'
import ProviderCard from './ProviderCard.jsx'

// Composite media card: map + stacked provider cards. Used for Beats 9 and 10.
// `providers`: [{ id, name, practice, distance, tier, nextAvailable, rating, reviews, copay, highlighted, pin: {x, y} }]

export default function ProviderSearch({ providers = [] }) {
  const pins = providers.map((p) => ({
    id: p.id,
    x: p.pin?.x ?? 50,
    y: p.pin?.y ?? 50,
    highlighted: p.highlighted,
  }))

  return (
    <div className="w-full">
      <MapView pins={pins} />
      <div className="mt-3 space-y-2">
        {providers.map((p) => (
          <ProviderCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  )
}
