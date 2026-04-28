import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ChevronDown, ChevronRight, Settings } from 'lucide-react'
import AISidebar from '../components/AISidebar.jsx'
import TallyScreen from './TallyScreen.jsx'

// MyHighmark home screen, matching Figma node 1:3660.

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

const ASSETS = {
  logo: ASSET('Highmark-Logo.svg'),
  aiIcon: ASSET('AI%20Icon.svg'),
  benefitsCoverage: ASSET('Benefits-coverage.svg'),
  payBill: ASSET('pay-bill.svg'),
  hsa: ASSET('HSA.svg'),
  claims: ASSET('Claims.svg'),
  prescription: ASSET('prescription.svg'),
  vision: ASSET('vision.svg'),
  dental: ASSET('dental.svg'),
  virtualVisits: ASSET('virtualvisits.svg'),
  mentalWellbeing: ASSET('mental-wellbeing.svg'),
  symptomChecker: ASSET('symptom-checker.svg'),
  heart: ASSET('Heart.svg'),
  star: ASSET('star.svg'),
  providerSearch: ASSET('provider-search.png'),
  rewardPrograms: ASSET('RewardPrograms.png'),
  walkItOut: ASSET('walkitout.png'),
  findingPCP: ASSET('findingPCP.png'),
  sleep: ASSET('Sleep.png'),
}

export default function HomeScreen({ stageKey, onAdvance }) {
  const [aiOpen, setAiOpen] = useState(false)
  const [tallyOpen, setTallyOpen] = useState(false)
  const autoOpened = useRef(false)

  useEffect(() => {
    if (autoOpened.current) return
    const t = setTimeout(() => {
      autoOpened.current = true
      setAiOpen(true)
    }, 1500)
    return () => clearTimeout(t)
  }, [])

  // After the closing turn ("Take care, Jessica…") finishes, give the
  // sidebar a beat to settle, then reveal the tally as a full-screen takeover.
  const handleConversationEnd = () => {
    setTimeout(() => setTallyOpen(true), 800)
  }

  return (
    <div className="min-h-screen bg-surface-primary">
      <HeroBand onSubmit={onAdvance} />

      <div className="max-w-highmark-vw mx-auto px-[260px]">
        <div className="w-[920px] mx-auto pt-10 pb-24 space-y-10">
          <PopularShortcuts />
          <MyBenefits />
          <PlanCoverageStrip />
          <GetCare />
          <RewardPrograms />
          <SuggestedForYou />
          <YourChallenges />
          <HealthPrograms />
          <NewAndNoteworthy />
        </div>
      </div>

      <AISidebar
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onConversationEnd={handleConversationEnd}
      />

      {tallyOpen && <TallyScreen />}
    </div>
  )
}

/* ------------------------------ Hero + Nav ------------------------------ */

function HeroBand({ onSubmit }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    onSubmit?.()
  }

  return (
    <div className="h-[350px] relative bg-gradient-to-r from-[#A1CCE0] to-[#CCDAE1]">
      <div className="max-w-highmark-vw mx-auto px-[260px] pt-[38px]">
        <TopNav />

        <h1 className="mt-[82px] font-display text-heading-2 text-center text-ink">
          Hi Jessica, what do you want to do today?
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 mx-auto w-[795px]"
          role="search"
        >
          <div
            className={`h-12 rounded-full bg-surface-card border shadow-card flex items-center pl-3 pr-1 transition-colors ${
              focused ? 'border-highmark-primary' : 'border-border'
            }`}
          >
            <img src={ASSETS.aiIcon} alt="" className="w-6 h-6 mx-1.5 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Start a chat or ask a question"
              className="flex-1 h-full bg-transparent outline-none font-sans text-body-1 text-ink placeholder:text-ink-subdued"
            />
            <button
              type="submit"
              aria-label="Submit"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                query.trim()
                  ? 'bg-highmark-primary hover:bg-highmark-primary-dark'
                  : 'bg-highmark-primary/40 cursor-default'
              }`}
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function TopNav() {
  const items = ['Home', 'Benefits', 'Get Care', 'Journey', 'Support']
  return (
    <div className="w-[920px] h-12 mx-auto bg-surface-card rounded-full shadow-card flex items-center px-6">
      <img src={ASSETS.logo} alt="Highmark West Virginia" className="h-7 w-auto shrink-0" />
      <nav className="flex-1 flex items-center justify-center gap-8">
        {items.map((label, i) => (
          <button
            key={label}
            className={`h-8 font-sans text-button-2 ${
              i === 0 ? 'text-highmark-primary font-semibold' : 'text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
      <button className="flex items-center gap-1 text-ink font-sans text-button-2">
        <Settings className="w-4 h-4" />
        <span>Settings</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  )
}

