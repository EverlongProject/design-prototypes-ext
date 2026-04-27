import { STAGES, STAGE_ORDER } from '../data/stages.js'

// Landing menu. Three prototype entries. Internal-facing, for rehearsal
// and for jumping between the three flows during the May 4 pitch.
export default function StageMenu({ onPick }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-highmark-primary-pastel to-surface-primary">
      <div className="max-w-[1100px] mx-auto px-16 py-20">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-border shadow-card mb-6">
            <span className="w-2 h-2 rounded-full bg-highmark-accent-green" />
            <span className="text-caption font-sans text-ink-subdued tracking-wide uppercase">Internal Demo, May 4, 2026</span>
          </div>
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
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-overline text-highmark-primary font-sans">
                        {stage.badge}
                      </span>
                    </div>
                    <h2 className="font-heading text-heading-3 text-ink mb-2">
                      {stage.label}
                    </h2>
                    <p className="font-sans text-body-2 text-ink-subdued max-w-[680px]">
                      {stage.blurb}
                    </p>
                  </div>
                  <div className="shrink-0 self-center">
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

        <footer className="mt-16 text-caption text-ink-subdued font-sans">
          Built with the Highmark Figma (file Ej1FaauWAcnqGdXTL604nv). Design tokens in <code className="font-mono">tailwind.config.js</code>.
        </footer>
      </div>
    </div>
  )
}
