export default function ScheduleSheet({ onHelpMeSchedule }) {
  return (
    <div>
      <div className="flex items-center justify-center mb-3">
        <div className="w-16 h-16 rounded-full bg-[#5B6B2E] flex items-center justify-center">
          <div className="text-[#D8E28F] leading-[0.9] text-center" style={{ fontFamily: 'serif' }}>
            <div className="text-[14px] italic font-bold">nia</div>
            <div className="text-[9px] tracking-wide">health</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-3">
        <span className="bg-gray-100 text-ink text-[12px] font-semibold rounded-full px-3 py-1">
          Suggested next action
        </span>
      </div>

      <div className="text-ink font-bold text-[22px] leading-snug text-center mb-2">
        Nia Health Screening
      </div>

      <div className="text-ink-soft text-[14px] leading-snug text-center mb-3">
        Most checkups miss more than they catch. A NIA Health Screening tests 150+ biomarkers, giving you a personalized picture of your health before symptoms show up, with guidance from a Canadian clinician on what to do next.
      </div>

      <div className="text-ink-soft text-[14px] leading-snug text-center mb-5">
        Get a comprehensive look at your heart, metabolism, hormones, and more, with a personalized action plan written just for you.
      </div>

      <button
        onClick={onHelpMeSchedule}
        className="w-full bg-manulife-green text-white rounded-full py-3.5 font-semibold text-[16px] mb-3 active:opacity-80"
      >
        Help me schedule
      </button>

      <button className="w-full text-ink font-semibold text-[15px] py-2">
        Schedule on my own
      </button>
    </div>
  )
}
