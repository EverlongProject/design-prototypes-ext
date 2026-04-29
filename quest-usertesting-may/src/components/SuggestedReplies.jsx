import { useState, useRef, useEffect } from 'react'
import { Plus, ArrowUp } from 'lucide-react'

const TYPING_BASE_MS = 35
const TYPING_JITTER = 25
const TYPING_PAUSE_PUNCT = 240

export default function SuggestedReplies({ chips = [], autoType = null, onSubmit }) {
  const [draft, setDraft] = useState('')
  const [isAutoTyping, setIsAutoTyping] = useState(false)
  const [autoTypeTriggered, setAutoTypeTriggered] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`
  }, [draft])

  useEffect(() => {
    if (!autoType || !autoTypeTriggered) return
    let cancelled = false
    let timers = []

    setIsAutoTyping(true)
    textareaRef.current?.focus()

    const text = autoType.text
    let i = 0

    const typeNext = () => {
      if (cancelled) return
      if (i >= text.length) {
        const settle = setTimeout(() => {
          if (cancelled) return
          setIsAutoTyping(false)
        }, 250)
        timers.push(settle)
        return
      }
      const ch = text[i]
      i += 1
      setDraft(text.slice(0, i))

      let nextDelay = TYPING_BASE_MS + Math.random() * TYPING_JITTER
      if (ch === ',' || ch === '.') nextDelay += TYPING_PAUSE_PUNCT

      const t = setTimeout(typeNext, nextDelay)
      timers.push(t)
    }

    const start = setTimeout(typeNext, 250)
    timers.push(start)

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoType, autoTypeTriggered])

  const triggerAutoType = () => {
    if (autoType && !autoTypeTriggered) setAutoTypeTriggered(true)
  }

  const handleSubmit = (e) => {
    e?.preventDefault?.()
    const text = draft.trim()
    if (!text || isAutoTyping || !onSubmit) return
    setDraft('')
    onSubmit(text)
  }

  const handleKeyDown = (e) => {
    if (isAutoTyping) {
      e.preventDefault()
      return
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleChip = (chip) => {
    if (chip.triggersAutoType && autoType) {
      if (!autoTypeTriggered) triggerAutoType()
      return
    }
    onSubmit?.(chip.label)
  }

  return (
    <div className="px-4 pb-4 pt-2">
      {chips.length > 0 && (
        <div className="flex flex-col items-start gap-2 mb-3">
          {chips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChip(chip)}
              className={`max-w-full text-left px-3.5 py-2 rounded-full font-sans text-[13px] leading-snug transition-colors ${
                chip.primary
                  ? 'bg-quest-primary-dark text-white hover:bg-quest-primary-deepest border border-quest-primary-dark'
                  : 'bg-white text-quest-primary-dark border border-quest-primary-dark hover:bg-quest-primary-pastel'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-border focus-within:border-quest-primary transition-colors">
          <button
            type="button"
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-ink-subdued shrink-0 hover:border-quest-primary"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={triggerAutoType}
              onClick={triggerAutoType}
              placeholder={isAutoTyping ? '' : 'Ask me anything'}
              readOnly={isAutoTyping}
              className="w-full block bg-transparent outline-none font-sans text-body-2 text-ink placeholder:text-ink-subdued resize-none leading-tight max-h-40"
            />
          </div>
          <button
            type="submit"
            aria-label="Send"
            disabled={!draft.trim() || isAutoTyping || !onSubmit}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
              draft.trim() && !isAutoTyping && onSubmit
                ? 'bg-quest-primary text-white hover:bg-quest-primary-dark'
                : 'bg-quest-primary/30 text-white cursor-default'
            }`}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-[11px] text-ink-subdued mt-2 font-sans">
          AI can make mistakes. Please verify.
        </p>
      </form>
    </div>
  )
}