/* ---------------------------- Section Helpers --------------------------- */

function SectionHeader({ title, action = 'View all', onActionClick, className = '' }) {
  return (
    <div className={`flex items-baseline justify-between ${className}`}>
      <h2 className="font-heading text-heading-3 text-ink">{title}</h2>
      {action && (
        <button
          onClick={onActionClick}
          className="font-heading text-subtitle-1 text-highmark-link hover:underline"
        >
          {action}
        </button>
      )}
    </div>
  )
}

function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-surface-card border border-border rounded-lg shadow-card ${className}`}
    >
      {children}
    </div>
  )
}

function IconTile({ src, size = 'md' }) {
  const tileClass = size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'
  const iconClass = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
  return (
    <span className={`${tileClass} rounded-lg bg-highmark-primary-pastel flex items-center justify-center shrink-0`}>
      <img src={src} alt="" className={iconClass} />
    </span>
  )
}

/* -------------------------- Popular Shortcuts --------------------------- */

function PopularShortcuts() {
  const items = [
    { label: 'Benefits & Coverage', icon: ASSETS.benefitsCoverage },
    { label: 'Pay Premium Bill', icon: ASSETS.payBill },
    { label: 'Health Savings Account', icon: ASSETS.hsa },
    { label: 'View Claims', icon: ASSETS.claims },
  ]
  return (
    <section>
      <h2 className="font-heading text-subtitle-2 text-ink mb-3">Popular Shortcuts</h2>
      <div className="grid grid-cols-4 gap-4">
        {items.map(({ label, icon }) => (
          <button
            key={label}
            className="bg-surface-card border border-border rounded-lg shadow-card h-[72px] px-4 flex items-center gap-3 hover:border-highmark-primary transition-colors text-left"
          >
            <IconTile src={icon} />
            <span className="font-heading text-subtitle-2 text-ink leading-tight">{label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------ My Benefits ----------------------------- */

function MyBenefits() {
  return (
    <section>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="font-heading text-heading-3 text-ink mb-4">My Benefits</h2>
          <Card className="p-6 h-[187px] flex items-center">
            <div className="flex-1">
              <p className="font-heading text-subtitle-1 text-ink mb-2">Community Blue HDHP 1</p>
              <p className="font-sans text-body-2 text-ink-subdued">Member ID: 98 5367 7448</p>
              <p className="font-sans text-body-2 text-ink-subdued">Group ID: 02 865 100</p>
            </div>
            <IdCardVisual />
          </Card>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-heading text-heading-3 text-ink">Community Blue HDHP 1</h2>
            <button className="font-heading text-subtitle-1 text-highmark-link hover:underline">
              View all
            </button>
          </div>
          <Card className="p-6 h-[187px]">
            <p className="font-sans text-overline text-ink-subdued mb-2">IN-NETWORK</p>
            <p className="font-heading text-subtitle-1 text-ink mb-1">Your Deductible</p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-heading text-[28px] font-semibold text-ink leading-none">
                $1,500
              </span>
              <span className="font-sans text-body-2 text-ink-subdued">of $3,000 spent</span>
            </div>
            <div className="w-full h-2 rounded-full bg-neutral-medium overflow-hidden mb-2">
              <div
                className="h-full rounded-full bg-success"
                style={{ width: '50%' }}
              />
            </div>
            <p className="font-sans text-body-2 text-ink-subdued text-right">$1,500 remaining</p>
          </Card>
        </div>
      </div>
    </section>
  )
}

function IdCardVisual() {
  return (
    <div className="w-[88px] h-[56px] rounded-lg bg-gradient-to-br from-highmark-primary-pastel to-highmark-primary-bright/30 border border-highmark-primary-pastel ml-4 relative overflow-hidden shrink-0">
      <div className="absolute top-2 left-2 w-10 h-1 rounded-full bg-highmark-primary/60" />
      <div className="absolute top-4 left-2 w-6 h-1 rounded-full bg-highmark-primary/40" />
      <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-highmark-primary-bright" />
    </div>
  )
}

/* --------------------------- Plan Coverage Strip ------------------------ */

function PlanCoverageStrip() {
  const items = [
    { label: 'Prescription Coverage', icon: ASSETS.prescription },
    { label: 'Vision Coverage', icon: ASSETS.vision },
    { label: 'Dental Coverage', icon: ASSETS.dental },
  ]
  return (
    <div className="grid grid-cols-3 gap-6">
      {items.map(({ label, icon }) => (
        <button
          key={label}
          className="bg-surface-card border border-border rounded-lg shadow-card h-[90px] px-5 flex items-center gap-4 hover:border-highmark-primary transition-colors text-left"
        >
          <IconTile src={icon} size="lg" />
          <span className="font-heading text-subtitle-1 text-ink">{label}</span>
        </button>
      ))}
    </div>
  )
}

/* -------------------------------- Get Care ------------------------------ */

function GetCare() {
  return (
    <section>
      <SectionHeader title="Get Care" className="mb-5" />
      <Card className="p-0 overflow-hidden flex items-stretch h-[184px]">
        <div className="w-[327px] h-full bg-highmark-primary-pastel shrink-0 overflow-hidden">
          <img
            src={ASSETS.providerSearch}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-6 flex flex-col justify-center">
          <p className="font-heading text-heading-3 text-ink mb-2">Go to provider search</p>
          <p className="font-sans text-body-1 text-ink-subdued mb-3">
            Browse or search the care you need.
          </p>
          <button className="font-heading text-subtitle-1 text-highmark-link self-start hover:underline">
            Find care now
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <SubCareCard
          icon={ASSETS.virtualVisits}
          title="Schedule Virtual Visits"
          body="Get care from home or while on the go at a time that works for you with Well360 Virtual Health."
        />
        <SubCareCard
          icon={ASSETS.mentalWellbeing}
          title="Mental Well-Being"
          body="Mental health care, educational resources and more."
        />
        <SubCareCard
          icon={ASSETS.symptomChecker}
          title="Symptom Checker"
          body="Let us help you find the care thats right for you."
        />
      </div>
    </section>
  )
}

function SubCareCard({ icon, title, body }) {
  return (
    <Card className="p-5 h-[144px] flex items-center gap-4">
      <img src={icon} alt="" className="w-14 h-14 shrink-0" />
      <div className="flex-1">
        <p className="font-heading text-subtitle-1 text-ink mb-1">{title}</p>
        <p className="font-sans text-caption text-ink-subdued leading-snug">{body}</p>
      </div>
    </Card>
  )
}

/* ----------------------------- Reward Programs -------------------------- */

function RewardPrograms() {
  return (
    <section>
      <h2 className="font-heading text-heading-3 text-ink mb-4">Your Reward Programs</h2>
      <Card className="p-0 overflow-hidden flex items-stretch h-[228px]">
        <div className="w-[350px] h-full bg-highmark-primary-pastel shrink-0 overflow-hidden">
          <img
            src={ASSETS.rewardPrograms}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-6 flex flex-col justify-center">
          <p className="font-heading text-heading-3 text-ink mb-4">2024 Wellness Rewards Program</p>
          <div className="space-y-2">
            <InfoRow text="Jan. 1, 2024 - Dec. 31, 2024" />
            <InfoRow text="Earn 1,000 reward points to complete your reward program." />
          </div>
        </div>
      </Card>
    </section>
  )
}

function InfoRow({ text }) {
  return (
    <div className="flex items-center gap-2">
      <img src={ASSETS.star} alt="" className="w-4 h-4 shrink-0" />
      <span className="font-sans text-body-2 text-ink">{text}</span>
    </div>
  )
}

/* ----------------------------- Suggested For You ------------------------ */

function SuggestedForYou() {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-1">
        <h2 className="font-heading text-heading-3 text-ink">Suggested for you</h2>
        <button className="font-heading text-subtitle-1 text-highmark-link hover:underline">
          View all
        </button>
      </div>
      <p className="font-sans text-caption text-ink-subdued mb-4">2 Available Activities</p>

      <Card className="overflow-hidden p-0">
        <div className="bg-highmark-primary-deepest h-10 flex items-center px-6">
          <span className="font-sans text-overline text-white">HIGH PRIORITY</span>
        </div>
        <button className="w-full px-6 py-4 flex items-center text-left hover:bg-highmark-primary-pastel/40 transition-colors">
          <span className="font-heading text-subtitle-1 text-ink flex-1">
            A PSA For Cervical Cancer
          </span>
          <ChevronRight className="w-5 h-5 text-highmark-primary" />
        </button>
      </Card>
    </section>
  )
}

/* ------------------------------ Your Challenges ------------------------- */

function YourChallenges() {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-1">
        <h2 className="font-heading text-heading-3 text-ink">Your Challenges</h2>
        <button className="font-heading text-subtitle-1 text-highmark-link hover:underline">
          View all
        </button>
      </div>
      <p className="font-sans text-caption text-ink-subdued mb-4">1 Available Activity</p>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <img src={ASSETS.star} alt="" className="w-4 h-4" />
          <span className="font-sans text-body-2 text-ink">Step It Up Challenge</span>
        </div>
        <p className="font-heading text-subtitle-1 text-ink mb-3">Walk 7,000 Steps</p>
        <div className="flex items-center gap-3">
          <span className="font-sans text-caption text-success font-semibold shrink-0">
            5,174 / 7,000 Steps
          </span>
          <div className="flex-1 h-2.5 rounded-full bg-neutral-medium overflow-hidden">
            <div className="h-full rounded-full bg-success" style={{ width: '73.9%' }} />
          </div>
        </div>
      </Card>
    </section>
  )
}

/* --------------------------- Health Programs Card ----------------------- */

function HealthPrograms() {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-1">
        <h2 className="font-heading text-heading-3 text-ink">From Your Health Programs</h2>
        <button className="font-heading text-subtitle-1 text-highmark-link hover:underline">
          View all
        </button>
      </div>
      <p className="font-sans text-caption text-ink-subdued mb-4">1 Available Activity</p>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <img src={ASSETS.heart} alt="" className="w-4 h-4" />
          <span className="font-sans text-body-2 text-ink">Fundamentals of Sleep</span>
        </div>
        <p className="font-heading text-subtitle-1 text-ink">
          Let's Learn: What happens When You Sleep
        </p>
      </Card>
    </section>
  )
}

/* ---------------------------- New & Noteworthy -------------------------- */

function NewAndNoteworthy() {
  const cards = [
    { title: 'Walk it out', image: ASSETS.walkItOut },
    { title: 'Finding a PCP', image: ASSETS.findingPCP },
    { title: 'Healthy Sleep Habits', image: ASSETS.sleep },
  ]
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-heading-3 text-ink">New &amp; Noteworthy</h2>
        <div className="flex items-center gap-4">
          <button className="font-heading text-subtitle-1 text-highmark-link hover:underline">
            View all
          </button>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-ink-subdued hover:border-highmark-primary">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="w-8 h-8 rounded-full border border-highmark-primary flex items-center justify-center text-highmark-primary hover:bg-highmark-primary-pastel">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {cards.map((c) => (
          <Card key={c.title} className="overflow-hidden">
            <div className="h-[180px] bg-highmark-primary-pastel overflow-hidden">
              <img
                src={c.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="font-heading text-subtitle-1 text-ink">{c.title}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
