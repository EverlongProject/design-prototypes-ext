import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mic, Plus, Check, Camera, ChevronRight, Target, Sparkles } from 'lucide-react'
import ChatHeader from '../components/ChatHeader.jsx'
import ChatBubble from '../components/ChatBubble.jsx'
import Chip from '../components/Chip.jsx'
import StatusLine from '../components/StatusLine.jsx'
import PrimaryCTA from '../components/PrimaryCTA.jsx'
import CoverageComparison from '../components/CoverageComparison.jsx'
import UnlockTile from '../components/UnlockTile.jsx'
import StreamingText from '../components/StreamingText.jsx'
import AppointmentCard from '../components/AppointmentCard.jsx'
import InlineTag from '../components/InlineTag.jsx'
import CameraModal from '../components/CameraModal.jsx'
import CholesterolResults from '../components/CholesterolResults.jsx'
import ActionCard from '../components/ActionCard.jsx'
import MemberCard from '../components/MemberCard.jsx'
import CoverageUsageCard from '../components/CoverageUsageCard.jsx'
import MemberTimeline from '../components/MemberTimeline.jsx'
import ApprovedCoverageCard from '../components/ApprovedCoverageCard.jsx'

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

export default function ChatFlow({ script = [], onDone }) {
  const [cursor, setCursor] = useState(0)
  const [blocks, setBlocks] = useState([])
  const [chips, setChips] = useState(null)
  const [activatedBlockIds, setActivatedBlockIds] = useState([])
  const [cameraOpen, setCameraOpen] = useState(false)
  const [pendingCameraAsset, setPendingCameraAsset] = useState(null)
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

    if (current.kind === 'appointmentCard') {
      addBlock({ id, kind: 'appointmentCard', data: current.data, onTap: current.onTap })
      return
    }

    if (current.kind === 'cholesterolResults') {
      addBlock({ id, kind: 'cholesterolResults' })
      const t = setTimeout(advance, 1800)
      return () => clearTimeout(t)
    }

    if (current.kind === 'actionCards') {
      addBlock({ id, kind: 'actionCards', items: current.items, primaryIndex: current.primaryIndex ?? 0 })
      return
    }

    if (current.kind === 'goalAddedTag') {
      addBlock({ id, kind: 'inlineTag', label: 'Goal Added' })
      const t = setTimeout(advance, 500)
      return () => clearTimeout(t)
    }

    if (current.kind === 'activityCompletedTag') {
      addBlock({ id, kind: 'inlineTag', label: 'Activity Completed' })
      const t = setTimeout(advance, 500)
      return () => clearTimeout(t)
    }


    if (current.kind === 'goalCard') {
      addBlock({ id, kind: 'goalCard', title: current.title, subtitle: current.subtitle })
      return
    }

    if (current.kind === 'photoCaptureCard') {
      addBlock({ id, kind: 'photoCaptureCard', asset: current.asset })
      return
    }

    if (current.kind === 'memberCard') {
      addBlock({ id, kind: 'memberCard', name: current.name, memberSince: current.memberSince })
      const t = setTimeout(advance, 350)
      return () => clearTimeout(t)
    }

    if (current.kind === 'coverageUsage') {
      addBlock({ id, kind: 'coverageUsage', items: current.items })
      const t = setTimeout(advance, 450)
      return () => clearTimeout(t)
    }

    if (current.kind === 'memberTimeline') {
      addBlock({ id, kind: 'memberTimeline', heading: current.heading, entries: current.entries })
      const perEntry = 700
      const totalMs = current.entries.length * perEntry + 400
      const t = setTimeout(advance, totalMs)
      return () => clearTimeout(t)
    }

    if (current.kind === 'approvedCoverage') {
      addBlock({ id, kind: 'approvedCoverage' })
      const t = setTimeout(advance, 450)
      return () => clearTimeout(t)
    }

    if (current.kind === 'mealSummary') {
      addBlock({ id, kind: 'mealSummary', title: current.title, nutrition: current.nutrition, tag: current.tag })
      const t = setTimeout(advance, 400)
      return () => clearTimeout(t)
    }

    if (current.kind === 'photoMessage') {
      addBlock({ id, kind: 'photoMessage', asset: current.asset })
      const t = setTimeout(advance, 350)
      return () => clearTimeout(t)
    }

    if (current.kind === 'done') {
      onDone?.()
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
            case 'appointmentCard':
              return (
                <motion.button
                  key={block.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => { e.stopPropagation(); if (block.id === cursor) advance() }}
                  className="w-full text-left"
                >
                  <AppointmentCard {...block.data} />
                </motion.button>
              )
            case 'cholesterolResults':
              return (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CholesterolResults />
                </motion.div>
              )
            case 'actionCards':
              return (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="my-2 space-y-2"
                >
                  {block.items.map((item, i) => {
                    const isActive = block.id === cursor
                    return (
                      <ActionCard
                        key={i}
                        title={item.title}
                        subtitle={item.subtitle}
                        ctaLabel={item.ctaLabel}
                        ctaEnabled={isActive}
                        onCta={isActive ? advance : undefined}
                      />
                    )
                  })}
                </motion.div>
              )
            case 'memberCard':
              return <MemberCard key={block.id} name={block.name} memberSince={block.memberSince} />
            case 'coverageUsage':
              return (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="my-1 space-y-2"
                >
                  {block.items.map((item, i) => (
                    <CoverageUsageCard key={i} {...item} />
                  ))}
                </motion.div>
              )
            case 'memberTimeline':
              return (
                <MemberTimeline key={block.id} heading={block.heading} entries={block.entries} />
              )
            case 'approvedCoverage':
              return (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ApprovedCoverageCard />
                </motion.div>
              )
            case 'mealSummary':
              return (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="my-2"
                >
                  <div className="text-ink font-bold text-[15px] leading-snug">{block.title}</div>
                  <div className="text-ink-soft text-[13px] leading-snug mt-1">{block.nutrition}</div>
                  {block.tag && (
                    <div className="mt-2 inline-flex items-center gap-1.5 bg-[#FFF4CC] text-[#6B5300] rounded-full pl-2 pr-3 py-1">
                      <Sparkles size={12} strokeWidth={2.5} />
                      <span className="text-[12px] font-semibold">{block.tag}</span>
                    </div>
                  )}
                </motion.div>
              )
            case 'inlineTag':
              return <InlineTag key={block.id} label={block.label} />
            case 'goalCard':
              return (
                <motion.button
                  key={block.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => { e.stopPropagation(); if (block.id === cursor) advance() }}
                  className="my-2 w-full text-left bg-white border border-stroke rounded-lg p-4 flex items-center gap-3 active:bg-gray-50"
                >
                  <div className="w-10 h-10 rounded-lg bg-manulife-green-light text-manulife-green flex items-center justify-center shrink-0">
                    <Target size={20} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-ink font-semibold text-[15px] leading-tight">{block.title}</div>
                    {block.subtitle && <div className="text-ink-soft text-[12px] leading-snug mt-0.5">{block.subtitle}</div>}
                  </div>
                  <ChevronRight size={18} className="text-ink-soft shrink-0" />
                </motion.button>
              )
            case 'photoCaptureCard':
              return (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="my-2 bg-gray-50 border border-stroke rounded-lg p-3"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-purple-200 text-purple-700 flex items-center justify-center shrink-0">
                      <Camera size={22} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-ink font-bold text-[15px] leading-tight">Log your dinner</div>
                      <div className="text-ink-soft text-[13px] leading-tight mt-0.5">Manage Cholesterol</div>
                    </div>
                  </div>
                  {!block.taken && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (block.id !== cursor) return
                        setPendingCameraAsset(block.asset)
                        setCameraOpen(true)
                      }}
                      className="w-full bg-manulife-green text-white rounded-full py-2.5 font-semibold text-[14px] active:opacity-80"
                    >
                      Take a photo
                    </button>
                  )}
                </motion.div>
              )
            case 'photoMessage':
              return (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="my-2 self-end max-w-[75%]"
                >
                  <img
                    src={block.asset}
                    alt="Meal"
                    className="w-full rounded-2xl"
                  />
                </motion.div>
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

      <CameraModal
        open={cameraOpen}
        imageSrc={pendingCameraAsset}
        onCapture={() => {
          setCameraOpen(false)
          setBlocks((b) => b.map((x) => x.kind === 'photoCaptureCard' ? { ...x, taken: true } : x))
          advance()
        }}
        onClose={() => setCameraOpen(false)}
      />

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
