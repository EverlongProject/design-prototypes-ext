import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const REVEAL_THRESHOLD = 0.2
const SCRATCH_IMAGE = `${import.meta.env.BASE_URL}assets/Scratch-1.png`

export default function ScratchSheet({ onRevealed, onAdvance }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const pointerRef = useRef({ down: false })
  const revealedRef = useRef(false)
  const imageLoadedRef = useRef(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    const rect = container.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const img = new Image()
    img.src = SCRATCH_IMAGE
    img.onload = () => {
      const scale = Math.max(rect.width / img.width, rect.height / img.height)
      const w = img.width * scale
      const h = img.height * scale
      const x = (rect.width - w) / 2
      const y = (rect.height - h) / 2
      ctx.drawImage(img, x, y, w, h)
      imageLoadedRef.current = true
    }
  }, [])

  const scratch = useCallback((clientX, clientY) => {
    if (revealedRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 26, 0, Math.PI * 2)
    ctx.fill()
  }, [])

  const checkCleared = useCallback(() => {
    if (revealedRef.current || !imageLoadedRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let cleared = 0
    let total = 0
    for (let i = 3; i < data.length; i += 4 * 64) {
      total++
      if (data[i] < 64) cleared++
    }
    if (total > 0 && cleared / total >= REVEAL_THRESHOLD) {
      revealedRef.current = true
      setRevealed(true)
      onRevealed?.()
    }
  }, [onRevealed])

  const handleDown = (e) => {
    pointerRef.current.down = true
    const p = e.touches ? e.touches[0] : e
    scratch(p.clientX, p.clientY)
    if (e.cancelable) e.preventDefault()
  }
  const handleMove = (e) => {
    if (!pointerRef.current.down) return
    const p = e.touches ? e.touches[0] : e
    scratch(p.clientX, p.clientY)
    if (e.cancelable) e.preventDefault()
  }
  const handleUp = () => {
    if (!pointerRef.current.down) return
    pointerRef.current.down = false
    checkCleared()
  }

  return (
    <div className="pb-2 relative">
      <div
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden select-none"
        style={{ aspectRatio: '16 / 9', backgroundColor: '#0D6B36' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative text-center text-white px-4">
            <div className="text-[64px] font-bold leading-none">500</div>
            <div className="text-[18px] font-bold leading-tight mt-2">Aeroplan Points</div>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full touch-none transition-opacity duration-500 ${revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          onTouchStart={handleDown}
          onTouchMove={handleMove}
          onTouchEnd={handleUp}
        />
      </div>

      <div className="mt-5 px-1">
        <div className="text-ink font-bold text-[22px] leading-tight">One tap, a lot unlocked.</div>
        <div className="text-ink-soft text-[15px] mt-2 leading-snug">
          Your Apple Watch just joined the team. From here on, it helps shape your plan, your premium, and what Manny knows about you. Scratch for a small thank-you.
        </div>
      </div>

      <div className="mt-5 flex flex-col items-stretch gap-2 h-[104px]">
        <motion.button
          initial={false}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          onClick={revealed ? onAdvance : undefined}
          aria-hidden={!revealed}
          className={`inline-flex items-center justify-center gap-2 bg-manulife-green text-white font-semibold text-[15px] rounded-full px-6 py-3 ${revealed ? '' : 'pointer-events-none'}`}
        >
          Close
        </motion.button>
        <motion.button
          initial={false}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          onClick={revealed ? onAdvance : undefined}
          aria-hidden={!revealed}
          className={`inline-flex items-center justify-center gap-2 bg-white text-manulife-green border border-manulife-green font-semibold text-[15px] rounded-full px-6 py-3 ${revealed ? '' : 'pointer-events-none'}`}
        >
          View rewards
        </motion.button>
      </div>

      {revealed && <Confetti />}
    </div>
  )
}

function Confetti() {
  const pieces = Array.from({ length: 48 }, (_, i) => i)
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((i) => {
        const angle = (i / pieces.length) * 360 + (i % 2 ? 12 : -12)
        const dist = 220 + (i % 4) * 60
        const delay = (i % 6) * 0.04
        const duration = 1.1 + (i % 5) * 0.15
        const palette = ['#FFFFFF', '#C4A9F7', '#F5E6A8', '#6EE7B7', '#FDBA74']
        const color = palette[i % palette.length]
        const w = 6 + (i % 3) * 2
        const h = 10 + (i % 3) * 3
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * dist,
              y: Math.sin((angle * Math.PI) / 180) * dist,
              opacity: [0, 1, 1, 0],
              rotate: 360 + (i % 2 ? 180 : -180),
            }}
            transition={{ duration, delay, ease: 'easeOut' }}
            className="absolute rounded-[1px]"
            style={{
              top: '18%',
              left: '50%',
              width: w,
              height: h,
              backgroundColor: color,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        )
      })}
    </div>
  )
}
