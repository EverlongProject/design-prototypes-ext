import { ArrowRight } from 'lucide-react'

export default function PrimaryCTA({ children }) {
  return (
    <div className="w-full bg-manulife-green text-white rounded-full py-3.5 px-5 flex items-center justify-center gap-2 font-semibold text-base shadow-card">
      <span>{children}</span>
      <ArrowRight size={18} />
    </div>
  )
}
