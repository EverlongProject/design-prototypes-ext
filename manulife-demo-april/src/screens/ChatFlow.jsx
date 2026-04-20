import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mic, Plus, Check } from 'lucide-react'
import ChatHeader from '../components/ChatHeader.jsx'
import ChatBubble from '../components/ChatBubble.jsx'
import Chip from '../components/Chip.jsx'
import StatusLine from '../components/StatusLine.jsx'
import PrimaryCTA from '../components/PrimaryCTA.jsx'
import CoverageComparison from '../components/CoverageComparison.jsx'
import UnlockTile from '../components/UnlockTile.jsx'
import StreamingText from '../components/StreamingText.jsx'

function ThinkingInline({ lines, totalMs, onDone }) {
  const [idx, setIdx] = useState(0)
  const perLine = totalMs / lines.length

  useEffect(() => {
    const t = setTimeout(() => {
      if (idx < lines.length - 1) setIdx(idx + 1)
      else onDone?.()
    }, perLine)
    return () => clearTimeout(t)
  }, [idx, lines.length, perLine])

  return (
    <div className="my-2 min-h-[28px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <StatusLine>{lines[idx]}</StatusLine>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function ResolveBlock({ heading, subheading, cta, activated, onActivate }) {
  return (
    <div className="my-2">
      <div className="text-ink text-[15px] leading-snug mb-1">{heading}</div>
      <div className="text-ink text-[15px] leading-snug mb-1">{subheading.split('\n')[0]}</div>
      {subheading.includes('\n') && (
        <div className="text-ink text-[15px] leading-snug">{subheading.split('\n').slice(1).join('\n')}</div>
      )}
      {!activated && (
        <button
          onClick={(e) => { e.stopPropagation(); onActivate?.() }}
          className="w-full mt-3"
        >
          <PrimaryCTA>{cta?.replace(/\s*→\s*$/, '') || 'Activate'}</PrimaryCTA>
        </button>
      )}
    </div>
  )
}

function PolicyTag() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
      className="my-2 flex items-center gap-1.5 self-start bg-manulife-green-light text-manulife-green rounded-full pl-1 pr-2.5 py-1 w-fit"
    >
      <div className="w-4 h-4 rounded-full bg-manulife-green text-white flex items-center justify-center">
        <Check size={11} strokeWidth={3} />
      </div>
      <span className="text-xs font-semibold">Policy Activated</span>
    </motion.div>
  )
}

function ConfirmationCard({ heading, subheading, tiles = [], primary }) {
  return (
    <div className="bg-gray-100 rounded-2xl p-4 my-2">
      <div className="text-ink font-bold text-lg leading-snug text-center mb-1">{heading}</div>
      <div className="text-ink text-sm leading-snug text-center mb-4">{subheading}</div>
      <div className="space-y-2 mb-3">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.key}
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1, ease: 'easeOut' }}
          >
            <UnlockTile title={tile.title} subtitle={tile.subtitle} asset={tile.asset} />
          </motion.div>
        ))}
      </div>
      {primary && <PrimaryCTA>{primary.replace(/\s*→\s*$/, '')}</PrimaryCTA>}
    </div>
  )
}

export default function ChatFlow({ script = [] }) {
  const [cursor, setCursor] = useState(0)
  const [blocks, setBlocks] = useState([])
  const [chips, setChips] = useState(null)
  const [activatedBlockIds, setActivatedBlockIds] = useState([])
  const scrollRef = useRef(null)

  const current = script[cursor]
  const advance = () => setCursor((c) => c + 1)

  useEffect(() => {
    if (!current) return
    const id = cursor
    const addBlock = (block) =>
      setBlocks((b) => (b.some((x) => x.id === id) ? b : [...b, block]))

    if (current.kind === 'stream') {
      addBlock({ id, kind: 'stream', text: current.text })
      return
    }

    if (current.kind === 'userBubble') {
      addBlock({ id, kind: 'user', text: current.text })
      const t = setTimeout(advance, 250)
      return () => clearTimeout(t)
    }

    if (current.kind === 'coverage') {
      addBlock({ id, kind: 'coverage', data: current.data })
      const t = setTimeout(advance, 350)
      return () => clearTimeout(t)
    }

    if (current.kind === 'chips') {
      setChips(current.items)
      return
    }

    if (current.kind === 'thinking') {
      addBlock({ id, kind: 'thinking', lines: current.lines, totalMs: current.totalMs })
      return
    }

    if (current.kind === 'resolve') {
      addBlock({ id, kind: 'resolve', heading: current.heading, subheading: current.subheading, cta: current.cta })
      return
    }

    if (current.kind === 'policyTag') {
      addBlock({ id, kind: 'policyTag' })
      const t = setTimeout(advance, 400)
      return () => clearTimeout(t)
    }

    if (current.kind === 'confirmation') {
      addBlock({ id, kind: 'confirmation', ...current })
      return
    }
  }, [cursor])

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
      })
    }
  }, [blocks, chips])

  const handleChipTap = () => {
    setChips(null)
    advance()
  }

  const handleActivate = () => {
    setActivatedBlockIds((ids) => [...ids, cursor])
    advance()
  }

  const handleThinkingDone = (blockId) => {
    setBlocks((b) => b.filter((x) => x.id !== blockId))
    advance()
  }

  return (
    <div className="h-full w-full flex flex-col bg-bg-alt">
      <ChatHeader />

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col">
        {blocks.map((block) => {
          switch (block.kind) {
            case 'stream':
              return (
                <ChatBubble key={block.id} from="manny">
                  {block.id === cursor
                    ? <StreamingText text={block.text} onDone={advance} />
                    : block.text}
                </ChatBubble>
              )
            case 'user':
              return <ChatBubble key={block.id} from="user">{block.text}</ChatBubble>
            case 'coverage':
              return (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="my-2"
                >
                  <CoverageComparison current={block.data.current} recommended={block.data.recommended} />
                </motion.div>
              )
            case 'thinking':
              return (
                <ThinkingInline
                  key={block.id}
                  lines={block.lines}
                  totalMs={block.totalMs}
                  onDone={block.id === cursor ? () => handleThinkingDone(block.id) : undefined}
                />
              )
            case 'resolve':
              return (
                <ResolveBlock
                  key={block.id}
                  heading={block.heading}
                  subheading={block.subheading}
                  cta={block.cta}
                  activated={activatedBlockIds.includes(block.id)}
                  onActivate={block.id === cursor ? handleActivate : undefined}
                />
              )
            case 'policyTag':
              return <PolicyTag key={block.id} />
            case 'confirmation':
              return (
                <ConfirmationCard
                  key={block.id}
                  heading={block.heading}
                  subheading={block.subheading}
                  tiles={block.tiles}
                  primary={block.primary}
                />
              )
            default:
              return null
          }
        })}
      </div>

      {chips && (
        <div
          className="px-4 pt-2 pb-1 flex gap-2 flex-wrap"
          onClick={handleChipTap}
        >
          {chips.map((c, i) => (
            <Chip key={i} label={c.label} primary={c.primary} />
          ))}
        </div>
      )}

      <div
        className="px-4 pt-3 bg-bg-alt"
        style={{ paddingBottom: 'calc(32px + env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center gap-2 bg-white border border-stroke rounded-full px-3 py-2">
          <Plus size={18} className="text-ink-soft" />
          <div className="flex-1 text-ink-soft text-sm">Write a message ...</div>
          <Mic size={18} className="text-ink-soft" />
        </div>
      </div>
    </div>
  )
}
