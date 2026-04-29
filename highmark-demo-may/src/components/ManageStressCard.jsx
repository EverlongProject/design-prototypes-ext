import { Check } from 'lucide-react'

// B-flow detail card for the Manage Stress Health Journey goal. Mirrors the
// SpringHealthCard pattern — bullets, cost row, primary CTA. The CTA is an
// in-app action (no external link) so onComplete advances the conversation.

export default function ManageStressCard({ onComplete }) {
  return (
    <div className="bg-white rounded-lg border border-border shadow-card overflow-hidden">
      <div className="aspect-[16/9] bg-gradient-to-br from-highmark-primary to-highmark-primary-dark flex items-center justify-center">
        <span className="font-heading text-[28px] font-semibold text-white tracking-tight">
          Manage Stress
        </span>
      </div>

      <div className="px-5 pt-4 pb-3">
        <p className="font-heading text-subtitle-1 font-semibold text-ink leading-tight">
          Manage Stress
        </p>
      </div>

      <div className="px-5 pb-4 space-y-2.5">
        <Bullet>4-week guided goal track</Bullet>
        <Bullet>Daily 10-minute exercises</Bullet>
        <Bullet>Weekly reflections and check-ins</Bullet>
      </div>

      <div className="px-5 pb-2 flex items-baseline justify-between border-t border-border pt-3">
        <span className="font-sans text-body-2 text-ink-subdued">Your cost</span>
        <span className="font-heading text-subtitle-1 font-semibold text-ink">
          Free with your plan
        </span>
      </div>

      <div className="px-5 py-4">
        <button
          type="button"
          onClick={() => onComplete?.()}
          className="w-full h-11 rounded-full bg-highmark-primary text-white font-sans text-button-2 font-semibold hover:bg-highmark-primary-dark transition-colors"
        >
          Add to my journey
        </button>
      </div>
    </div>
  )
}

function Bullet({ children }) {
  return (
    <div className="flex items-start gap-2">
      <Check className="w-4 h-4 text-highmark-primary shrink-0 mt-0.5" />
      <p className="font-sans text-body-2 text-ink leading-snug">{children}</p>
    </div>
  )
}
