import { ChevronDown } from 'lucide-react'

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between px-4 pt-safe bg-white border-b border-stroke h-12">
      <button className="p-1 text-ink-soft" aria-label="Back">
        <ChevronDown size={22} />
      </button>
      <div className="text-ink font-semibold text-base">Manny</div>
      <button className="text-manulife-green text-sm font-medium">End Chat</button>
    </div>
  )
}
