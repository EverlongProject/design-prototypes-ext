import { useState, useEffect, useRef, useCallback } from 'react'
import {
  CARE_NAV_SCRIPT_PRE,
  LOCATIONS_ALL,
  SCREENING_BOOKING,
  SCREENING_WITH_FLU_BOOKING,
} from '../data/careNavScript.js'
import AgentMessage from './AgentMessage.jsx'
import UserMessage from './UserMessage.jsx'
import SuggestedReplies from './SuggestedReplies.jsx'
import LocationSearch from './LocationSearch.jsx'
import ConfirmationCard from './ConfirmationCard.jsx'
import ThinkingInline from './ThinkingInline.jsx'

export default function ChatRunner({ script = CARE_NAV_SCRIPT_PRE, onComplete }) {
  const [history, setHistory] = useState([])
  const [cursor, setCursor] = useState(0)
  const completedRef = useRef(false)
  const scrollRef = useRef(null)
  const contentRef = useRef(null)
  const advanceTimer = useRef(null)

  const currentTurn = script[cursor]

  useEffect(() => {
    if (cursor >= script.length && !completedRef.current) {
      completedRef.current = true
      onComplete?.()
    }
  }, [cursor, onComplete, script.length])

  useEffect(() => {
    setHistory((h) => {
      let next = [...h]
      for (let i = 0; i <= cursor && i < script.length; i++) {
        const turn = script[i]
        if (!turn) continue
        if (next.some((m) => m.id === turn.id)) continue
        if (turn.type === 'agent') {
          const hasText = !!turn.text
          const isCurrent = i === cursor
          next.push({
            kind: 'agent',
            id: turn.id,
            text: turn.text || '',
            streaming: hasText && isCurrent,
          })
        } else if (turn.type === 'user') {
          next.push({ kind: 'user', id: turn.id, text: turn.text })
        }
      }
      next = next.map((m) => {
        if (m.kind !== 'agent' || !m.streaming) return m
        const idx = script.findIndex((t) => t.id === m.id)
        return idx < cursor ? { ...m, streaming: false } : m
      })
      return next
    })
  }, [cursor, script])

  // Auto-advance past 'user' script turns. The history sync above handles
  // rendering the bubble; this effect just moves the cursor on after a beat.
  useEffect(() => {
    const turn = script[cursor]
    if (!turn || turn.type !== 'user') return
    const wait = turn.advanceAfter ?? 400
    const t = setTimeout(() => {
      setCursor((c) => (script[c]?.id === turn.id ? c + 1 : c))
    }, wait)
    return () => clearTimeout(t)
  }, [cursor, script])

  useEffect(() => {
    const turn = script[cursor]
    if (!turn || turn.type !== 'agent') return
    if (turn.text) return
    if (turn.gateOnMedia) return
    const wait = turn.advanceAfter ?? 0
    const t = setTimeout(() => {
      setCursor((c) => (script[c]?.id === turn.id ? c + 1 : c))
    }, wait)
    return () => clearTimeout(t)
  }, [cursor, script])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const stick = () => {
      el.scrollTop = el.scrollHeight
    }
    const raf1 = requestAnimationFrame(() => {
      stick()
      requestAnimationFrame(stick)
    })
    const t = setTimeout(stick, 150)
    return () => {
      cancelAnimationFrame(raf1)
      clearTimeout(t)
    }
  }, [cursor])

  useEffect(() => {
    const el = scrollRef.current
    const inner = contentRef.current
    if (!el || !inner) return

    let stick = true
    const NEAR_BOTTOM_PX = 40

    const onScroll = () => {
      const distanceFromBottom = el.scrollHeight - el.clientHeight - el.scrollTop
      stick = distanceFromBottom <= NEAR_BOTTOM_PX
    }
    el.addEventListener('scroll', onScroll, { passive: true })

    const ro = new ResizeObserver(() => {
      if (stick) el.scrollTop = el.scrollHeight
    })
    ro.observe(inner)
    ro.observe(el)

    el.scrollTop = el.scrollHeight

    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', onScroll)
    }
  }, [])

  const onAgentDone = useCallback((id) => {
    setHistory((h) => h.map((m) => (m.id === id ? { ...m, streaming: false } : m)))
    const turn = script.find((t) => t.id === id)
    if (turn?.gateOnMedia) return
    const wait = turn?.advanceAfter ?? 0
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    advanceTimer.current = setTimeout(() => {
      setCursor((c) => (script[c]?.id === id ? c + 1 : c))
    }, wait)
  }, [script])

  const onMediaDone = useCallback((id) => {
    setCursor((c) => (script[c]?.id === id ? c + 1 : c))
  }, [script])

  const onThinkingDone = useCallback((id) => {
    setCursor((c) => (script[c]?.id === id ? c + 1 : c))
  }, [script])

  const onUserSubmit = useCallback(
    (text) => {
      const turn = script[cursor]
      if (!turn) return
      if (turn.type !== 'input') return
      setHistory((h) => [
        ...h,
        { kind: 'user', id: `${turn.id}-u-${Date.now()}`, text },
      ])
      setCursor((c) => c + 1)
    },
    [cursor, script]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.shiftKey && e.key === 'ArrowRight') {
        e.preventDefault()
        setCursor((c) => Math.min(c + 1, script.length))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [script.length])

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
        <div ref={contentRef}>
          {history.map((m) => {
            if (m.kind === 'user') {
              return <UserMessage key={m.id} text={m.text} />
            }
            const turn = script.find((t) => t.id === m.id)
            const isCurrent = currentTurn?.id === m.id
            const media = turn?.media ? renderMedia(turn, isCurrent, onMediaDone) : null
            return (
              <AgentMessage
                key={m.id}
                text={m.text}
                streaming={m.streaming}
                media={media}
                mediaPosition={turn?.mediaPosition || 'below'}
                onDone={() => onAgentDone(m.id)}
              />
            )
          })}

          {currentTurn?.type === 'thinking' && (
            <ThinkingInline
              key={currentTurn.id}
              lines={currentTurn.lines}
              perLine={currentTurn.perLine}
              onDone={() => onThinkingDone(currentTurn.id)}
            />
          )}
        </div>
      </div>

      {(() => {
        const inputTurn = currentTurn?.type === 'input' ? currentTurn : null
        return (
          <SuggestedReplies
            key={inputTurn?.id || 'idle'}
            chips={inputTurn?.chips || []}
            autoType={inputTurn?.autoType}
            onSubmit={inputTurn ? onUserSubmit : undefined}
          />
        )
      })()}
    </div>
  )
}

function renderMedia(turn, isCurrent, onMediaDone) {
  const { media } = turn
  if (!media) return null
  switch (media.kind) {
    case 'locationSearch':
      return <LocationSearch locations={LOCATIONS_ALL} />
    case 'confirmation':
      if (media.variant === 'screening') return <ConfirmationCard {...SCREENING_BOOKING} />
      if (media.variant === 'screeningWithFlu') return <ConfirmationCard {...SCREENING_WITH_FLU_BOOKING} />
      return null
    default:
      return null
  }
}
