import { ChevronLeft, Video, Plus, Camera, Mic } from 'lucide-react'

function ManulifeBars({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <rect x="4" y="4" width="3" height="16" rx="1" />
      <rect x="10.5" y="4" width="3" height="16" rx="1" />
      <rect x="17" y="4" width="3" height="16" rx="1" />
    </svg>
  )
}

export default function IOSMessagesThread({ onTapLink }) {
  return (
    <div className="h-full w-full bg-white flex flex-col">

      <div className="flex items-center justify-between px-3 pt-1 pb-2 border-b border-gray-200">
        <button className="flex items-center text-blue-500">
          <ChevronLeft size={26} strokeWidth={2.25} />
        </button>
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-manulife-green flex items-center justify-center">
            <ManulifeBars size={14} />
          </div>
          <div className="flex items-center text-ink text-[11px] mt-0.5">
            <span className="font-semibold">Manny</span>
            <ChevronLeft size={10} className="rotate-180 text-ink-soft" />
          </div>
        </div>
        <Video size={22} className="text-blue-500" strokeWidth={2} />
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        <div className="max-w-[78%] bg-[#E9E9EB] text-ink rounded-2xl rounded-bl-md px-3 py-2 text-[15px] leading-snug">
          Hi Jenn, you've been with us for over 30 years — we want to make sure your coverage keeps up with you as you head into retirement. Your health guide is ready whenever you are.
        </div>

        <button
          onClick={onTapLink}
          className="block w-[82%] rounded-2xl overflow-hidden active:opacity-80 text-left"
        >
          <div className="bg-manulife-green px-3 py-2.5 flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-[14px] leading-tight">Chat about your coverage options</div>
              <div className="text-white/80 text-[12px] mt-0.5">manulife.ca</div>
            </div>
            <div className="w-7 h-7 rounded-md bg-white/15 flex items-center justify-center shrink-0">
              <ManulifeBars size={13} />
            </div>
          </div>
        </button>
      </div>

      <div className="px-3 pb-3 pt-2 flex items-center gap-2" style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <Plus size={16} className="text-ink-soft" />
        </div>
        <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-full px-3 py-1.5">
          <span className="flex-1 text-ink-soft text-[14px]">iMessage</span>
          <Mic size={16} className="text-ink-soft" />
        </div>
      </div>
    </div>
  )
}
