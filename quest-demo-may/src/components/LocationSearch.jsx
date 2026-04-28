import LocationMap from './LocationMap.jsx'
import LocationCard from './LocationCard.jsx'

export default function LocationSearch({ locations = [] }) {
  const pins = locations.map((l) => ({
    id: l.id,
    x: l.pin?.x ?? 50,
    y: l.pin?.y ?? 50,
    highlighted: l.highlighted,
  }))

  return (
    <div className="w-full">
      <LocationMap pins={pins} />
      <div className="mt-3 space-y-2">
        {locations.map((l) => (
          <LocationCard key={l.id} {...l} />
        ))}
      </div>
    </div>
  )
}
