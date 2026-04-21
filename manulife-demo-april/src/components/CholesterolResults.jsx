import { motion } from 'framer-motion'

function Metric({ label, value, unit, healthy, valueColor = 'text-orange-500' }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="text-ink font-semibold text-[12px] leading-tight mb-1">{label}</div>
      <div className={`font-bold ${valueColor} text-[20px] leading-none`}>
        {value} <span className="text-ink-soft text-[11px] font-normal">{unit}</span>
      </div>
      <div className="text-ink-soft text-[11px] mt-1">{healthy}</div>
    </div>
  )
}

const SERIES = [
  { key: 'total', label: 'Total Cholesterol', color: '#8E1C3B', values: [180, 188, 198] },
  { key: 'ldl', label: 'LDL Cholesterol', color: '#A89BB3', values: [118, 128, 147] },
  { key: 'hdl', label: 'HDL Cholesterol', color: '#2D7BD1', values: [40, 41, 43] }
]
const X_LABELS = ["Oct '24", "Apr '25", "Jan '26"]
const Y_TICKS = [0, 60, 120, 180, 240]

function MultiLineChart() {
  const width = 320
  const height = 170
  const padL = 40
  const padR = 16
  const padT = 14
  const padB = 28
  const yMin = Y_TICKS[0]
  const yMax = Y_TICKS[Y_TICKS.length - 1]

  const xStep = (width - padL - padR) / (X_LABELS.length - 1)
  const yScale = (v) => padT + ((yMax - v) / (yMax - yMin)) * (height - padT - padB)

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="mt-2">
      {Y_TICKS.map((t) => {
        const y = yScale(t)
        return (
          <g key={t}>
            <line x1={padL} x2={width - padR} y1={y} y2={y} stroke="#F3F4F6" />
            <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="10" fill="#9CA3AF">{t}</text>
          </g>
        )
      })}

      {SERIES.map((s) => {
        const points = s.values.map((v, i) => ({ x: padL + i * xStep, y: yScale(v) }))
        const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
        return (
          <g key={s.key}>
            <motion.path
              d={path}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            {points.map((p, i) => (
              <motion.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={3}
                fill={s.color}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 0.08, duration: 0.25 }}
              />
            ))}
          </g>
        )
      })}

      {X_LABELS.map((l, i) => (
        <text key={l} x={padL + i * xStep} y={height - 8} textAnchor="middle" fontSize="10" fill="#6B7280">{l}</text>
      ))}
      <text x={6} y={padT + 4} fontSize="9" fill="#9CA3AF">MG/DL</text>
    </svg>
  )
}

export default function CholesterolResults() {
  return (
    <div className="bg-white border border-stroke rounded-lg p-3 my-2">
      <div className="text-ink font-bold text-[14px] mb-2">Current results</div>
      <div className="flex gap-3 mb-4">
        <Metric label="Total Cholesterol" value="201" unit="mg/dL" healthy="Healthy  <200" />
        <Metric label="LDL Cholesterol" value="147" unit="mg/dL" healthy="Healthy  <130" />
        <Metric label="HDL Cholesterol" value="43" unit="mg/dL" healthy="Healthy  >50" />
      </div>

      <div className="text-ink font-bold text-[14px] mb-1">Cholesterol in past 18 months</div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] mb-1">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1">
            <div className="w-3 h-[2px] rounded" style={{ backgroundColor: s.color }} />
            <span className="text-ink-soft">{s.label}</span>
          </div>
        ))}
      </div>
      <MultiLineChart />
    </div>
  )
}
