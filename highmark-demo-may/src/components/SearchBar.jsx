import { useState } from 'react'

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

// AI entry point shown on both P2 (Benefits) and P3 (Journey). Heading text
// above an input + Search button row. On submit, fires `onSubmit(query)`
// which the host page uses to open the Siderail.
export default function SearchBar({
  heading = 'Get answers for your questions',
  placeholder = 'Ask about your benefits, claims and coverage',
  onSubmit,
}) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    e?.preventDefault?.()
    const text = query.trim()
    if (!text) return
    onSubmit?.(text)
    setQuery('')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h2 className="font-heading text-subtitle-1 font-semibold text-ink mb-2">
        {heading}
      </h2>
      <div className="flex items-center gap-2">
        <div
          className={`flex-1 h-12 rounded-full bg-white border flex items-center px-3 transition-colors ${
            focused ? 'border-highmark-primary' : 'border-border'
          }`}
        >
          <img src={ASSET('AI%20Icon.svg')} alt="" className="w-5 h-5 mx-1 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="flex-1 h-full bg-transparent outline-none font-sans text-body-1 text-ink placeholder:text-ink-subdued"
          />
        </div>
        <button
          type="submit"
          className="h-12 px-5 rounded-full bg-highmark-primary text-white font-sans text-button-2 font-semibold hover:bg-highmark-primary-dark transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  )
}
