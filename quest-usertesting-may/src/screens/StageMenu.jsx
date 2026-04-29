// PORT FROM: ../../highmark-demo-may/src/screens/StageMenu.jsx
// CHANGES:
//   - Swap `highmark-*` color classes for `quest-*`.
//   - Replace title "Highmark AI Demo" with "Quest AI Demo".
//   - Replace blurb to reference Quest's Care Navigation flow.
//   - Replace `highmark-profile.png` with a Quest brand asset
//     once it's saved to /public/assets/ (see SPEC.md asset list).
import { STAGES, STAGE_ORDER } from '../data/stages.js'

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

export default function StageMenu({ onPick }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-quest-primary-pastel to-surface-primary">
      <div className="max-w-[1100px] mx-auto px-16 py-20">
        <header className="mb-12">
          {/* TODO(claude-code): replace placeholder with real Quest brand mark from /public/assets */}
          <div className="w-16 h-16 rounded-full bg-quest-primary mb-5 shadow-card border border-white" />
          <h1 className="font-display text-[40px] leading-[48px] font-semibold tracking-tight text-ink mb-3">
            Quest AI Demo
          </h1>
          <p className="font-sans text-body-1 text-ink-subdued max-w-[640px]">
            One prototype, a sequential click-through. Pick to start. Hit the Menu button bottom left at any time to come back here.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {STAGE_ORDER.map((key) => {
            const stage = STAGES[key]
            return (
              <button
                key={key}
                onClick={() => onPick(key)}
                className="group text-left bg-surface-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-alt hover:border-quest-primary-bright transition-all"
              >
                <div className="flex items-center justify-between gap-6">
                  <h2 className="font-heading text-heading-3 text-ink flex-1">
                    {stage.label}
                  </h2>
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-quest-primary-pastel flex items-center justify-center group-hover:bg-quest-primary group-hover:text-white transition-colors text-quest-primary">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
