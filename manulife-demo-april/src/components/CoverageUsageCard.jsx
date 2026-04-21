export default function CoverageUsageCard({ title, claimed, coverage, utilization }) {
  return (
    <div className="bg-white border border-stroke rounded-lg p-3 my-1">
      <div className="flex items-center justify-between mb-2">
        <div className="text-ink font-bold text-[15px]">{title}</div>
        <div className="bg-manulife-green-light text-manulife-green text-[11px] font-semibold rounded-full px-2.5 py-1">
          Avg per year
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gray-50 border border-stroke rounded-md p-2">
          <div className="text-ink font-bold text-[17px] leading-tight">{claimed}</div>
          <div className="text-ink-soft text-[11px] mt-0.5">Claimed</div>
        </div>
        <div className="bg-gray-50 border border-stroke rounded-md p-2">
          <div className="text-ink font-bold text-[17px] leading-tight">{coverage}</div>
          <div className="text-ink-soft text-[11px] mt-0.5">Coverage</div>
        </div>
        <div className="bg-gray-50 border border-stroke rounded-md p-2">
          <div className="text-manulife-green font-bold text-[17px] leading-tight">{utilization}</div>
          <div className="text-ink-soft text-[11px] mt-0.5">Utilization</div>
        </div>
      </div>
    </div>
  )
}
