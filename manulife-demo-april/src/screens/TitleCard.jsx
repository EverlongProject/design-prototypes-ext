export default function TitleCard({ label, description, stageLabel = 'Stage 1' }) {
  return (
    <div className="h-full w-full bg-[#1E293B] text-white flex items-center justify-center px-8">
      <div className="text-center max-w-sm">
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/60 mb-3">
          {stageLabel}
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-4">{label}</h1>
        {description && (
          <p className="text-white/75 text-base leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  )
}
