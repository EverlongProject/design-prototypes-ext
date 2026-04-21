export default function MemberCard({ name, memberSince }) {
  return (
    <div className="my-2 flex flex-col items-center">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4A574] to-[#8B5A3C] border-2 border-white" />
      <div className="text-ink font-bold text-[15px] mt-1.5">{name}</div>
      <div className="text-ink-soft text-[12px]">Manulife member since {memberSince}</div>
    </div>
  )
}
