import ChatHeader from '../components/ChatHeader.jsx'
import ChatBubble from '../components/ChatBubble.jsx'
import Chip from '../components/Chip.jsx'
import PrimaryCTA from '../components/PrimaryCTA.jsx'
import StatusLine from '../components/StatusLine.jsx'
import CoverageTile from '../components/CoverageTile.jsx'
import ClaimCard from '../components/ClaimCard.jsx'
import UnlockTile from '../components/UnlockTile.jsx'
import BottomNav from '../components/BottomNav.jsx'
import CoverageComparison from '../components/CoverageComparison.jsx'

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <div className="text-[11px] uppercase tracking-wide text-ink-soft font-semibold mb-2 px-1">
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

export default function TestGallery() {
  return (
    <div className="h-full w-full flex flex-col bg-bg-alt">
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <Section title="ChatHeader">
          <div className="-mx-4">
            <ChatHeader />
          </div>
        </Section>

        <Section title="ChatBubble">
          <ChatBubble from="manny">Hi Jenn! It looks like your family might be growing — congratulations!</ChatBubble>
          <ChatBubble from="user">Yes, tell me more</ChatBubble>
        </Section>

        <Section title="Chip">
          <div className="flex gap-2 flex-wrap">
            <Chip label="Yes, tell me more" primary />
            <Chip label="Maybe later" />
          </div>
        </Section>

        <Section title="PrimaryCTA">
          <PrimaryCTA>Activate new policy</PrimaryCTA>
        </Section>

        <Section title="StatusLine">
          <div className="bg-white rounded-2xl p-3 border border-stroke">
            <StatusLine>Reviewing Jenn's current coverage and household profile</StatusLine>
            <StatusLine>Confirming eligibility. No medical exam required at this amount</StatusLine>
            <StatusLine>Pre-approving 20-year Family Term, $250,000</StatusLine>
          </div>
        </Section>

        <Section title="CoverageTile">
          <CoverageTile title="Health Benefits" iconKey="health" spent={380} total={2000} />
          <CoverageTile title="Dental" iconKey="dental" spent={450} total={1500} />
          <CoverageTile title="Paramedical" iconKey="paramedical" spent={400} total={1000} />
        </Section>

        <Section title="ClaimCard">
          <ClaimCard
            date="Sep 7, 2024"
            status="Approved"
            pharmacy="Shoppers Drug Mart"
            drug="Prenatal Vitamins"
            cost="$35.00"
          />
        </Section>

        <Section title="UnlockTile">
          <UnlockTile title="KixCare" subtitle="24/7 pediatric virtual care" />
          <UnlockTile title="Maven Clinic" subtitle="3 bonus prenatal + mental health visits" />
          <UnlockTile title="Aeroplan Points" subtitle="2,500 welcome bonus" />
        </Section>

        <Section title="CoverageComparison">
          <CoverageComparison
            current={{ label: 'Current', policy: 'Optional life insurance', amount: '$100K' }}
            recommended={{
              label: 'Recommended',
              policy: 'Optional + Family Term',
              amount: '$350K',
              bullets: ['Includes access to Maven Clinic and KixCare']
            }}
          />
        </Section>

        <Section title="BottomNav">
          <div className="-mx-4">
            <BottomNav active="home" />
          </div>
        </Section>
      </div>
    </div>
  )
}
