import { MapPin } from 'lucide-react'

export default function LocationMap({ pins = [] }) {
  return (
    <div className="relative w-full h-[180px] rounded-lg overflow-hidden border border-border bg-[#EDF5EE]">
      <svg viewBox="0 0 320 180" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <rect width="320" height="180" fill="#EDF5EE" />
        <ellipse cx="60" cy="40" rx="28" ry="18" fill="#CFE5D2" />
        <ellipse cx="270" cy="130" rx="34" ry="20" fill="#CFE5D2" />
        <path d="M0 60 Q 80 50 160 70 T 320 80" stroke="#fff" strokeWidth="3" fill="none" />
        <path d="M0 120 Q 100 110 200 130 T 320 140" stroke="#fff" strokeWidth="3" fill="none" />
        <path d="M40 0 L 90 180" stroke="#fff" strokeWidth="2" fill="none" />
        <path d="M180 0 L 220 180" stroke="#fff" strokeWidth="2" fill="none" />
        <path d="M260 0 L 290 180" stroke="#fff" strokeWidth="2" fill="none" />
        <path
          d="M-10 150 Q 60 140 130 160 T 260 170 L 320 175 L 320 200 L -10 200 Z"
          fill="#BBD8C4"
        />
      </svg>

      {pins.map((pin) => (
        <div
          key={pin.id}
          className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          <div
            className={`flex items-center justify-center rounded-full shadow-md ${
              pin.highlighted
                ? 'w-7 h-7 bg-quest-primary text-white scale-110'
                : 'w-6 h-6 bg-white text-quest-primary border border-quest-primary'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
          </div>
        </div>
      ))}
    </div>
  )
}
