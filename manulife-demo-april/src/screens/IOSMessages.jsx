import { ChevronLeft, Edit, Search } from 'lucide-react'

function MessageRow({ avatar, name, preview, time, unread, onTap }) {
  return (
    <button
      onClick={onTap}
      className="w-full flex items-start gap-3 px-4 py-3 active:bg-gray-100 text-left"
    >
      <div className="w-2 h-2 rounded-full bg-blue-500 mt-5 shrink-0" style={{ visibility: unread ? 'visible' : 'hidden' }} />
      <div className={`w-12 h-12 rounded-full ${avatar} shrink-0 flex items-center justify-center text-white font-bold text-[15px]`}>
        {name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0 border-b border-gray-200 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-ink font-semibold text-[15px]">{name}</span>
          <span className="text-ink-soft text-[12px]">{time}</span>
        </div>
        <div className="text-ink-soft text-[14px] leading-snug mt-0.5 line-clamp-2">{preview}</div>
      </div>
    </button>
  )
}

export default function IOSMessages({ onTapResults }) {
  return (
    <div className="h-full w-full bg-white flex flex-col">

      <div className="px-4 pt-1 pb-3 flex items-center justify-between">
        <div className="flex items-center text-blue-500">
          <ChevronLeft size={26} strokeWidth={2.25} />
          <span className="text-[17px]">Edit</span>
        </div>
        <Edit size={20} className="text-blue-500" strokeWidth={2.25} />
      </div>

      <div className="px-4 pb-3">
        <h1 className="text-ink font-bold text-[32px] leading-none">Messages</h1>
      </div>

      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <Search size={16} className="text-ink-soft" />
          <span className="text-ink-soft text-[15px]">Search</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <MessageRow
          avatar="bg-manulife-green"
          name="Manulife"
          preview="Your results are in! Log into your Manulife app to view."
          time="Now"
          unread
          onTap={onTapResults}
        />
        <MessageRow
          avatar="bg-blue-500"
          name="Laura"
          preview="Don't forget dinner Sunday 😊"
          time="2h ago"
          unread={false}
        />
      </div>
    </div>
  )
}
