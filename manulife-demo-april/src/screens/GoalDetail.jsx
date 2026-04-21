import { ChevronLeft, ChevronRight, Check, Play, Target, Droplet, UserRound } from 'lucide-react'

function StatCircle({ icon: Icon, value, label }) {
  return (
    <div className="flex flex-col items-center flex-1">
      <div className="w-12 h-12 rounded-full border-2 border-manulife-green flex items-center justify-center gap-0.5">
        {Icon && <Icon size={12} className="text-manulife-green" strokeWidth={2.5} />}
        <span className="text-ink font-bold text-[15px]">{value}</span>
      </div>
      <div className="text-ink-soft text-[11px] font-semibold mt-1.5">{label}</div>
    </div>
  )
}

function InsightCard({ eyebrow, title, body }) {
  return (
    <div className="bg-white border border-stroke rounded-lg p-3 flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <div className="text-ink-soft text-[11px] font-semibold">{eyebrow}</div>
        <div className="text-ink font-bold text-[15px] leading-snug mt-0.5">{title}</div>
        <div className="text-ink text-[12px] leading-snug mt-1">{body}</div>
      </div>
      <button className="w-8 h-8 rounded-full bg-manulife-green text-white flex items-center justify-center shrink-0">
        <Play size={14} strokeWidth={2.5} fill="currentColor" />
      </button>
    </div>
  )
}

function PtsBadge({ value }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-gray-100 rounded-full pl-1 pr-2.5 py-0.5">
      <img src={`${import.meta.env.BASE_URL}assets/Aeroplan-Icon.png`} alt="" className="w-4 h-4 object-contain" />
      <span className="text-ink text-[13px] font-semibold">{value}</span>
    </div>
  )
}

function ActionRow({ eyebrow, title, pts, thumb }) {
  return (
    <div className="bg-white border border-stroke rounded-lg p-3 flex items-center gap-3">
      <div className="w-11 h-11 rounded-md flex items-center justify-center shrink-0 overflow-hidden bg-gray-100">
        <img src={thumb.src} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-ink-soft text-[12px]">{eyebrow}</div>
        <div className="text-ink font-bold text-[16px] leading-tight">{title}</div>
        <div className="mt-1.5"><PtsBadge value={pts} /></div>
      </div>
      <ChevronRight size={18} className="text-ink-soft shrink-0" />
    </div>
  )
}

function ActionSuggestionCard({ title, body, ctaLabel }) {
  return (
    <div className="bg-white border border-stroke rounded-lg p-3">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-11 h-11 rounded-md bg-manulife-green-light flex items-center justify-center shrink-0">
          <UserRound size={22} className="text-manulife-green" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-ink-soft text-[11px]">Suggested next step</div>
          <div className="text-ink font-bold text-[15px] leading-tight">{title}</div>
          <div className="text-ink-soft text-[12px] leading-snug mt-1">{body}</div>
        </div>
      </div>
      <button className="w-full bg-manulife-green text-white rounded-full py-2.5 font-semibold text-[14px]">
        {ctaLabel}
      </button>
    </div>
  )
}

