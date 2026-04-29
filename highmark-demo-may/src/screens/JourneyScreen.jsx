import { CheckCircle2, Star, Heart, Clock, AlertCircle } from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

// Health Journey page (P3) — matches Figma node 13:7469. Activity-driven
// page with priority-ranked cards.
export default function JourneyScreen({ onSearch }) {
  return (
    <div>
      <div className="bg-[#DEF3FC]">
        <div className="max-w-[920px] mx-auto px-8 pt-8 pb-6">
          <h1 className="font-heading text-heading-2 font-semibold text-ink mb-5">
            Health Journey
          </h1>
          <SearchBar
            heading="What do you want to work on?"
            placeholder={`Try "I want to get healthier" or "I just got diagnosed with diabetes"`}
            onSubmit={onSearch}
          />
        </div>
      </div>

      <div className="max-w-[920px] mx-auto px-8 pt-6 pb-8">
        <Tabs />

      <h2 className="font-heading text-heading-3 text-ink mb-4">Activities</h2>

      <div className="space-y-4">
        <PriorityCard priority="high">
          <RewardActivity
            program="2024 Wellness Rewards Program"
            title="Complete Health Assessment"
            points="150"
            required
          />
        </PriorityCard>

        <PriorityCard priority="medium">
          <ActivityWithIllustration
            title="Get your Flu Shot"
            dueLabel="Complete by Dec. 31, 2024"
            illustration={ASSET('findingPCP.png')}
          />
          <Divider />
          <RewardActivity
            program="2024 Wellness Rewards Program"
            title="Preventive Exam"
            points="150"
            required
            dueLabel="Complete by Dec. 31, 2024"
          />
        </PriorityCard>

        <PriorityCard>
          <StepChallenge label="Step It Up" title="Walk 7,000 Steps" current={3124} total={7000} />
        </PriorityCard>

        <PriorityCard>
          <ActivityWithIllustration
            tagIcon={<Heart className="w-4 h-4 text-highmark-primary" />}
            tagLabel="Fundamentals of Sleep"
            title="Let's Learn: What happens When You Sleep"
            illustration={ASSET('Sleep.png')}
          />
        </PriorityCard>
      </div>
      </div>
    </div>
  )
}

/* -------------------------------- Tabs -------------------------------- */

function Tabs() {
  const tabs = ['Activities', 'Progress', 'History', 'Explore']
  return (
    <div className="border-b border-border mb-6">
      <div className="flex gap-8">
        {tabs.map((label, i) => {
          const active = i === 0
          return (
            <button
              key={label}
              type="button"
              className={`relative h-10 font-sans text-button-2 ${
                active ? 'text-highmark-primary font-semibold' : 'text-ink hover:text-highmark-primary'
              }`}
            >
              {label}
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-highmark-primary rounded-t-sm" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ---------------------------- Priority Card --------------------------- */

function PriorityCard({ priority, children }) {
  let header = null
  if (priority === 'high') {
    header = (
      <div className="bg-highmark-primary-deepest text-white px-5 py-2 font-sans text-overline">
        HIGH PRIORITY
      </div>
    )
  } else if (priority === 'medium') {
    header = (
      <div className="bg-highmark-primary-pastel text-highmark-primary px-5 py-2 font-sans text-overline">
        MEDIUM PRIORITY
      </div>
    )
  }
  return (
    <div className="bg-white border border-border rounded-lg shadow-card overflow-hidden">
      {header}
      <div className="p-5">{children}</div>
    </div>
  )
}

function Divider() {
  return <div className="border-t border-border my-4" />
}

/* ---------------------------- Activity Cards -------------------------- */

function RewardActivity({ program, title, points, required, dueLabel }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle2 className="w-4 h-4 text-success" />
        <span className="font-sans text-caption text-ink-subdued">{program}</span>
      </div>
      <p className="font-heading text-subtitle-1 font-semibold text-ink mb-3">{title}</p>
      <div className="flex items-center gap-2 mb-1.5">
        <Star className="w-4 h-4 text-highmark-primary fill-highmark-primary" />
        <span className="font-sans text-body-2 text-ink">{points} Rewards Points</span>
      </div>
      {required && (
        <div className="flex items-center gap-2 mb-1.5">
          <AlertCircle className="w-4 h-4 text-orange-500" />
          <span className="font-sans text-body-2 text-ink">Required</span>
        </div>
      )}
      {dueLabel && (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-highmark-primary" />
          <span className="font-sans text-body-2 text-ink">{dueLabel}</span>
        </div>
      )}
    </div>
  )
}

function ActivityWithIllustration({ tagIcon, tagLabel, title, dueLabel, illustration }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-1">
        {tagLabel && (
          <div className="flex items-center gap-2 mb-1.5">
            {tagIcon}
            <span className="font-sans text-caption text-ink-subdued">{tagLabel}</span>
          </div>
        )}
        <p className="font-heading text-subtitle-1 font-semibold text-ink mb-2">{title}</p>
        {dueLabel && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-highmark-primary" />
            <span className="font-sans text-body-2 text-ink">{dueLabel}</span>
          </div>
        )}
      </div>
      {illustration && (
        <div className="w-24 h-20 rounded-md overflow-hidden bg-highmark-primary-pastel shrink-0">
          <img src={illustration} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
    </div>
  )
}

function StepChallenge({ label, title, current, total }) {
  const pct = Math.min(100, (current / total) * 100)
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
        <span className="font-sans text-caption text-ink-subdued">{label}</span>
      </div>
      <p className="font-heading text-subtitle-1 font-semibold text-ink mb-3">{title}</p>
      <div className="flex items-center gap-3">
        <span className="font-sans text-body-2 text-success font-semibold whitespace-nowrap">
          {current.toLocaleString()} / {total.toLocaleString()} Steps
        </span>
        <div className="flex-1 h-2 rounded-full bg-neutral-medium overflow-hidden">
          <div className="h-full rounded-full bg-success" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}
