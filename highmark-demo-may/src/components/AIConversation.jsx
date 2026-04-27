import { useState, useRef, useEffect } from 'react'
import { Plus, ArrowUp } from 'lucide-react'
import ChatBubble from './ChatBubble.jsx'
import StreamingText from './StreamingText.jsx'

const INITIAL_AI = `Hi Jessica — looks like you're here to schedule your colonoscopy. I can help you find an in-network gastroenterologist near you, walk through what's covered, and book a time that fits your calendar. Want me to start with a few options nearby?`

export default function AIConversation() {
  const [messages, setMessages] = useState([
    { id: 'm1', from: 'ai', text: INITIAL_AI, streaming: true }
  ])
  const [draft, setDraft] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`
  }, [draft])

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((m) => [...m, { id: `u-${Date.now()}`, from: 'user', text }])
    setDraft('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const onStreamDone = (id) => {
    setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, streaming: false } : msg)))
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} from={msg.from}>
            {msg.from === 'ai' && msg.streaming ? (
              <StreamingText text={msg.text} onDone={() => onStreamDone(msg.id)} />
            ) : (
              msg.text
            )}
          </ChatBubble>
        ))}
      </div>

      <div className="px-4 pb-4 pt-2">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-2 bg-white rounded-lg px-3 py-2.5 border border-border focus-within:border-highmark-primary transition-colors">
            <button
              type="button"
              className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-ink-subdued shrink-0 hover:border-highmark-primary"
            >
              <Plus className="w-4 h-4" />
            </button>
            <textarea
              ref={textareaRef}
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything"
              className="flex-1 bg-transparent outline-none font-sans text-body-2 text-ink placeholder:text-ink-subdued py-1 resize-none leading-relaxed max-h-40"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!draft.trim()}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                draft.trim()
                  ? 'bg-highmark-primary text-white hover:bg-highmark-primary-dark'
                  : 'bg-highmark-primary/30 text-white cursor-default'
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
    </div>
  )
}
