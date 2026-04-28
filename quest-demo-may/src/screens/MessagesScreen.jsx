// PORT FROM: ../../highmark-demo-may/src/screens/MessagesScreen.jsx
// PURPOSE: iMessage-style thread that Mari taps into from the SMS notification.
//
// CHANGES from Highmark:
//   - Profile pic + sender name = Quest (place a Quest mark in /public/assets/).
//   - Inbound bubble copy:
//       "You're due for your annual wellness screening. 3 weeks left in your
//        screening window. 82% of your team has booked. Tap below to find a
//        spot in under 2 minutes."
//   - Link preview title: "Find your spot — Quest Diagnostics"
//     URL label: "myquest.com"
//   - Behavior matches Highmark: tapping the link preview calls onAdvance.
//
// Stub below renders the iMessage frame. Wire in real copy + assets when porting.
import { motion } from 'framer-motion'
import { Plus, AudioLines, Smile, Video } from 'lucide-react'

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

export default function MessagesScreen({ onAdvance }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-medium">
      <div className="relative min-h-screen flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          className="w-[600px] h-[640px] bg-[#1c1c1e] rounded-xl shadow-[0_40px_120px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden border border-white/10"
        >
          <ConversationHeader />
          <div className="flex-1 px-5 py-4 overflow-hidden flex flex-col gap-2">
            <Timestamp />
            <InboundBubble>
              Your annual Basic Health Profile is due. 3 weeks left in your screening window. HSA-eligible. Tap below to find a spot in under 2 minutes.
            </InboundBubble>
            <LinkPreviewBubble onClick={onAdvance} />
          </div>
          <Composer />
        </motion.div>
      </div>
    </div>
  )
}

function ConversationHeader() {
  return (
    <div className="relative h-14 border-b border-white/5 flex items-center px-3">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-2">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* TODO(claude-code): replace with Quest profile mark. */}
        <div className="w-7 h-7 rounded-full bg-quest-primary" />
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-white text-[12px] font-semibold">Quest</span>
          <svg width="8" height="8" viewBox="0 0 8 8" className="text-white/60">
            <path d="M2 3l2 2 2-2" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded flex items-center justify-center text-white/60 hover:text-white">
        <Video className="w-4 h-4" />
      </button>
    </div>
  )
}

function Timestamp() {
  return (
    <div className="text-center text-[11px] text-white/45 my-2">
      <span className="font-semibold text-white/55">iMessage</span>
      <br />
      Today 2:14 PM
    </div>
  )
}

function InboundBubble({ children }) {
  return (
    <div className="self-start max-w-[420px] bg-[#3a3a3c] text-white text-[14px] rounded-2xl rounded-bl-md px-3.5 py-2 leading-snug">
      {children}
    </div>
  )
}

function LinkPreviewBubble({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="self-start w-[300px] bg-[#3a3a3c] rounded-2xl rounded-bl-md overflow-hidden text-left hover:brightness-110 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
    >
      <div className="h-[140px] bg-gradient-to-br from-quest-primary-pastel to-quest-primary-pastel-light flex items-center justify-center">
        {/* TODO(claude-code): replace with real Quest logo svg. */}
        <span className="text-quest-primary font-heading text-[14px] font-bold">QUEST</span>
      </div>
      <div className="px-3 py-2.5 border-t border-black/30">
        <p className="text-white text-[13px] font-medium leading-tight mb-0.5">
          Find your spot — Quest Diagnostics
        </p>
        <p className="text-white/55 text-[11px]">myquest.com</p>
      </div>
    </button>
  )
}

function Composer() {
  return (
    <div className="border-t border-white/5 px-3 py-2.5 flex items-center gap-2">
      <button className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/60">
        <Plus className="w-3.5 h-3.5" />
      </button>
      <div className="flex-1 h-7 rounded-full border border-white/15 px-3 flex items-center" />
      <button className="w-7 h-7 rounded-full flex items-center justify-center text-white/60">
        <AudioLines className="w-3.5 h-3.5" />
      </button>
      <button className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/70">
        <Smile className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
