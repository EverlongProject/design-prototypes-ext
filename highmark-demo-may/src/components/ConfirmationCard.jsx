import { Check, MapPin, Calendar, Mail, DollarSign } from 'lucide-react'

// Booking confirmation card. Used for both PT booking (Beat 11) and the
// colonoscopy callback (Beat 13). `extras` is an optional array of strings
// appended after the calendar invite line (e.g. "Prep plan will land in your inbox").

export default function ConfirmationCard({
  title = 'Booked',
  doctor,
  practice,
  when,
  cost,
  inviteEmail,
  extras = [],
}) {
  return (
    <div className="w-full rounded-lg border border-success/30 bg-white shadow-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-success/10 border-b border-success/20">
        <span className="w-6 h-6 rounded-full bg-success text-white flex items-center justify-center shrink-0">
          <Check className="w-3.5 h-3.5" strokeWidth={3} />
        </span>
        <span className="font-heading text-[15px] font-semibold text-ink">{title}</span>
      </div>

      <div className="px-4 py-3 space-y-2 font-sans text-[15px] text-ink leading-snug">
        <p className="font-semibold text-[19px] leading-tight">{doctor}</p>

        <Row icon={<Calendar className="w-3.5 h-3.5" />} text={when} />
        {practice && <Row icon={<MapPin className="w-3.5 h-3.5" />} text={practice} />}
        {cost != null && <Row icon={<DollarSign className="w-3.5 h-3.5" />} text={cost} />}
        {inviteEmail && (
          <Row icon={<Mail className="w-3.5 h-3.5" />} text={`Calendar invite sent to ${inviteEmail}`} />
        )}
        {extras.map((line, i) => (
          <Row key={i} icon={<Check className="w-3.5 h-3.5" />} text={line} />
        ))}
      </div>
    </div>
  )
}

function Row({ icon, text }) {
  return (
    <div className="flex items-start gap-2 text-ink-subdued">
      <span className="text-highmark-primary shrink-0 mt-0.5">{icon}</span>
      <span className="text-ink">{text}</span>
    </div>
  )
}
