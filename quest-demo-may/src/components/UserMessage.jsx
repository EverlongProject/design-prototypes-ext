export default function UserMessage({ text }) {
  return (
    <div className="flex w-full justify-end mb-4">
      <div className="max-w-[78%] px-3.5 py-2 rounded-2xl rounded-br-md bg-quest-primary-dark text-white text-[15px] leading-relaxed font-sans whitespace-pre-wrap">
        {text}
      </div>
    </div>
  )
}
