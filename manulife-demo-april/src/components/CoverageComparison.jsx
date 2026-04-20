import { Check } from 'lucide-react'

function Card({ data, recommended = false }) {
  return (
    <div
      className={[
        'w-full rounded-2xl p-4 bg-white relative',
        recommended ? 'border-2 border-manulife-green' : 'border border-stroke'
      ].join(' ')}
    >
      {recommended && (
        <div className="inline-block bg-manulife-green text-white text-[11px] font-semibold px-2 py-0.5 rounded-md mb-2">
          Recommended
        </div>
      )}
      {!recommended && (
        <div className="text-ink-soft text-xs font-medium mb-0.5">{data.label}</div>
      )}
      <div className="text-ink text-[14px] leading-snug">{data.policy}</div>
      <div className="text-ink font-bold text-2xl mt-1">{data.amount}</div>
      {data.bullets?.length > 0 && (
        <div className="mt-3 pt-3 border-t border-stroke space-y-2">
          {data.bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-manulife-green text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check size={11} strokeWidth={3} />
              </div>
              <span className="text-ink text-[13px] leading-snug">{b}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CoverageComparison({ current, recommended, heading = 'Coverage Comparison Summary' }) {
  return (
    <div>
      {heading && <div className="text-ink font-semibold text-[15px] mb-2">{heading}</div>}
      <div className="flex flex-col gap-2">
        <Card data={current} />
        <Card data={recommended} recommended />
      </div>
    </div>
  )
}
