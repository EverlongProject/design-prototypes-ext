import ManulifeWidget from '../components/ManulifeWidget.jsx'

function MailIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-300 to-blue-500 flex items-center justify-center">
      <svg width="32" height="22" viewBox="0 0 32 22" fill="none">
        <rect width="32" height="22" rx="3" fill="white" />
        <path d="M2 4l14 10L30 4" stroke="#60a5fa" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}
function ClockIcon() {
  return (
    <div className="w-full h-full bg-black flex items-center justify-center relative">
      <div className="w-9 h-9 rounded-full bg-white relative">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute left-1/2 top-0 w-[1px] h-1 bg-black" style={{ transform: `translateX(-50%) rotate(${i * 30}deg)`, transformOrigin: '50% 18px' }} />
        ))}
        <div className="absolute left-1/2 top-1/2 w-[1px] h-[11px] bg-black origin-bottom" style={{ transform: 'translate(-50%, -100%) rotate(30deg)' }} />
        <div className="absolute left-1/2 top-1/2 w-[1.5px] h-[8px] bg-black origin-bottom" style={{ transform: 'translate(-50%, -100%) rotate(0deg)' }} />
        <div className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-orange-500 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  )
}
function MapsIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-200 via-amber-100 to-blue-300 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
          <path d="M11 0C4.9 0 0 4.9 0 11c0 7 11 15 11 15s11-8 11-15c0-6.1-4.9-11-11-11z" fill="#ef4444" />
          <circle cx="11" cy="11" r="4" fill="white" />
        </svg>
      </div>
    </div>
  )
}
function WeatherIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-400 to-blue-600 flex items-end justify-center pb-2">
      <svg width="36" height="22" viewBox="0 0 36 22" fill="white">
        <circle cx="10" cy="8" r="6" fill="#fde047" />
        <ellipse cx="20" cy="16" rx="14" ry="5" fill="white" />
      </svg>
    </div>
  )
}
function ListIcon({ accent = '#ef4444' }) {
  return (
    <div className="w-full h-full bg-white p-2 flex flex-col justify-center gap-1.5">
      {[accent, '#3b82f6', '#f59e0b'].map((c, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full border-2" style={{ borderColor: c }} />
          <div className="flex-1 h-[2px] bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  )
}
function NotesIcon() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="h-3 bg-yellow-400" />
      <div className="flex-1 p-1.5 flex flex-col gap-1 justify-start pt-1.5">
        <div className="h-[2px] bg-gray-300 rounded w-full" />
        <div className="h-[2px] bg-gray-300 rounded w-4/5" />
        <div className="h-[2px] bg-gray-300 rounded w-3/5" />
      </div>
    </div>
  )
}
function StocksIcon() {
  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
        <polyline points="0,18 8,12 14,16 22,6 30,10 40,2" stroke="#10b981" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}
function NewsIcon() {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center">
      <span className="text-red-600 font-black text-[28px] italic" style={{ fontFamily: 'serif' }}>N</span>
    </div>
  )
}
function HealthIcon() {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center">
      <svg width="28" height="26" viewBox="0 0 28 26" fill="#ef4444">
        <path d="M14 25S2 17 2 9a6 6 0 0112-2 6 6 0 0112 2c0 8-12 16-12 16z" />
      </svg>
    </div>
  )
}
function HomeIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-orange-300 to-amber-500 flex items-end justify-center pb-1">
      <svg width="34" height="28" viewBox="0 0 34 28" fill="#fff">
        <path d="M17 2L2 14h3v12h8v-7h8v7h8V14h3L17 2z" stroke="#a16207" strokeWidth="1" />
      </svg>
    </div>
  )
}
function WalletIcon() {
  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <svg width="32" height="22" viewBox="0 0 32 22">
        <rect x="0" y="6" width="32" height="14" rx="2" fill="#22c55e" />
        <rect x="2" y="3" width="28" height="14" rx="2" fill="#f97316" />
        <rect x="4" y="0" width="24" height="14" rx="2" fill="#64748b" />
      </svg>
    </div>
  )
}
function SettingsIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="white">
        <path d="M15 0l2 3 3.5-1 .5 3.5 3.5.5-1 3.5 3 2-3 2 1 3.5-3.5.5-.5 3.5-3.5-1-2 3-2-3-3.5 1-.5-3.5L2 21l1-3.5-3-2 3-2-1-3.5 3.5-.5.5-3.5 3.5 1 2-3z" />
        <circle cx="15" cy="15" r="4" fill="#6b7280" />
      </svg>
    </div>
  )
}
function PhoneIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-green-400 to-green-600 flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M20 15.5c-1.2 0-2.4-.2-3.5-.5-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1.1-1-1.1z" />
      </svg>
    </div>
  )
}
function SafariIcon() {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center relative">
      <div className="w-12 h-12 rounded-full border-[3px] border-gray-300 relative">
        <div className="absolute inset-1 rounded-full bg-blue-500 flex items-center justify-center">
          <div className="w-6 h-1 bg-red-500 rotate-45" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
        </div>
      </div>
    </div>
  )
}
function MessagesIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-green-400 to-green-500 flex items-center justify-center">
      <svg width="30" height="28" viewBox="0 0 30 28" fill="white">
        <path d="M15 0C6.7 0 0 5.4 0 12c0 3.9 2.4 7.4 6 9.6V28l5.6-3.2c1.1.1 2.2.2 3.4.2 8.3 0 15-5.4 15-12S23.3 0 15 0z" />
      </svg>
    </div>
  )
}
function MusicIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center">
      <svg width="24" height="28" viewBox="0 0 24 28" fill="white">
        <path d="M23 0l-16 3v19c0 2.2-1.8 4-4 4s-3-1.3-3-3 1.3-3 3-3c.7 0 1.4.2 2 .6V6l14-2.6v13c0 2.2-1.8 4-4 4s-3-1.3-3-3 1.3-3 3-3c.7 0 1.4.2 2 .6V0z" />
      </svg>
    </div>
  )
}

