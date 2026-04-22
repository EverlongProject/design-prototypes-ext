import { Mic, Plus } from 'lucide-react'
import ChatHeader from '../components/ChatHeader.jsx'
import ChatBubble from '../components/ChatBubble.jsx'
import Chip from '../components/Chip.jsx'
import StatusLine from '../components/StatusLine.jsx'
import PrimaryCTA from '../components/PrimaryCTA.jsx'
import CoverageComparison from '../components/CoverageComparison.jsx'

export default function ChatView({
  messages = [],
  chips = [],
  coverageComparison,
  statusLines = [],
  revealedCount = 0,
  resolve,
  showResolve = false
}) {
  return (
    <div className="h-full w-full flex flex-col bg-bg-alt">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {messages.map((m, i) => (
          <ChatBubble key={i} from={m.from}>{m.text}</ChatBubble>
        ))}

        {coverageComparison && (
          <div className="my-3">
            <CoverageComparison
              current={coverageComparison.current}
              recommended={coverageComparison.recommended}
            />
          </div>
        )}

        {statusLines.length > 0 && (
          <div className="bg-[#F5F5F5] border border-stroke rounded-2xl p-3 my-3 shadow-card">
            {statusLines.slice(0, revealedCount).map((line, i) => (
              <StatusLine key={i}>{line}</StatusLine>
            ))}
          </div>
        )}

        {showResolve && resolve && (
          <div className="bg-white border border-manulife-green rounded-2xl p-4 my-3 shadow-card">
            <div className="w-10 h-10 rounded-full bg-manulife-green-light text-manulife-green flex items-center justify-center mb-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-ink font-semibold text-base leading-snug mb-1">
              {resolve.heading}
            </div>
            <div className="text-ink-soft text-sm leading-snug mb-4">
              {resolve.subheading}
            </div>
            <PrimaryCTA>{resolve.cta?.replace(/\s*→\s*$/, '') || 'Activate'}</PrimaryCTA>
          </div>
        )}
      </div>

      {chips.length > 0 && (
        <div className="px-4 pt-2 pb-1 flex gap-2 flex-wrap">
          {chips.map((c, i) => (
            <Chip key={i} label={c.label} primary={c.primary} />
          ))}
        </div>
      )}

      <div className="px-4 py-3 pb-safe bg-bg-alt">
        <div className="flex items-center gap-2 bg-white border border-stroke rounded-full px-3 py-2">
          <Plus size={18} className="text-ink-soft" />
          <div className="flex-1 text-ink-soft text-sm">Message</div>
          <Mic size={18} className="text-ink-soft" />
        </div>
      </div>
    </div>
  )
}
