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
import ResourceOptionCard from './ResourceOptionCard.jsx'
import SpringHealthCard from './SpringHealthCard.jsx'
import ManageStressCard from './ManageStressCard.jsx'

// Drives a linear conversation script. Renders message history at the top,
// the current input affordance at the bottom.
//
// Props:
//   script — array of turns. Defaults to VISION_SCRIPT for the P1 sidebar.
//   onComplete — fired once when the conversation runs off the end.
//
// In P3 the user's query lives in the side rail title, so we don't echo it
// as a bubble inside the conversation.
//
// Branching:
//   `trail` is the list of turn indices the user has actually visited, in
//   order. The current turn is the last entry. Chips, resourceOption picks,
//   and dependent picks can specify a `gotoId` to jump to a non-sequential
//   turn — when they do, the in-between turns are skipped (not added to
//   history). Without `gotoId`, advancement is +1 from the current turn.
//
// Dev affordance: Shift+Right arrow advances past the current turn.

export default function ChatRunner({
  script = VISION_SCRIPT,
  onComplete,
}) {
  const [trail, setTrail] = useState([0])
  const [history, setHistory] = useState([])
  const completedRef = useRef(false)
  const scrollRef = useRef(null)
  const contentRef = useRef(null)
  const advanceTimer = useRef(null)

  const cursor = trail[trail.length - 1]
  const currentTurn = script[cursor]

  // Resolve a gotoId to a turn index. Falls back to cursor+1 when not found.
  const resolveNext = useCallback(
    (fromIdx, gotoId) => {
      if (!gotoId) return fromIdx + 1
      const idx = script.findIndex((t) => t.id === gotoId)
      return idx >= 0 ? idx : fromIdx + 1
    },
    [script]
  )

  // Push the next turn onto the trail, but only if `fromId` is still the
  // current turn (guards against stale callbacks from unmounted media etc).
  const advanceFrom = useCallback(
    (fromId, gotoId) => {
      setTrail((tr) => {
        const cur = tr[tr.length - 1]
        if (script[cur]?.id !== fromId) return tr
        return [...tr, resolveNext(cur, gotoId)]
      })
    },
    [resolveNext, script]
  )

  // onComplete fires once when the trail walks off the end of the script.
  useEffect(() => {
    if (cursor >= script.length && !completedRef.current) {
      completedRef.current = true
      onComplete?.()
    }
  }, [cursor, onComplete, script.length])

  // History sync — iterate the trail (not 0..cursor) so branches don't pull
  // skipped turns into history. Adds any agent turn we've visited that isn't
  // already in history; flips streaming off for any agent turn that's no
  // longer current (e.g. after a Shift+Right batch).
  useEffect(() => {
    setHistory((h) => {
      let next = [...h]
      trail.forEach((idx, i) => {
        const turn = script[idx]
        if (!turn || turn.type !== 'agent') return
        if (next.some((m) => m.id === turn.id)) return
        const hasText = !!turn.text
        const isLast = i === trail.length - 1
        next.push({
          kind: 'agent',
          id: turn.id,
          text: turn.text || '',
          streaming: hasText && isLast,
        })
      })
      const currentId = script[cursor]?.id
      next = next.map((m) => {
        if (m.kind !== 'agent' || !m.streaming) return m
        return m.id === currentId ? m : { ...m, streaming: false }
      })
      return next
    })
  }, [trail, cursor, script])

  // Media-only agent turns (no text) have no stream onDone, so schedule the
  // advance directly. Media-gated turns wait for the media's onComplete.
  useEffect(() => {
    const turn = script[cursor]
    if (!turn || turn.type !== 'agent') return
    if (turn.text) return
    if (turn.gateOnMedia) return
    const wait = turn.advanceAfter ?? 0
    const t = setTimeout(() => {
      advanceFrom(turn.id)
    }, wait)
    return () => clearTimeout(t)
  }, [cursor, script, advanceFrom])

  // After every cursor advance, snap to the bottom across multiple settle
  // points (rAF + delayed setTimeout) so media-bearing turns and motion
  // entries don't leave the tail occluded behind chips.
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

  // ResizeObserver-driven auto-scroll. Sticks to the bottom only while the
  // user is actually reading at the bottom — if they scroll away we leave
  // them alone until they return.
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

  const onAgentDone = useCallback(
    (id) => {
      setHistory((h) => h.map((m) => (m.id === id ? { ...m, streaming: false } : m)))
      const turn = script.find((t) => t.id === id)
      if (turn?.gateOnMedia) return
      const wait = turn?.advanceAfter ?? 0
      if (advanceTimer.current) clearTimeout(advanceTimer.current)
      advanceTimer.current = setTimeout(() => {
        advanceFrom(id)
      }, wait)
    },
    [advanceFrom, script]
  )

  const onMediaDone = useCallback(
    (id) => {
      advanceFrom(id)
    },
    [advanceFrom]
  )

  const onThinkingDone = useCallback(
    (id) => {
      advanceFrom(id)
    },
    [advanceFrom]
  )

  // Submission from chips (meta = chip object), typed/auto-typed text (no meta),
  // or DependentPicker (meta passed by picker).
  const onUserSubmit = useCallback(
    (text, meta) => {
      const turn = script[cursor]
      if (!turn) return
      if (
        turn.type !== 'input' &&
        turn.type !== 'dependentPicker' &&
        turn.type !== 'resourceOptions'
      )
        return
      setHistory((h) => [
        ...h,
        { kind: 'user', id: `${turn.id}-u-${Date.now()}`, text },
      ])
      setTrail((tr) => {
        const cur = tr[tr.length - 1]
        if (script[cur]?.id !== turn.id) return tr
        return [...tr, resolveNext(cur, meta?.gotoId)]
      })
    },
    [cursor, script, resolveNext]
  )

  // Dev hotkey: Shift+Right to skip ahead.
  useEffect(() => {
    const onKey = (e) => {
      if (e.shiftKey && e.key === 'ArrowRight') {
        e.preventDefault()
        setTrail((tr) => {
          const cur = tr[tr.length - 1]
          if (cur >= script.length) return tr
          return [...tr, cur + 1]
        })
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

          {currentTurn?.type === 'dependentPicker' && (
            <DependentPicker
              key={currentTurn.id}
              options={currentTurn.options}
              onSelect={(opt) => onUserSubmit(opt.name, opt)}
            />
          )}

          {currentTurn?.type === 'resourceOptions' && (
            <div key={currentTurn.id} className="space-y-3 mt-2">
              {currentTurn.options.map((opt) => (
                <ResourceOptionCard
                  key={opt.id}
                  icon={opt.icon}
                  name={opt.name}
                  subtitle={opt.subtitle}
                  description={opt.description}
                  costChip={opt.costChip}
                  onSelect={() => onUserSubmit(opt.name, opt)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* The composer is always visible. When the cursor is on a non-input
          turn, chips/autoType/onSubmit are undefined so the composer stays
          inert. */}
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
    case 'springHealth':
      return (
        <SpringHealthCard
          onComplete={
            isCurrent && turn.gateOnMedia ? () => onMediaDone(turn.id) : undefined
          }
        />
      )
    case 'manageStress':
      return (
        <ManageStressCard
          onComplete={
            isCurrent && turn.gateOnMedia ? () => onMediaDone(turn.id) : undefined
          }
        />
      )
    default:
      return null
  }
}
