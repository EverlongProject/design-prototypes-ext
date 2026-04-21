import { Wifi, BatteryFull, Signal } from 'lucide-react'

export default function IOSStatusBar({ dark = true, time = '9:41' }) {
  const color = dark ? 'text-ink' : 'text-white'
  return (
    <div className={`flex items-center justify-between px-6 pt-safe h-11 ${color}`}>
      <span className="text-[15px] font-semibold">{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal size={15} strokeWidth={2.25} />
        <Wifi size={15} strokeWidth={2.25} />
        <BatteryFull size={20} strokeWidth={2} />
      </div>
    </div>
  )
}
