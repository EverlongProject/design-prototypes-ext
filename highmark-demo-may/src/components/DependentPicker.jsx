import { ChevronRight } from 'lucide-react'

// Two side-by-side selectable cards used in Beat 7. On tap, calls
// `onSelect(option)` which the parent turns into a UserMessage and
// advances the cursor.

export default function DependentPicker({ options = [], onSelect }) {
  return (
    <div className="w-full mb-4 grid grid-cols-2 gap-3">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onSelect?.(opt)}
          className="group flex items-center gap-3 rounded-lg border border-border bg-white px-3 py-3 text-left shadow-card hover:border-highmark-primary hover:bg-highmark-primary-pastel/40 transition-colors"
        >
          <Avatar name={opt.name} />
          <div className="flex-1 min-w-0">
            <p className="font-heading text-[16px] font-semibold text-ink leading-tight truncate">
              {opt.name}
            </p>
            <p className="font-sans text-[14px] text-ink-subdued leading-tight">
              {opt.age} years old
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-ink-subdued group-hover:text-highmark-primary shrink-0" />
        </button>
      ))}
    </div>
  )
}

function Avatar({ name }) {
  const initial = (name?.[0] || '?').toUpperCase()
  return (
    <span className="w-9 h-9 rounded-full bg-gradient-to-br from-highmark-primary to-[#5BC8E8] text-white flex items-center justify-center font-heading text-[16px] font-semibold shrink-0">
      {initial}
    </span>
  )
}
