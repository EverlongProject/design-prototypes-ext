import { Smartphone, Home, Calendar } from 'lucide-react'
import SwordComparisonTable from './SwordComparisonTable.jsx'

// Static Sword preview card. Branded hero image, three what-you-get bullets,
// and (optionally) the Sword vs in-person cost comparison strip.
//
// Props:
//   label — heading shown above the bullets. Defaults to "Sword Health"
//     (P1 Beat 8). P2 Beat 6 passes "Sword Thrive" instead.
//   showTable — when false, the cost comparison strip is omitted. P1 Beat 8
//     hides it on the card so the script can surface the same table after
//     additional copy via the `swordCompare` media kind. Defaults to true.
//   ctaHref — optional. When set, a "Get started" CTA renders below the
//     comparison strip as an <a target="_blank" rel="noopener noreferrer">
//     wrapping a button. Used by P2 to hand off to the Sword login page.
//     The anchor's onClick fires onComplete so the conversation advances
//     after the user gesture, without preventing the new-tab navigation.
//   onComplete — fires when the user taps Get started.

export default function SwordPreviewCard({
  label = 'Sword Health',
  showTable = true,
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

          {showTable && <SwordComparisonTable />}

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
