import { Home, Route, HeartPulse, FileText, Shield } from 'lucide-react'

const ITEMS = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'journey', label: 'Journey', icon: Route },
  { key: 'care', label: 'Care', icon: HeartPulse },
  { key: 'claims', label: 'Claims', icon: FileText },
  { key: 'coverage', label: 'Coverage', icon: Shield }
]

export default function BottomNav({ active = 'home' }) {
  return (
    <div className="bg-white border-t border-stroke pb-safe">
      <div className="flex items-stretch justify-around pt-2 pb-2">
        {ITEMS.map(({ key, label, icon: Icon }) => {
          const isActive = key === active
          const color = isActive ? 'text-manulife-green' : 'text-[#272A38]'
          return (
            <div key={key} className={`relative flex flex-col items-center gap-1 flex-1 ${color}`}>
              {isActive && (
                <div className="absolute -top-2 w-8 h-0.5 bg-manulife-green rounded-full" />
              )}
              <Icon size={22} strokeWidth={isActive ? 2.25 : 1.75} />
              <span className={`text-[11px] ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
