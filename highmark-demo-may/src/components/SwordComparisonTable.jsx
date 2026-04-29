// Standalone Sword vs in-person cost comparison strip. Used inline inside
// SwordPreviewCard (default) and as a standalone media block when the script
// wants to show the comparison after additional copy (P1 Beat 8).
//
// Props:
//   withHeading — when true, renders a divider + "Comparing both options"
//     heading above the table. Used for the standalone P1 Beat 8 placement.
//     Defaults to false so the inline-in-card use stays unchanged.

export default function SwordComparisonTable({ withHeading = false }) {
  return (
    <div className="w-full">
      {withHeading && (
        <>
          <hr className="border-border mt-3 mb-7" />
          <p className="font-heading text-[19px] font-semibold text-ink leading-tight mb-3">
            Comparing both options
          </p>
        </>
      )}
      <div className="rounded-md border border-border overflow-hidden text-[14px] font-sans bg-white">
        <div className="grid grid-cols-3 bg-surface-secondary text-ink-subdued font-semibold">
          <div className="px-2 py-1.5" />
          <div className="px-2 py-1.5 text-center">Sword</div>
          <div className="px-2 py-1.5 text-center">In-person</div>
        </div>
        <div className="grid grid-cols-3 border-t border-border">
          <div className="px-2 py-1.5 text-ink-subdued font-semibold">Cost (6 sessions)</div>
          <div className="px-2 py-1.5 text-center font-semibold text-success">$0</div>
          <div className="px-2 py-1.5 text-center text-ink">~$150*</div>
        </div>
        <div className="grid grid-cols-3 border-t border-border">
          <div className="px-2 py-1.5 text-ink-subdued font-semibold">Where</div>
          <div className="px-2 py-1.5 text-center text-ink">Home</div>
          <div className="px-2 py-1.5 text-center text-ink">Clinic</div>
        </div>
      </div>
      <p className="text-[12px] text-ink-subdued mt-1.5 px-1">*Deductible met</p>
    </div>
  )
}
