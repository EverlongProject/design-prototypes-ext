import { STAGES, STAGE_ORDER } from '../data/stages.js'

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

// Landing menu. Three prototype entries. Internal-facing, for rehearsal
// and for jumping between the three flows during the May 4 pitch.
export default function StageMenu({ onPick }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-highmark-primary-pastel to-surface-primary">
      <div className="max-w-[1100px] mx-auto px-16 py-20">
        <header className="mb-12">
          <img
            src={ASSET('highmark-profile.png')}
            alt=""
            className="w-16 h-16 rounded-full object-cover mb-5 shadow-card border border-white"
          />
          <h1 className="font-display text-[40px] leading-[48px] font-semibold tracking-tight text-ink mb-3">
            Highmark AI Demo
          </h1>
          <p className="font-sans text-body-1 text-ink-subdued max-w-[640px]">
            Three prototypes, each a sequential click-through. Pick one to start. Hit the Menu button top right at any time to come back here.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {STAGE_ORDER.map((key) => {
            const stage = STAGES[key]
            return (
              <button
                key={key}
                onClick={() => onPick(key)}
                className="group text-left bg-surface-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-alt hover:border-highmark-primary-bright transition-all"
              >
                <div className="flex items-center justify-between gap-6">
                  <h2 className="font-heading text-heading-3 text-ink flex-1">
                    {stage.label}
                  </h2>
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-highmark-primary-pastel flex items-center justify-center group-hover:bg-highmark-primary group-hover:text-white transition-colors text-highmark-primary">
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
