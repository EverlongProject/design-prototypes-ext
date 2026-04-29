import { Calendar, ChevronRight } from 'lucide-react'

// Stack of selectable date/time cards used in Beat 12 to pick a colonoscopy
// slot. Mirrors DependentPicker's pattern but renders full-width rows so the
// day + time are easy to scan inside the side rail.

export default function SlotPicker({ options = [], onSelect }) {
  return (
    <div className="w-full mb-4 space-y-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onSelect?.(opt)}
          className="group w-full flex items-center gap-3 rounded-lg border border-border bg-white px-3 py-3 text-left shadow-card hover:border-highmark-primary hover:bg-highmark-primary-pastel/40 transition-colors"
        >
          <span className="w-9 h-9 rounded-full bg-highmark-primary-pastel text-highmark-primary flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-heading text-[16px] font-semibold text-ink leading-tight truncate">
              {opt.day}
            </p>
            <p className="font-sans text-[14px] text-ink-subdued leading-tight">
              {opt.time}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-ink-subdued group-hover:text-highmark-primary shrink-0" />
        </button>
      ))}
    </div>
  )
}
