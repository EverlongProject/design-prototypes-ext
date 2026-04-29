import { ChevronRight, HelpCircle } from 'lucide-react'

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

const ICONS = {
  medical: ASSET('Medical.svg'),
  prescription: ASSET('Rx-Coverage.svg'),
  dental: ASSET('dental.svg'),
  vision: ASSET('Eye-Care.svg'),
  hsa: ASSET('HSA-helper.svg'),
  fsa: ASSET('FSA.svg'),
  parking: ASSET('Parking.svg'),
  generalWellbeing: ASSET('General-Wellbeing.svg'),
  virtualCoaching: ASSET('Wellness-Virtual-Coaching.svg'),
  musculoskeletal: ASSET('Musculoskeletal-Health.svg'),
  diabetes: ASSET('Diabetes-Management.svg'),
}

// Benefits page (P2) — matches Figma node 13:9974. The AI side rail floats
// above the page as a fixed overlay, so the two-column layout stays put
// whether it's open or closed.
export default function BenefitsScreen({ onSearch }) {
  return (
    <div>
      <div className="bg-[#DEF3FC]">
        <div className="max-w-[1100px] mx-auto px-8 pt-8 pb-6">
          <h1 className="font-heading text-heading-2 font-semibold text-ink mb-5">
            Benefits
          </h1>
          <SearchBarStandalone onSubmit={onSearch} />
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-8 pt-6 pb-8">
        <Tabs />

      <div className="grid gap-8 grid-cols-[1fr_280px]">
        <div className="space-y-10 min-w-0">
          <RecentClaims />
          <PlanUsage />
          <InsuranceCoverage />
          <SpendingAccounts />
          <AdditionalBenefits />
        </div>

        <aside className="space-y-6">
          <RightRailGroup
            title="Common Tasks"
            items={[
              { label: 'Find a provider', external: true },
              { label: 'View claims' },
              { label: 'Coordination of Benefits' },
            ]}
          />
          <RightRailGroup
            title="Documents"
            items={[
              { label: 'Medical forms library' },
              { label: 'Document Center' },
              { label: 'Medical Benefit Booklet' },
              { label: 'Preventive services' },
              { label: 'Prior authorization requirements' },
            ]}
          />
          <RightRailGroup
            title="Additional Resources"
            items={[
              { label: 'Health Insurance FAQ' },
              { label: 'Health plan message enter' },
              { label: 'Health insurance glossary' },
            ]}
          />
        </aside>
      </div>
      </div>
    </div>
  )
}

// -- inline SearchBar wired through props (avoids local state colliding
// with the host's `onSearch`) -------------------------------------------------
import SearchBar from '../components/SearchBar.jsx'

function SearchBarStandalone({ onSubmit }) {
  return (
    <SearchBar
      heading="Have a question about your plan?"
      placeholder={`Try "Am I covered for physical therapy?" or "What's my deductible?"`}
      onSubmit={onSubmit}
    />
  )
}

/* ------------------------------ Tabs ----------------------------- */