function StatRow({ label, value, unit, status, statusColor, abnormal }) {
  const circleBg = abnormal ? 'bg-[#FFF4CC]' : 'bg-manulife-green-light'
  const dropColor = abnormal ? 'text-[#6B5300]' : 'text-manulife-green'
  return (
    <div className="bg-white border border-stroke rounded-lg p-3 flex items-center gap-3">
      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${circleBg}`}>
        <Droplet size={20} className={dropColor} fill="currentColor" strokeWidth={0} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-ink-soft text-[13px] leading-tight">{label}</div>
        <div className="text-ink font-bold text-[20px] leading-tight mt-0.5">
          {value} <span className="text-ink-soft text-[13px] font-normal">{unit}</span>
        </div>
        <div className={`inline-block mt-1.5 text-[12px] font-semibold px-2 py-0.5 rounded ${statusColor}`}>{status}</div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-ink-soft text-[11px]">Yesterday</div>
        <ChevronRight size={16} className="text-ink-soft ml-auto mt-0.5" />
      </div>
    </div>
  )
}

const INITIAL_STATS = [
  { label: 'Total Cholesterol', value: '201', unit: 'mg/dL', status: 'Above range', statusColor: 'bg-[#FFF4CC] text-[#6B5300]', abnormal: true },
  { label: 'LDL', value: '147', unit: 'mg/dL', status: 'Above range', statusColor: 'bg-[#FFF4CC] text-[#6B5300]', abnormal: true },
  { label: 'HDL', value: '43', unit: 'mg/dL', status: 'Normal', statusColor: 'bg-manulife-green-light text-manulife-green' },
  { label: 'Triglycerides', value: '142', unit: 'mg/dL', status: 'Normal', statusColor: 'bg-manulife-green-light text-manulife-green' }
]

const UPDATED_STATS = [
  { label: 'Total Cholesterol', value: '178', unit: 'mg/dL', status: 'Normal', statusColor: 'bg-manulife-green-light text-manulife-green' },
  { label: 'LDL', value: '118', unit: 'mg/dL', status: 'Normal', statusColor: 'bg-manulife-green-light text-manulife-green' },
  { label: 'HDL', value: '51', unit: 'mg/dL', status: 'Normal', statusColor: 'bg-manulife-green-light text-manulife-green' },
  { label: 'Triglycerides', value: '112', unit: 'mg/dL', status: 'Normal', statusColor: 'bg-manulife-green-light text-manulife-green' }
]

export default function GoalDetail({ state = 'initial' }) {
  const isUpdated = state === 'updated'
  const stats = isUpdated ? UPDATED_STATS : INITIAL_STATS

  return (
    <div className="h-full w-full bg-white flex flex-col">

      <div className="flex items-center justify-between px-2 pt-1 pb-2">
        <button className="p-2 text-ink">
          <ChevronLeft size={24} strokeWidth={2.25} />
        </button>
        <span className="text-ink font-bold text-[17px]">Manage Cholesterol</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-3 pb-4">
          <div className="flex gap-3">
            <StatCircle icon={Check} value={isUpdated ? '25' : '1'} label="Check-ins" />
            <StatCircle icon={Target} value={isUpdated ? '20' : '0'} label="Day Streak" />
            <StatCircle value={isUpdated ? '600' : '0'} label="Points Earned" />
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="h-[5px] rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-manulife-green" />
        </div>

        <div className="px-4 pt-2 pb-5">
          <InsightCard
            eyebrow={isUpdated ? '3-month update' : 'Daily Insight'}
            title={isUpdated ? 'Your pattern is shifting' : 'Your pattern this week'}
            body={
              isUpdated
                ? 'Total cholesterol dropped from 201 to 178. LDL is back in normal range. Your biggest drivers: dinner swaps twice a week and a steady 140 active minutes on your Apple Watch.'
                : 'Based on your recent results, your LDL is at 3.8 mmol/L \u2014 slightly above the recommended range. Understanding your baseline is the first step to improving it.'
            }
          />
        </div>

        <div className="px-4 pb-5">
          <div className="text-ink font-bold text-[18px] mb-2">Actions</div>
          {isUpdated ? (
            <ActionSuggestionCard
              title="Start a stress management goal"
              body="Your stress has been consistently moderate. We can work on that next."
              ctaLabel="Add goal to Journey"
            />
          ) : (
            <div className="space-y-2">
              <ActionRow eyebrow="Check-in" title="Log your first meal" pts="50" thumb={{ src: `${import.meta.env.BASE_URL}assets/Meal.png` }} />
              <ActionRow eyebrow="Care" title="Talk to a specialist" pts="400" thumb={{ src: `${import.meta.env.BASE_URL}assets/Specialist.png` }} />
              <ActionRow eyebrow="Goal Setting" title="Set a weekly activity goal" pts="50" thumb={{ src: `${import.meta.env.BASE_URL}assets/activity.png` }} />
            </div>
          )}
        </div>

        <div className="px-4 pb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-ink font-bold text-[18px]">Key stats</div>
            <span className="text-manulife-green text-[13px] font-semibold">View all metrics</span>
          </div>
          <div className="space-y-2">
            {stats.map((s) => <StatRow key={s.label} {...s} />)}
          </div>
        </div>

        <div className="pb-6">
          <div className="text-ink font-bold text-[18px] mb-2 px-4">Additional resources</div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 px-4">
            <div className="shrink-0 w-[260px] bg-white border border-stroke rounded-lg overflow-hidden">
              <img src={`${import.meta.env.BASE_URL}assets/cronometer.png`} alt="" className="w-full h-[120px] object-cover" />
              <div className="p-3">
                <div className="text-ink font-bold text-[15px] leading-tight mb-1">Track your nutrition with Cronometer</div>
                <div className="text-ink-soft text-[13px] leading-snug mb-3">Log your meals and monitor key nutrients that impact blood pressure, like sodium and potassium.</div>
                <button className="w-full bg-manulife-green text-white rounded-full py-2 font-semibold text-[13px]">Get started with Cronometer</button>
              </div>
            </div>
            <div className="shrink-0 w-[260px] bg-white border border-stroke rounded-lg overflow-hidden">
              <img src={`${import.meta.env.BASE_URL}assets/pharmacist.png`} alt="" className="w-full h-[120px] object-cover" />
              <div className="p-3">
                <div className="text-ink font-bold text-[15px] leading-tight mb-1">Manage your prescriptions</div>
                <div className="text-ink-soft text-[13px] leading-snug mb-3">Get easier and quicker refills for your Shoppers Drug Mart and grocery store pharmacy prescriptions.</div>
                <button className="w-full bg-manulife-green text-white rounded-full py-2 font-semibold text-[13px]">Get started</button>
              </div>
            </div>
            <div className="shrink-0 w-4" />
          </div>
        </div>

        <div className="px-4 pb-10 text-center text-ink-soft text-[11px]">Tap anywhere to continue</div>
      </div>
    </div>
  )
}
