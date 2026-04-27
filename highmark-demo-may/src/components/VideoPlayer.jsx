import { useState, useRef, useEffect } from 'react'
import { Play, Check } from 'lucide-react'

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

// Static demo video card. Idle thumbnail + play button → "now playing" frame
// with a progress bar that fills over `playDuration` ms, then calls onComplete.
// onComplete is wired up only when this video is the active gating turn.

const DEFAULT_PLAY_DURATION = 6000

export default function VideoPlayer({ title, duration = '1:02', onComplete, playDuration = DEFAULT_PLAY_DURATION }) {
  const [state, setState] = useState('idle') // 'idle' | 'playing' | 'watched'
  const [progress, setProgress] = useState(0)
  const startedAt = useRef(null)
  const completedRef = useRef(false)

  useEffect(() => {
    if (state !== 'playing') return
    startedAt.current = performance.now()
    let raf
    const tick = (t) => {
      const elapsed = t - startedAt.current
      const pct = Math.min(1, elapsed / playDuration)
      setProgress(pct)
      if (pct >= 1) {
        if (!completedRef.current) {
          completedRef.current = true
          setState('watched')
          onComplete?.()
        }
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [state, playDuration, onComplete])

  const start = () => {
    if (state === 'idle') setState('playing')
  }

  return (
    <button
      type="button"
      onClick={start}
      disabled={state !== 'idle'}
      className="block w-full max-w-[320px] rounded-lg overflow-hidden border border-border shadow-card text-left group"
    >
      <div className="relative h-[180px] bg-gradient-to-br from-[#A1CCE0] to-[#CCDAE1] flex items-center justify-center">
        <img
          src={ASSET('Highmark-Logo.svg')}
          alt=""
          className="h-9 w-auto opacity-80"
        />

        {state === 'idle' && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-14 h-14 rounded-full bg-white/95 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Play className="w-6 h-6 text-highmark-primary fill-highmark-primary ml-0.5" />
            </span>
          </span>
        )}

        {state === 'watched' && (
          <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 text-success text-[11px] font-semibold font-sans">
            <Check className="w-3 h-3" /> Watched
          </span>
        )}

        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/55 text-white text-[11px] font-sans">
          {duration}
        </span>

        {state === 'playing' && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-black/20">
            <div
              className="h-full bg-highmark-primary"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}
      </div>

      <div className="px-3 py-2.5 bg-white">
        <p className="font-heading text-[13px] font-medium text-ink leading-tight">
          {title}
        </p>
        <p className="font-sans text-[11px] text-ink-subdued mt-0.5">
          {state === 'playing' ? 'Now playing…' : state === 'watched' ? 'Watched' : 'Tap to play'}
        </p>
      </div>
    </button>
  )
}
