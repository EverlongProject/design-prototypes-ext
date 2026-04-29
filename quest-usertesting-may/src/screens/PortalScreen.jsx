import { useEffect, useState } from 'react'
import { ArrowUp, ChevronDown, ChevronRight, Settings, Sparkles, Play } from 'lucide-react'
import AISidebar from '../components/AISidebar.jsx'
import { CARE_NAV_SCRIPT_PRE } from '../data/careNavScript.js'

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`
const ASSETS = {
  logoGreen: ASSET('Quest-Logo-Green.svg'),
  logoWhite: ASSET('Quest-Logo-White.svg'),
  healthProfile: ASSET('HealthProfile.png'),
  mealPlanning: ASSET('MealPlanning.png'),
  boostHydration: ASSET('BoostHydration.png'),
  faceDepression: ASSET('LearnFaceDepression.png'),
  wellnessIncentive: ASSET('WellnessIncentive.png'),
}

// User-testing variant: single conversation only (CARE_NAV_SCRIPT_PRE,
// trimmed to end after the flu shot is confirmed). The sidebar appears on
// landing and stays open on the last turn — no scripted follow-up, no
// reschedule beat, no results banner.
const SIDEBAR_AUTO_OPEN_MS = 600

export default function PortalScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [heroQuery, setHeroQuery] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setSidebarOpen(true), SIDEBAR_AUTO_OPEN_MS)
    return () => clearTimeout(t)
  }, [])

  // Conversation end is intentionally a no-op. The script ends after the flu
  // shot confirmation; we leave the sidebar open on the last turn so the
  // participant has no scripted prompt to do anything else.
  const handleConversationEnd = () => {}

  return (
    <div className="relative min-h-screen bg-surface-primary">
      <HeroBand query={heroQuery} onQueryChange={setHeroQuery} />
      <PartnershipStrip />

      <div className="max-w-quest-vw mx-auto">
        <div className="w-[1190px] mx-auto pt-8 pb-16 flex gap-8">
          <div className="w-[830px] shrink-0 space-y-8">
            <WellnessIncentive />
            <ScheduleScreening />
            <HealthProfileQuestionnaire />
            <SuggestedPrograms />
          </div>
          <div className="w-[328px] shrink-0">
            <TodaysActivities />
          </div>
        </div>
      </div>

      <Footer />

      <AISidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onConversationEnd={handleConversationEnd}
        script={CARE_NAV_SCRIPT_PRE}
      />
    </div>
  )
}

/* --------------------------------- Hero ---------------------------------- */

function HeroBand({ query, onQueryChange }) {
  return (
    <div className="h-[300px] relative bg-gradient-to-b from-quest-sage to-quest-sage-deep">
      <div className="max-w-quest-vw mx-auto px-0 pt-[24px]">
        <TopNav />
        <h1 className="mt-[64px] font-display text-heading-2 text-center text-ink">
          Hi Mari, what do you want to do today?
        </h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 mx-auto w-[640px]"
          role="search"
        >
          <div className="h-12 rounded-full bg-surface-card border border-border shadow-card flex items-center pl-4 pr-1">
            <Sparkles className="w-5 h-5 text-quest-primary mr-2 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange?.(e.target.value)}
              placeholder="Schedule an appointment, ask a question or simply start a conversation"
              className="flex-1 h-full bg-transparent outline-none font-sans text-body-2 text-ink placeholder:text-ink-subdued"
            />
            <button
              type="submit"
              aria-label="Submit"
              className="w-9 h-9 rounded-full bg-quest-primary hover:bg-quest-primary-dark flex items-center justify-center"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function TopNav() {
  const items = ['Home', 'My Results', 'Screenings', 'Journey', 'Resources']
  return (
    <div className="w-[1190px] h-12 mx-auto bg-surface-card rounded-full shadow-card flex items-center px-6">
      <img src={ASSETS.logoGreen} alt="Quest" className="h-7 w-auto shrink-0" />
      <nav className="flex-1 flex items-center justify-center gap-7">
        {items.map((label, i) => (
          <button
            key={label}
            className={`h-8 font-sans text-button-2 ${
              i === 0 ? 'text-quest-primary font-semibold' : 'text-ink'
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

function PartnershipStrip() {
  return (
    <div className="bg-surface-secondary border-y border-border">
      <div className="max-w-quest-vw mx-auto px-0">
        <div className="w-[1190px] mx-auto py-3 font-sans text-overline text-ink-subdued">
          IN PARTNERSHIP WITH <span className="text-ink font-bold">ST LOUIS UNIVERSITY</span>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------- Hero Sections ----------------------------- */

function WellnessIncentive() {
  return (
    <section className="rounded-lg bg-quest-primary-dark text-white px-5 py-4 flex items-center justify-between gap-4 shadow-card">
      <div>
        <p className="font-heading text-subtitle-1 text-white">Your Wellness Incentive</p>
        <p className="font-sans text-body-2 text-white/85 mt-1">
          Complete your screening today and receive a $100 gift card upon completion.
        </p>
      </div>
      <img
        src={ASSETS.wellnessIncentive}
        alt=""
        className="shrink-0 h-14 w-auto"
      />
    </section>
  )
}

function ScheduleScreening() {
  return (
    <section>
      <h2 className="font-heading text-heading-3 text-ink mb-3">Schedule a screening</h2>
      <div className="rounded-lg bg-quest-primary-pastel border border-quest-primary-pastel p-5">
        <p className="font-heading text-subtitle-1 text-ink mb-1">Annual Wellness Screening</p>
        <p className="font-sans text-body-2 text-ink-subdued mb-4">
          This routine visit helps you understand your health and plan ahead. It's easy to book and covered at no cost.
        </p>
        <p className="font-sans text-overline text-ink-subdued mb-2">CLOSE TO HOME</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { dist: '3.35 mi', name: 'Quest Diagnostics – Quivira' },
            { dist: '4.35 mi', name: 'Quest Diagnostics – Bradlee' },
            { dist: '3.35 mi Away', name: 'Quest Diagnostics – Georgetown' },
          ].map((loc) => (
            <button
              key={loc.name}
              className="rounded-md bg-white border border-border p-3 text-left hover:border-quest-primary transition-colors"
            >
              <p className="font-sans text-caption text-ink-subdued">{loc.dist}</p>
              <p className="font-heading text-subtitle-2 text-ink leading-tight mt-0.5">{loc.name}</p>
            </button>
          ))}
        </div>
        <button className="rounded-full bg-white border border-border px-4 py-1.5 text-button-2 font-sans text-ink hover:border-quest-primary">
          View All Locations
        </button>
      </div>
    </section>
  )
}

function HealthProfileQuestionnaire() {
  return (
    <section>
      <h2 className="font-heading text-heading-3 text-ink mb-3">Health profile questionnaire</h2>
      <div className="rounded-lg border border-border bg-surface-card overflow-hidden flex h-[160px] shadow-card">
        <div className="w-[260px] bg-quest-primary-pastel shrink-0 relative overflow-hidden">
          <img
            src={ASSETS.healthProfile}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/85 flex items-center justify-center shadow">
              <Play className="w-5 h-5 text-quest-primary fill-quest-primary" />
            </div>
          </div>
        </div>
        <div className="flex-1 p-5 flex flex-col justify-center">
          <p className="font-heading text-subtitle-1 text-ink mb-1">
            You haven't completed your Health Profile Questionnaire
          </p>
          <p className="font-sans text-body-2 text-ink-subdued">
            Your Health Assessment is a snapshot of your overall health, habits, and goals. It'll only take about 5–10 minutes.
          </p>
        </div>
      </div>
    </section>
  )
}

function SuggestedPrograms() {
  const programs = [
    { title: 'Meal planning 101', body: "Meal planning doesn't have to be complicated! This program helps you break it down to be easier.", image: ASSETS.mealPlanning, isNew: true },
    { title: 'Boost your hydration', body: 'Ready, set, move! Aim for a total of 30 minutes of movement today.', image: ASSETS.boostHydration },
    { title: 'Learn to face depression', body: 'Ready, set, move! Aim for a total of minutes of movement today.', image: ASSETS.faceDepression },
  ]
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-heading text-heading-3 text-ink">Suggested programs</h2>
        <div className="flex items-center gap-3">
          <button className="font-heading text-subtitle-2 text-quest-link hover:underline">View All</button>
          <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-ink-subdued">
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
          </button>
          <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-ink-subdued">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden -mr-4">
        {programs.map((p) => (
          <div key={p.title} className="w-[320px] shrink-0 rounded-lg border border-border bg-surface-card overflow-hidden shadow-card">
            <div className="relative h-[160px] bg-quest-primary-pastel overflow-hidden">
              <img
                src={p.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              {p.isNew && (
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-white text-[10px] font-bold font-sans text-ink shadow">
                  NEW
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="font-heading text-subtitle-2 text-ink mb-1">{p.title}</p>
              <p className="font-sans text-caption text-ink-subdued leading-snug">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function TodaysActivities() {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-heading text-heading-3 text-ink">Today's activities</h2>
        <button className="font-heading text-subtitle-2 text-quest-link hover:underline">View all</button>
      </div>
      <div className="rounded-lg border border-border bg-surface-card overflow-hidden shadow-card">
        <div className="bg-quest-primary-dark h-9 flex items-center px-4">
          <span className="font-sans text-overline text-white">RECOMMENDED ACTION</span>
        </div>
        <div className="px-4 py-4">
          <p className="font-heading text-subtitle-1 text-ink">
            Complete your Health Profile Questionnaire
          </p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-quest-primary-dark text-white">
      <div className="max-w-quest-vw mx-auto px-0">
        <div className="w-[1190px] mx-auto py-8 grid grid-cols-3 gap-8">
          <div>
            <img src={ASSETS.logoWhite} alt="Quest" className="h-7 w-auto" />
            <ul className="mt-4 space-y-2 font-sans text-body-2">
              <li>Terms and Conditions</li>
              <li>Privacy Notices</li>
              <li>Non-Discrimination Notice</li>
            </ul>
          </div>
          <div className="font-sans text-caption text-white/70">
            Copyright © 2026 Quest Diagnostics
          </div>
          <div className="text-right">
            <p className="font-sans text-overline text-white/70">IN COLLABORATION WITH</p>
            <p className="font-heading text-subtitle-2 text-white mt-1">Saint Louis University</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
