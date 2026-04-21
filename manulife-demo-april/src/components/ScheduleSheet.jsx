export default function ScheduleSheet({ onHelpMeSchedule }) {
  return (
    <div>
      <div className="-mx-5 -mt-1 mb-4 rounded-2xl overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}assets/niaHealth.png`}
          alt="Nia Health"
          className="w-full h-44 object-cover"
        />
      </div>

      <div className="flex mb-3">
        <span className="inline-flex items-center gap-1.5 bg-gray-100 text-ink text-[12px] font-semibold rounded-full pl-1 pr-2.5 py-1">
          <img
            src={`${import.meta.env.BASE_URL}assets/Aeroplan.png`}
            alt=""
            className="w-4 h-4 rounded-full object-cover"
          />
          Earn 500 Aeroplan points
        </span>
      </div>

      <div className="text-ink font-bold text-[22px] leading-snug mb-2">
        Nia Health Screening
      </div>

      <div className="text-ink-soft text-[14px] leading-snug mb-3">
        Most checkups miss more than they catch. A NIA Health Screening tests 150+ biomarkers, giving you a personalized picture of your health before symptoms show up, with guidance from a Canadian clinician on what to do next.
      </div>

      <div className="text-ink-soft text-[14px] leading-snug mb-5">
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
