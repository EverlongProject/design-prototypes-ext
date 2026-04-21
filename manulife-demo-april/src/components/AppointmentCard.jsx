import { ChevronRight } from 'lucide-react'

export default function AppointmentCard({ time, location }) {
  return (
    <div className="bg-white border border-stroke rounded-lg p-3 my-2">
      <div className="inline-block bg-manulife-green-light text-manulife-green text-[11px] font-semibold rounded-full px-2.5 py-1 mb-2">
        Appointment Confirmed
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-[#5B6B2E] flex items-center justify-center shrink-0">
          <div className="text-[#D8E28F] leading-[0.9] text-center" style={{ fontFamily: 'serif' }}>
            <div className="text-[9px] italic font-bold">nia</div>
            <div className="text-[6px] tracking-wide">health</div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-ink-soft text-[11px] font-semibold">NiaHealth</div>
          <div className="text-ink font-bold text-[14px] leading-tight">Biomarker Screening</div>
          <div className="text-ink-soft text-[12px] leading-tight mt-0.5 truncate">{time} • {location}</div>
        </div>
        <ChevronRight size={18} className="text-ink-soft shrink-0" />
      </div>
    </div>
  )
}
