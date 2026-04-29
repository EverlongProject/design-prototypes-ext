import { ChevronDown, Settings as SettingsIcon } from 'lucide-react'

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'getCare', label: 'Get Care' },
  { id: 'journey', label: 'Journey' },
  { id: 'support', label: 'Support' },
]

// Standalone top nav bar used by P2 (Benefits) and P3 (Journey). Different
// from P1's embedded TopNav. Active item gets the blue underline + bold
// treatment. `onNavigate(pageId)` is fired when the user picks an item.
export default function MyHighmarkNav({ activePage, onNavigate }) {
  return (
    <header className="w-full bg-white border-b border-border">
      <div className="max-w-[1100px] mx-auto px-8 h-[60px] flex items-center">
        <img
          src={ASSET('Highmark-Logo.svg')}
          alt="Highmark West Virginia"
          className="h-7 w-auto shrink-0"
        />

        <nav className="flex-1 flex items-center justify-center gap-10">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activePage
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate?.(item.id)}
                className={`relative h-[60px] flex items-center font-sans text-button-2 transition-colors ${
                  isActive
                    ? 'text-highmark-primary font-semibold'
                    : 'text-ink hover:text-highmark-primary'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-highmark-primary rounded-t-sm" />
                )}
              </button>
            )
          })}
        </nav>

        <button
          type="button"
          className="flex items-center gap-1.5 text-ink font-sans text-button-2 hover:text-highmark-primary"
        >
          <SettingsIcon className="w-4 h-4" />
          <span>Settings</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
