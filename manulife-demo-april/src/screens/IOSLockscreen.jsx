import { Flashlight, Camera } from 'lucide-react'

function ManulifeBars({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <rect x="4" y="4" width="3" height="16" rx="1" />
      <rect x="10.5" y="4" width="3" height="16" rx="1" />
      <rect x="17" y="4" width="3" height="16" rx="1" />
    </svg>
  )
}

export default function IOSLockscreen({ onTapNotification }) {
  return (
    <div
      className="h-full w-full relative flex flex-col text-white overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 30% 20%, #3D5D8E 0%, #2A4070 35%, #1B2A4F 70%), linear-gradient(180deg, #2A4070 0%, #1B2A4F 100%)'
      }}
    >
      <div
        className="absolute -right-20 top-10 w-[280px] h-[280px] rounded-full"
        style={{ background: 'radial-gradient(circle, #8BA6D1 0%, #5A7CAD 50%, transparent 80%)', opacity: 0.55 }}
      />
      <div
        className="absolute -left-16 top-1/3 w-[240px] h-[240px] rounded-full"
        style={{ background: 'radial-gradient(circle, #A8D4C7 0%, #5FA28C 60%, transparent 85%)', opacity: 0.5 }}
      />
      <div
        className="absolute left-1/4 bottom-20 w-[260px] h-[260px] rounded-full"
        style={{ background: 'radial-gradient(circle, #6FAFD0 0%, #3E6C9C 55%, transparent 85%)', opacity: 0.45 }}
      />


      <div className="relative px-6 pt-6 text-center">
        <div className="text-[15px] font-medium">Wednesday, April 22</div>
        <div className="text-[84px] font-light leading-none mt-1">9:41</div>
      </div>

      <div className="flex-1" />

      <div className="relative px-3 pb-6">
        <button
          onClick={onTapNotification}
          className="w-full bg-white/20 backdrop-blur-xl rounded-2xl px-3 py-3 flex items-start gap-3 text-left active:bg-white/30"
        >
          <div className="w-9 h-9 rounded-lg bg-manulife-green flex items-center justify-center shrink-0">
            <ManulifeBars size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[14px]">Manulife</span>
              <span className="text-[12px] opacity-80">12:30 PM</span>
            </div>
            <div className="text-[14px] leading-snug mt-0.5">
              Heading to dinner? Tap to log it in a snap.
            </div>
          </div>
        </button>
      </div>

      <div className="relative px-8 flex items-center justify-between" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom))' }}>
        <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
          <Flashlight size={18} strokeWidth={2} />
        </div>
        <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
          <Camera size={18} strokeWidth={2} />
        </div>
      </div>
      <div className="relative h-1 w-32 bg-white/70 rounded-full mx-auto mb-2" />
    </div>
  )
}
