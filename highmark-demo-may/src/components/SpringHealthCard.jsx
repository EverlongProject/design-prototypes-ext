import { Check } from 'lucide-react'

// Beat 5 detail card. The "Get started" CTA is a real <a target="_blank">
// wrapping a styled button — programmatic window.open() would be eaten by
// production popup blockers. The anchor's onClick fires onComplete so the
// conversation advances after the user gesture; we don't preventDefault, so
// the browser still navigates the new tab.

export default function SpringHealthCard({ onComplete }) {
  return (
    <div className="bg-white rounded-lg border border-border shadow-card overflow-hidden">
      <div className="aspect-[16/9] bg-gradient-to-br from-[#1F8F5C] to-[#29B473] flex items-center justify-center">
        <span className="font-heading text-[28px] font-semibold text-white tracking-tight">
          spring health
        </span>
      </div>

      <div className="px-5 pt-4 pb-3">
        <p className="font-heading text-subtitle-1 font-semibold text-ink leading-tight">
          Spring Health
        </p>
      </div>

      <div className="px-5 pb-4 space-y-2.5">
        <Bullet>Up to 8 therapy sessions per year</Bullet>
        <Bullet>Coaching, meditation, and self-guided exercises included</Bullet>
        <Bullet>Match with a therapist or coach in 48 hours</Bullet>
      </div>

      <div className="px-5 pb-2 flex items-baseline justify-between border-t border-border pt-3">
        <span className="font-sans text-body-2 text-ink-subdued">Your cost</span>
        <span className="font-heading text-subtitle-1 font-semibold text-ink">
          $0 with your plan
        </span>
      </div>

      <div className="px-5 py-4">
        <a
          href="https://care.springhealth.com/sign_in"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onComplete?.()}
          className="block"
        >
          <button
            type="button"
            className="w-full h-11 rounded-full bg-highmark-primary text-white font-sans text-button-2 font-semibold hover:bg-highmark-primary-dark transition-colors"
          >
            Get started
          </button>
        </a>
      </div>
    </div>
  )
}

function Bullet({ children }) {
  return (
    <div className="flex items-start gap-2">
      <Check className="w-4 h-4 text-[#1F8F5C] shrink-0 mt-0.5" />
      <p className="font-sans text-body-2 text-ink leading-snug">{children}</p>
    </div>
  )
}
