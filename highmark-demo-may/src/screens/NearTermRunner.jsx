import { useState } from 'react'
import MyHighmarkNav from '../components/MyHighmarkNav.jsx'
import Footer from '../components/Footer.jsx'
import Siderail from '../components/Siderail.jsx'
import ChatRunner from '../components/ChatRunner.jsx'
import { HEALTH_COACH_SCRIPT } from '../data/healthCoachScript.js'
import { BENEFITS_SCRIPT } from '../data/benefitsScript.js'
import BenefitsScreen from './BenefitsScreen.jsx'
import JourneyScreen from './JourneyScreen.jsx'

// Hosts the page-scoped P2/P3 prototypes. Holds the current page (benefits
// or journey) and the side rail state. When the user navigates to a
// different top-nav page that we render (Benefits ↔ Journey), the page
// swaps and the side rail is reset by re-mounting the page wrapper with
// a fresh key.
export default function NearTermRunner({ startPage = 'benefits' }) {
  const [page, setPage] = useState(startPage)
  const [siderail, setSiderail] = useState({ open: false, title: '' })

  const handleNavigate = (target) => {
    if (target === 'benefits' || target === 'journey') {
      if (target !== page) {
        setPage(target)
        setSiderail({ open: false, title: '' })
      }
      return
    }
    // Other nav items (Home, Get Care, Support) aren't built out as
    // separate prototypes — for the demo, they no-op but still close
    // the side rail since per-spec navigation kills context.
    setSiderail({ open: false, title: '' })
  }

  // Bumped on every search submit so the ChatRunner remounts with a fresh
  // script run — re-asking pulls a new conversation, doesn't append.
  const [runId, setRunId] = useState(0)
  const handleSearch = (query) => {
    setSiderail({ open: true, title: query })
    setRunId((n) => n + 1)
  }

  const closeSiderail = () => setSiderail((s) => ({ ...s, open: false }))

  return (
    <div className="min-h-screen bg-surface-primary flex flex-col">
      <MyHighmarkNav activePage={page} onNavigate={handleNavigate} />

      <div key={page} className="flex-1 relative">
        {page === 'benefits' ? (
          <BenefitsScreen siderailOpen={siderail.open} onSearch={handleSearch} />
        ) : (
          <JourneyScreen onSearch={handleSearch} />
        )}

        <Siderail
          open={siderail.open}
          title={siderail.title}
          onClose={closeSiderail}
        >
          {page === 'journey' ? (
            <ChatRunner key={`j-${runId}`} script={HEALTH_COACH_SCRIPT} />
          ) : (
            <ChatRunner key={`b-${runId}`} script={BENEFITS_SCRIPT} />
          )}
        </Siderail>
      </div>

      <Footer />
    </div>
  )
}
