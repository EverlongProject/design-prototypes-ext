export default function Chip({ label, primary = false }) {
  return (
    <div
      className={[
        'inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium border transition-colors',
        primary
          ? 'bg-manulife-green text-white border-manulife-green'
          : 'bg-white text-manulife-green border-manulife-green'
      ].join(' ')}
    >
      {label}
    </div>
  )
}
