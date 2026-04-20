import { Menu, Flame, Heart, Video, Headphones, ArrowUpRight, Eye, Award } from 'lucide-react'
import CoverageTile from '../components/CoverageTile.jsx'
import ClaimCard from '../components/ClaimCard.jsx'
import BottomNav from '../components/BottomNav.jsx'

const HEADER_DARK = '#1A1D29'
const CARD_RADIUS = 'rounded-lg'

function MapleLeaf({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2l1.2 3.6 3.8-.8-1.4 3.6 3.4 2-3 2.2 1 3.6-3.6-1-.4 3.8-2-3-2 3-.4-3.8-3.6 1 1-3.6-3-2.2 3.4-2L5 4.8l3.8.8L12 2z" />
    </svg>
  )
}

function TopHeader() {
  return (
    <div className="flex items-center justify-between px-4 pt-safe h-14">
      <Menu size={26} className="text-white" strokeWidth={2.25} />
      <div className="flex items-center gap-2">
        <span className="text-white text-[15px]">Jenn Wright</span>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A574] to-[#8B5A3C] border border-white/20" />
      </div>
    </div>
  )
}

function PointsCard() {
  const points = 475
  const ticks = [200, 400, 600, 800, 1000]
  const markerPct = ((points - ticks[0]) / (ticks[ticks.length - 1] - ticks[0])) * 100

  return (
    <div className={`bg-manulife-green ${CARD_RADIUS} p-4`}>
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white rounded-full flex items-center gap-1.5 pl-1 pr-3 py-1">
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <MapleLeaf size={14} className="text-red-500" />
          </div>
          <span className="text-ink text-[14px] font-bold">{points} pts</span>
        </div>
        <div className="bg-manulife-green-dark/40 rounded-full flex items-center gap-1 px-3 py-1">
          <Flame size={14} className="text-orange-400" fill="currentColor" strokeWidth={0} />
          <span className="text-white text-[13px] font-bold">15 day streak</span>
        </div>
      </div>

      <div className="relative h-2 mb-1">
        <div className="absolute inset-y-0 left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-white/30 rounded-full" />
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-manulife-green-dark rounded-full"
          style={{ width: `${markerPct}%` }}
        />
        {ticks.map((t) => {
          const leftPct = ((t - ticks[0]) / (ticks[ticks.length - 1] - ticks[0])) * 100
          const filled = points >= t
          return (
            <div
              key={t}
              className={`absolute top-1/2 w-3 h-3 rounded-full border-2 ${
                filled ? 'bg-manulife-green-dark border-manulife-green-dark' : 'bg-white border-white'
              }`}
              style={{ left: `${leftPct}%`, transform: 'translate(-50%, -50%)' }}
            />
          )
        })}
        <div
          className="absolute top-1/2 w-7 h-7 rounded-full bg-white flex items-center justify-center"
          style={{ left: '100%', transform: 'translate(-50%, -50%)' }}
        >
          <Award size={16} className="text-manulife-green" strokeWidth={2.25} />
        </div>
      </div>
      <div className="flex justify-between mt-2 text-[12px] text-white font-semibold px-0.5">
        {ticks.map((t) => <span key={t}>{t}</span>)}
      </div>

      <div className={`mt-4 bg-manulife-green-dark/30 ${CARD_RADIUS} px-3 py-2.5 text-white text-[13px] leading-snug`}>
        Earn up to <span className="font-bold">50 pts</span> daily by completing your check-ins and lessons!
      </div>
    </div>
  )
}

function SectionHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-3 px-4">
      <h2 className="text-ink font-bold text-[20px]">{title}</h2>
      {action && (
        <span className="text-manulife-green text-[14px] font-semibold">{action}</span>
      )}
    </div>
  )
}

function RecommendedCard() {
  return (
    <div className={`bg-white border border-stroke ${CARD_RADIUS} overflow-hidden`}>
      <div className="h-[189px] bg-gradient-to-br from-[#F9D5C8] via-[#F3E8D0] to-[#CDE6D7] flex items-center justify-center">
        <Heart size={64} className="text-manulife-green/40" strokeWidth={1.5} />
      </div>
      <div className="p-4">
        <div className="text-ink font-bold text-[17px] leading-snug mb-2">
          Your family is growing. Your coverage can too.
        </div>
        <div className="text-ink-soft text-[14px] leading-snug mb-4">
          We can help you make sure your growing family is protected and support you through every step of the journey.
        </div>
        <button className="inline-flex items-center gap-1.5 border border-ink rounded-full px-4 py-1.5 text-ink text-[14px] font-semibold">
          <span>Learn more</span>
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

function HelpCard({ title, Icon, tint }) {
  return (
    <div className={`shrink-0 w-[180px] bg-white border border-stroke ${CARD_RADIUS} p-4`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${tint}`}>
        <Icon size={18} strokeWidth={2} />
      </div>
      <div className="text-ink font-semibold text-[14px] leading-tight">{title}</div>
    </div>
  )
}

function TodayActivityCard() {
  return (
    <div className={`bg-white border border-stroke ${CARD_RADIUS} p-4`}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <Heart size={14} className="text-manulife-green" fill="currentColor" strokeWidth={0} />
        <div className="text-ink-soft text-[12px] font-semibold">Growing Your Family</div>
      </div>
      <div className="text-ink font-semibold text-[16px] leading-snug">
        Prepare for your baby's first weeks at home
      </div>
    </div>
  )
}

export default function HomeScreen() {
  return (
    <div className="h-full w-full flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          <div style={{ backgroundColor: HEADER_DARK }}>
            <TopHeader />
            <div className="h-16" />
          </div>
          <div className="px-4 -mt-16">
            <PointsCard />
          </div>
        </div>

        <div className="pt-12 space-y-12">
          <section>
            <SectionHeader title="Recommended for you" />
            <div className="px-4">
              <RecommendedCard />
            </div>
          </section>

          <section>
            <SectionHeader title="Get the help you need" />
            <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar">
              <HelpCard title="Employee and family support" Icon={Video} tint="bg-teal-100 text-teal-700" />
              <HelpCard title="Virtual care consult" Icon={Headphones} tint="bg-orange-100 text-orange-600" />
              <HelpCard title="Vision care services" Icon={Eye} tint="bg-blue-100 text-blue-600" />
              <div className="shrink-0 w-4" />
            </div>
          </section>

          <section>
            <SectionHeader title="Today's activities" action="View all" />
            <div className="px-4 -mt-1 mb-2 text-ink-soft text-[14px]">6 available activities</div>
            <div className="px-4">
              <TodayActivityCard />
            </div>
          </section>

          <section>
            <SectionHeader title="Recent Claims" action="View all" />
            <div className="px-4">
              <ClaimCard
                date="Sep 7, 2024"
                status="Approved"
                pharmacy="Shoppers Drug Mart"
                forName="Jenn Wright"
                drug="Prenatal Vitamins"
                cost="$6.50"
              />
            </div>
          </section>

          <section className="pb-6">
            <SectionHeader title="Group Benefits" />
            <div className="px-4 space-y-3">
              <CoverageTile title="Health Benefits" iconKey="health" spent={380} total={2000} remaining={1620} />
              <CoverageTile title="Dental Benefits" iconKey="dental" spent={450} total={1500} remaining={1050} />
              <CoverageTile title="Paramedical Benefits" iconKey="paramedical" spent={400} total={1000} remaining={600} />
            </div>
          </section>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  )
}
