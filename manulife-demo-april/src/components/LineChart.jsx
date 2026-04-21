import { motion } from 'framer-motion'

export default function LineChart({ data, unit = 'mg/dL', highlightLast = true, target }) {
  const width = 300
  const height = 140
  const padX = 24
  const padY = 20

  const values = data.map((d) => d.value)
  const min = Math.min(...values, target ?? Infinity) - 10
  const max = Math.max(...values, target ?? -Infinity) + 10
  const range = max - min || 1

  const xStep = (width - padX * 2) / (data.length - 1)
  const points = data.map((d, i) => ({
    x: padX + i * xStep,
    y: padY + ((max - d.value) / range) * (height - padY * 2),
    ...d
  }))
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const last = points[points.length - 1]
  const lastValue = data[data.length - 1].value

  return (
    <div className="bg-white border border-stroke rounded-lg p-4 my-2">
      <div className="flex items-baseline justify-between mb-1">
        <div>
          <div className="text-ink-soft text-[12px] font-semibold uppercase tracking-wide">Total cholesterol</div>
          <div className="text-ink font-bold text-[28px] leading-none mt-1">
            {lastValue} <span className="text-ink-soft text-[14px] font-normal">{unit}</span>
          </div>
        </div>
        {target && (
          <div className="text-right text-[12px] text-ink-soft">
            Target<br />
            <span className="text-ink font-semibold">&lt; {target}</span>
          </div>
        )}
      </div>

      <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="mt-2">
        {target && (
          <line
            x1={padX}
            x2={width - padX}
            y1={padY + ((max - target) / range) * (height - padY * 2)}
            y2={padY + ((max - target) / range) * (height - padY * 2)}
            stroke="#E5E7EB"
            strokeDasharray="3 3"
          />
        )}
        <motion.path
          d={path}
          fill="none"
          stroke="#00874E"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === points.length - 1 && highlightLast ? 5 : 3}
            fill={i === points.length - 1 && highlightLast ? '#00874E' : 'white'}
            stroke="#00874E"
            strokeWidth={2}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.05, duration: 0.25 }}
          />
        ))}
        {highlightLast && last && (
          <motion.text
            x={last.x}
            y={last.y - 12}
            textAnchor="middle"
            fill="#00874E"
            fontSize="11"
            fontWeight="700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            {lastValue}
          </motion.text>
        )}
      </svg>

      <div className="flex justify-between mt-1 text-[11px] text-ink-soft px-1">
        {data.map((d, i) => <span key={i}>{d.label}</span>)}
      </div>
    </div>
  )
}