function Tabs() {
  const tabs = ['Active Plan', 'Past Plan', 'Pending Plan']
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

/* ------------------------- Recent Claims ------------------------- */

function RecentClaims() {
  const claims = [
    {
      date: 'Sep 7, 2024',
      doctor: 'Pam Beesly, MD',
      member: 'Michelle Scott',
      claimType: 'Medical Claim',
      claimId: '#123456789',
      cost: '$175.00',
    },
    {
      date: 'Aug 15, 2024',
      doctor: 'Sabrina Ionescu, DDS',
      member: 'Michelle Scott',
      claimType: 'Dental Claim',
      claimId: '#123456789',
      cost: '$275.00',
    },
  ]
  return (
    <section>
      <SectionHeader title="Recent Claims" action="View all claims" />
      <div className="grid grid-cols-2 gap-5">
        {claims.map((c, i) => (
          <button
            key={i}
            type="button"
            className="group bg-white rounded-lg border-l-4 border-success border-y border-r border-border shadow-card text-left p-5 hover:border-highmark-primary transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-caption text-ink-subdued">{c.date}</span>
              <span className="font-sans text-caption font-semibold text-success bg-success/10 px-2 py-0.5 rounded">
                Processed
              </span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-heading text-subtitle-1 font-semibold text-ink mb-1.5">
                  {c.doctor}
                </p>
                <p className="font-sans text-caption text-ink-subdued">For: {c.member}</p>
                <p className="font-sans text-caption text-ink-subdued">
                  {c.claimType} {c.claimId}
                </p>
                <p className="font-sans text-caption text-ink-subdued mt-2">
                  Your Cost: <span className="font-semibold text-ink">{c.cost}</span>
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-ink-subdued shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

/* --------------------------- Plan Usage -------------------------- */

function PlanUsage() {
  return (
    <section>
      <SectionHeader title="Plan Usage" action="View more" />
      <div className="grid grid-cols-2 gap-5">
        <DeductibleCard label="Your Deductible" spent={1500} total={3000} remaining={1500} />
        <DeductibleCard label="Family Deductible" spent={1500} total={5000} remaining={3500} />
      </div>
    </section>
  )
}

function DeductibleCard({ label, spent, total, remaining }) {
  const pct = (spent / total) * 100
  return (
    <div className="bg-white border border-border rounded-lg shadow-card p-5">
      <p className="font-sans text-overline text-ink-subdued mb-2">IN-NETWORK</p>
      <p className="font-heading text-subtitle-1 text-ink mb-2 inline-flex items-center gap-1.5">
        {label} <HelpCircle className="w-3.5 h-3.5 text-ink-subdued" />
      </p>
      <p className="font-heading text-[20px] font-semibold text-ink leading-none mb-2">
        ${spent.toLocaleString()}.00 <span className="font-sans text-body-2 text-ink-subdued font-normal">of ${total.toLocaleString()} spent</span>
      </p>
      <div className="w-full h-2 rounded-full bg-neutral-medium overflow-hidden mb-2">
        <div className="h-full rounded-full bg-success" style={{ width: `${pct}%` }} />
      </div>
      <p className="font-sans text-body-2 text-ink-subdued text-right">${remaining.toLocaleString()}.00 remaining</p>
    </div>
  )
}

/* ----------------------- Insurance Coverage ---------------------- */

function InsuranceCoverage() {
  const tiles = [
    { icon: ICONS.medical, title: 'Medical', subtitle: 'Plan Name' },
    { icon: ICONS.prescription, title: 'Prescription', subtitle: 'Plan Name' },
    { icon: ICONS.dental, title: 'Dental', subtitle: 'Plan Name' },
    { icon: ICONS.vision, title: 'Vision', subtitle: 'Plan Name' },
  ]
  return (
    <section>
      <h2 className="font-heading text-heading-3 text-ink mb-4">Insurance Coverage</h2>
      <div className="grid grid-cols-2 gap-4">
        {tiles.map((t) => <BenefitTile key={t.title} {...t} />)}
      </div>
    </section>
  )
}

/* ----------------------- Spending Accounts ----------------------- */

function SpendingAccounts() {
  const tiles = [
    { icon: ICONS.hsa, title: 'Health Savings Account', subtitle: 'Highmark' },
    { icon: ICONS.fsa, title: 'Flexible Spending Account', subtitle: 'Highmark' },
    { icon: ICONS.fsa, title: 'Limited Purpose FSA', subtitle: 'Highmark' },
    { icon: ICONS.parking, title: 'Transportation Savings Account', subtitle: 'Highmark' },
  ]
  return (
    <section>
      <h2 className="font-heading text-heading-3 text-ink mb-4">Spending Accounts</h2>
      <div className="grid grid-cols-2 gap-4">
        {tiles.map((t) => <BenefitTile key={t.title} {...t} />)}
      </div>
    </section>
  )
}

/* --------------------- Additional Benefits ----------------------- */

function AdditionalBenefits() {
  const tiles = [
    { icon: ICONS.generalWellbeing, title: 'Health and Wellbeing', subtitle: 'Sharecare' },
    { icon: ICONS.virtualCoaching, title: 'Well360 Virtual Health', subtitle: 'Start a virtual visit' },
    { icon: ICONS.musculoskeletal, title: 'Virtual Physical Care', subtitle: 'SWORD' },
    { icon: ICONS.diabetes, title: 'Diabetes Management', subtitle: 'Onduo' },
  ]
  return (
    <section>
      <h2 className="font-heading text-heading-3 text-ink mb-4">Additional Benefits</h2>
      <div className="grid grid-cols-2 gap-4">
        {tiles.map((t) => <BenefitTile key={t.title} {...t} />)}
      </div>
    </section>
  )
}

/* ----------------------- Shared primitives ----------------------- */

function SectionHeader({ title, action }) {
  return (
    <div className="flex items-baseline justify-between mb-4">
      <h2 className="font-heading text-heading-3 text-ink">{title}</h2>
      {action && (
        <button className="font-heading text-subtitle-2 text-highmark-link hover:underline">
          {action} ›
        </button>
      )}
    </div>
  )
}

function BenefitTile({ icon, title, subtitle }) {
  return (
    <button
      type="button"
      className="bg-white rounded-lg border border-border shadow-card px-4 py-3.5 flex items-center gap-3 hover:border-highmark-primary transition-colors text-left"
    >
      <span className="w-10 h-10 flex items-center justify-center shrink-0">
        <img src={icon} alt="" className="w-9 h-9" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-heading text-subtitle-2 font-semibold text-ink leading-tight truncate">
          {title}
        </p>
        <p className="font-sans text-caption text-ink-subdued leading-tight truncate">
          {subtitle}
        </p>
      </div>
      <ChevronRight className="w-4 h-4 text-ink-subdued shrink-0" />
    </button>
  )
}

function RightRailGroup({ title, items }) {
  return (
    <div className="bg-white rounded-lg border border-border shadow-card p-5">
      <h3 className="font-heading text-subtitle-1 font-semibold text-ink mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href="#"
              className="font-sans text-body-2 text-highmark-primary hover:underline inline-flex items-center gap-1"
            >
              {it.label}
              {it.external ? (
                <span className="text-[10px]">↗</span>
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