const APP_ROWS = [
  [
    { name: 'Mail', Icon: MailIcon },
    { name: 'Clock', Icon: ClockIcon },
    { name: 'Maps', Icon: MapsIcon },
    { name: 'Weather', Icon: WeatherIcon }
  ],
  [
    { name: 'Reminders', Icon: () => <ListIcon accent="#ef4444" /> },
    { name: 'Notes', Icon: NotesIcon },
    { name: 'Stocks', Icon: StocksIcon },
    { name: 'News', Icon: NewsIcon }
  ],
  [
    { name: 'Health', Icon: HealthIcon },
    { name: 'Home', Icon: HomeIcon },
    { name: 'Wallet', Icon: WalletIcon },
    { name: 'Settings', Icon: SettingsIcon }
  ]
]

function AppIcon({ name, Icon }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-[60px] h-[60px] rounded-[14px] overflow-hidden shadow-sm">
        <Icon />
      </div>
      <span className="text-white text-[11px] drop-shadow">{name}</span>
    </div>
  )
}

export default function IOSHome({ onOpenManulife }) {
  return (
    <div
      className="h-full w-full relative flex flex-col"
      style={{
        background: 'linear-gradient(170deg, #E8A87C 0%, #D98F6B 25%, #7A5A8E 55%, #2C3E5F 100%)'
      }}
    >

      <div className="flex-1 px-4 pt-2 flex flex-col gap-5 overflow-hidden">
        <button onClick={onOpenManulife} className="active:scale-[0.98] transition-transform">
          <ManulifeWidget />
        </button>
        <div className="text-white text-[11px] text-center -mt-3 drop-shadow">Manulife</div>

        <div className="flex flex-col gap-5 mt-1">
          {APP_ROWS.map((row, i) => (
            <div key={i} className="grid grid-cols-4">
              {row.map((app) => (
                <div key={app.name} className="flex justify-center">
                  <AppIcon {...app} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-2" style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}>
        <div className="flex justify-center gap-1.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
        <div className="bg-white/15 backdrop-blur-xl rounded-[28px] p-2.5 grid grid-cols-4">
          {[PhoneIcon, SafariIcon, MessagesIcon, MusicIcon].map((Icon, i) => (
            <div key={i} className="flex justify-center">
              <div className="w-[60px] h-[60px] rounded-[14px] overflow-hidden">
                <Icon />
              </div>
            </div>
          ))}
        </div>
        <div className="h-1 w-32 bg-white rounded-full mx-auto mt-3" />
      </div>
    </div>
  )
}
