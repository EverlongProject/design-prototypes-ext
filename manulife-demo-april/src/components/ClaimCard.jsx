import { ChevronRight } from 'lucide-react'

export default function ClaimCard({
  date,
  status = 'Approved',
  pharmacy,
  forName,
  drug,
  cost
}) {
  return (
    <div className="bg-white border border-stroke rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-block text-[11px] font-semibold text-ink bg-gray-100 rounded-md px-2 py-0.5">{date}</span>
        <span className="inline-block text-[11px] font-semibold text-manulife-green bg-manulife-green-light rounded-md px-2 py-0.5">{status}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-ink text-[17px] font-bold leading-tight mb-1.5">{pharmacy}</div>
          {forName && (
            <div className="text-[12px] text-ink-soft">For: {forName}</div>
          )}
          {drug && (
            <div className="text-[12px] text-ink-soft">Drug: {drug}</div>
          )}
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-[12px] text-ink-soft">Your Cost:</span>
            <span className="text-ink font-bold text-[20px]">{cost}</span>
          </div>
        </div>
        <ChevronRight size={20} className="text-ink-soft shrink-0" />
      </div>
    </div>
  )
}
