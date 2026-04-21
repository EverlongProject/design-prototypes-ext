import { Clipboard, Activity, ShieldCheck } from 'lucide-react'

function Row({ Icon, iconBg, iconColor, label, value }) {
  return (
    <div className="flex items-center gap-2.5 py-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon size={16} className={iconColor} strokeWidth={2} />
      </div>
      <div className="flex-1 text-ink text-[14px] font-semibold">{label}</div>
      <div className="text-ink text-[13px] font-semibold">{value}</div>
    </div>
  )
}

export default function ApprovedCoverageCard() {
  return (
    <div className="bg-white border border-stroke rounded-lg p-3 my-2">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-ink font-bold text-[15px] leading-tight">Your approved coverage</div>
          <div className="text-ink-soft text-[12px] mt-0.5">Effective from your retirement date</div>
        </div>
        <div className="bg-manulife-green text-white text-[11px] font-semibold rounded-full px-2.5 py-1 shrink-0">
          Pre-approved
        </div>
      </div>

      <div className="bg-gray-50 border border-stroke rounded-md px-3 py-1 mb-2">
        <div className="text-ink-soft text-[11px] font-semibold pt-1">Continuing coverage</div>
        <Row
          Icon={Clipboard}
          iconBg="bg-manulife-green-light"
          iconColor="text-manulife-green"
          label="Paramedical"
          value="Up to $1,500/yr"
        />
        <Row
          Icon={Activity}
          iconBg="bg-manulife-green-light"
          iconColor="text-manulife-green"
          label="Dental"
          value="Up to $5,000/yr"
        />
      </div>

      <div className="bg-gray-50 border border-stroke rounded-md px-3 py-1">
        <div className="text-ink-soft text-[11px] font-semibold pt-1">New coverage</div>
        <Row
          Icon={ShieldCheck}
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
          label="Critical Illness"
          value="$100,000"
        />
      </div>
    </div>
  )
}
