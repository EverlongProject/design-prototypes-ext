import { Smartphone, Home, Calendar } from 'lucide-react'

// Static Sword preview card. Phone mockup with motion-track overlay,
// three what-you-get bullets, and a cost comparison strip.
//
// Props:
//   label — heading shown above the bullets. Defaults to "Sword Health"
//     (P1 Beat 8). P2 Beat 6 passes "Sword Thrive" instead.
//   ctaHref — optional. When set, a "Get started" CTA renders below the
//     comparison strip as an <a target="_blank" rel="noopener noreferrer">
//     wrapping a button. Used by P2 to hand off to the Sword login page.
//     The anchor's onClick fires onComplete so the conversation advances
//     after the user gesture, without preventing the new-tab navigation.
//   onComplete — fires when the user taps Get started.

export default function SwordPreviewCard({
  label = 'Sword Health',
  ctaHref,
  onComplete,
}) {
  return (
    <div className="w-full max-w-[340px] rounded-lg overflow-hidden border border-border shadow-card bg-white">
      <img
        src={`${import.meta.env.BASE_URL}assets/Sword-Card.png`}
        alt=""
        className="w-full aspect-[16/9] object-cover"
      />

        <div className="px-4 py-3">
          <h3 className="font-heading text-[16px] font-semibold text-ink mb-3">{label}</h3>

          <ul className="space-y-2 mb-3">
            <Bullet icon={<Smartphone className="w-3.5 h-3.5" />} text="Real PT, guided sessions on your phone" />
            <Bullet icon={<Home className="w-3.5 h-3.5" />} text="From home, on your schedule" />
            <Bullet icon={<Calendar className="w-3.5 h-3.5" />} text="Most members improve in 2–3 weeks" />
          </ul>

          <div className="rounded-md border border-border overflow-hidden text-[14px] font-sans">
            <div className="grid grid-cols-3 bg-surface-secondary text-ink-subdued font-semibold">
              <div className="px-2 py-1.5" />
              <div className="px-2 py-1.5 text-center">Sword</div>
              <div className="px-2 py-1.5 text-center">In-person</div>
            </div>
            <div className="grid grid-cols-3 border-t border-border">
              <div className="px-2 py-1.5 text-ink-subdued">Cost (6 weeks)</div>
              <div className="px-2 py-1.5 text-center font-semibold text-success">$0</div>
              <div className="px-2 py-1.5 text-center text-ink">~$300</div>
            </div>
            <div className="grid grid-cols-3 border-t border-border">
              <div className="px-2 py-1.5 text-ink-subdued">Where</div>
              <div className="px-2 py-1.5 text-center text-ink">Home</div>
              <div className="px-2 py-1.5 text-center text-ink">Clinic</div>
            </div>
          </div>

          {ctaHref && (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onComplete?.()}
              className="block mt-4"
            >
              <button
                type="button"
                className="w-full h-11 rounded-full bg-highmark-primary text-white font-sans text-button-2 font-semibold hover:bg-highmark-primary-dark transition-colors"
              >
                Get started
              </button>
            </a>
          )}
        </div>
    </div>
  )
}

function Bullet({ icon, text }) {
  return (
    <li className="flex items-center gap-2 text-[15px] text-ink font-sans leading-snug">
      <span className="w-6 h-6 rounded-full bg-highmark-primary-pastel text-highmark-primary flex items-center justify-center shrink-0">
        {icon}
      </span>
      <span>{text}</span>
    </li>
  )
}
