import { useState, useEffect, useRef, useCallback } from 'react'
import {
  VISION_SCRIPT,
  PROVIDERS_ALL,
  PROVIDERS_WEEKEND,
  PT_BOOKING,
  COLONOSCOPY_BOOKING,
} from '../data/visionScript.js'
import AgentMessage from './AgentMessage.jsx'
import UserMessage from './UserMessage.jsx'
import SuggestedReplies from './SuggestedReplies.jsx'
import VideoPlayer from './VideoPlayer.jsx'
import SwordPreviewCard from './SwordPreviewCard.jsx'
import ProviderSearch from './ProviderSearch.jsx'
import ConfirmationCard from './ConfirmationCard.jsx'
import ThinkingInline from './ThinkingInline.jsx'
import DependentPicker from './DependentPicker.jsx'
import CoverageCard from './CoverageCard.jsx'

// Drives the linear conversation script. Renders message history at the top,
// the current input affordance (chips + composer) at the bottom.
//
// Dev affordance: Shift+Right arrow advances past the current turn,
// useful for rehearsal.

export default function ChatRunner({ onComplete }) {
  const [history, setHistory] = useState([])
  const [cursor, setCursor] = useState(0)
  const completedRef = useRef(false)
  const scrollRef = useRef(null)
  const contentRef = useRef(null)
  const advanceTimer = useRef(null)

  const currentTurn = VISION_SCRIPT[cursor]

  // When the cursor moves past the last script turn, fire onComplete once.
  useEffect(() => {
    if (cursor >= VISION_SCRIPT.length && !completedRef.current) {
      completedRef.current = true
      onComplete?.()
    }
  }, [cursor, onComplete])

  // Sync history with every agent turn up through the current cursor.
  // The current cursor's agent turn streams (if it has text); earlier turns
  // are added (or marked) as fully rendered. This keeps the conversation
  // consistent under both natural advancement and Shift+Right skips, where
  // multiple cursor increments may batch into a single useEffect run.
  useEffect(() => {
    setHistory((h) => {
      let next = [...h]
      for (let i = 0; i <= cursor && i < VISION_SCRIPT.length; i++) {
        const turn = VISION_SCRIPT[i]
        if (!turn || turn.type !== 'agent') continue
        if (next.some((m) => m.id === turn.id)) continue
        const hasText = !!turn.text
        const isCurrent = i === cursor
        next.push({
          kind: 'agent',
          id: turn.id,
          text: turn.text || '',
          streaming: hasText && isCurrent,
        })
      }
      // Any earlier agent turn that's still flagged as streaming should settle.
      next = next.map((m) => {
        if (m.kind !== 'agent' || !m.streaming) return m
        const idx = VISION_SCRIPT.findIndex((t) => t.id === m.id)
        return idx < cursor ? { ...m, streaming: false } : m
      })
      return next
    })
  }, [cursor])

  // For media-only agent turns (no text), there's no stream onDone to fire,
  // so schedule the advance directly. Media-gated turns still wait for the
  // media's onComplete.
  useEffect(() => {
    const turn = VISION_SCRIPT[cursor]
    if (!turn || turn.type !== 'agent') return
    if (turn.text) return
    if (turn.gateOnMedia) return
    const wait = turn.advanceAfter ?? 0
    const t = setTimeout(() => {
      setCursor((c) => (VISION_SCRIPT[c]?.id === turn.id ? c + 1 : c))
    }, wait)
    return () => clearTimeout(t)
  }, [cursor])

  // After every cursor advance, snap to the bottom across multiple settle
  // points. A media-bearing turn (Sword card, provider search, confirmation,
  // coverage card) often goes through two commits — the cursor advance + the
  // history-sync effect — and a single rAF can land between them. The rAF
  // catches the first paint, the setTimeout catches anything that finished
  // settling shortly after (image decode, motion entry, etc.).
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

  // Auto-scroll: a ResizeObserver on the inner content fires *only* when the
  // content's actual height changes (mid-stream char append, thinking line
  // crossfade, new card landing). No polling, no time-based pause, so it
  // can't collide with wheel/touch momentum. The `stick` flag tracks whether
  // the user is reading near the bottom; if they've scrolled away, we leave
  // their scroll position alone until they return.
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

    // Observe both the inner content (grows mid-stream) AND the scroll
    // container itself (shrinks when chips/composer expand below it). The
    // second case is what was hiding the tail of an agent message behind
    // the newly appeared chips.
    const ro = new ResizeObserver(() => {
      if (stick) el.scrollTop = el.scrollHeight
    })
    ro.observe(inner)
    ro.observe(el)

    // Anchor the initial position at the bottom.
    el.scrollTop = el.scrollHeight

    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', onScroll)
    }
  }, [])

  const onAgentDone = useCallback((id) => {
    setHistory((h) => h.map((m) => (m.id === id ? { ...m, streaming: false } : m)))
    const turn = VISION_SCRIPT.find((t) => t.id === id)
    // Turns gated on media (e.g. video) wait for the media to finish before advancing.
    if (turn?.gateOnMedia) return
    const wait = turn?.advanceAfter ?? 0
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    advanceTimer.current = setTimeout(() => {
      setCursor((c) => (VISION_SCRIPT[c]?.id === id ? c + 1 : c))
    }, wait)
  }, [])

  const onMediaDone = useCallback((id) => {
    setCursor((c) => (VISION_SCRIPT[c]?.id === id ? c + 1 : c))
  }, [])

  const onThinkingDone = useCallback((id) => {
    setCursor((c) => (VISION_SCRIPT[c]?.id === id ? c + 1 : c))
  }, [])

  const onUserSubmit = useCallback(
    (text) => {
      const turn = VISION_SCRIPT[cursor]
      if (!turn) return
      if (turn.type !== 'input' && turn.type !== 'dependentPicker') return
      setHistory((h) => [
        ...h,
        { kind: 'user', id: `${turn.id}-u-${Date.now()}`, text },
      ])
      setCursor((c) => c + 1)
    },
    [cursor]
  )

  // Dev hotkey: Shift+Right to skip ahead
  useEffect(() => {
    const onKey = (e) => {
      if (e.shiftKey && e.key === 'ArrowRight') {
        e.preventDefault()
        setCursor((c) => Math.min(c + 1, VISION_SCRIPT.length))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
        <div ref={contentRef}>
        {history.map((m) => {
          if (m.kind === 'user') {
            return <UserMessage key={m.id} text={m.text} />
          }
          const turn = VISION_SCRIPT.find((t) => t.id === m.id)
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

        {currentTurn?.type === 'dependentPicker' && (
          <DependentPicker
            key={currentTurn.id}
            options={currentTurn.options}
            onSelect={(opt) => onUserSubmit(opt.name)}
          />
        )}
        </div>
      </div>

      {/* The composer is always visible. When the cursor is on a non-input
          turn (agent streaming, thinking, etc.), chips/autoType/onSubmit are
          undefined so the composer stays inert until the next input turn. */}
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

// Build the media React element for an agent turn based on the script's media spec.
function renderMedia(turn, isCurrent, onMediaDone) {
  const { media } = turn
  if (!media) return null
  switch (media.kind) {
    case 'video':
      return (
        <VideoPlayer
          title={media.title}
          duration={media.duration}
          onComplete={
            isCurrent && turn.gateOnMedia ? () => onMediaDone(turn.id) : undefined
          }
        />
      )
    case 'sword':
      return <SwordPreviewCard />
    case 'coverage':
      return <CoverageCard />
    case 'providerSearch':
      return (
        <ProviderSearch
          providers={media.variant === 'weekend' ? PROVIDERS_WEEKEND : PROVIDERS_ALL}
        />
      )
    case 'confirmation':
      if (media.variant === 'pt') return <ConfirmationCard {...PT_BOOKING} />
      if (media.variant === 'colonoscopy') return <ConfirmationCard {...COLONOSCOPY_BOOKING} />
      return null
    default:
      return null
  }
}
