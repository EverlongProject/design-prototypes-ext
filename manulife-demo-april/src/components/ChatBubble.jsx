export default function ChatBubble({ from, children }) {
  const isUser = from === 'user'

  if (!isUser) {
    return (
      <div className="w-full text-ink text-[15px] leading-snug mb-3 whitespace-pre-wrap">
        {children}
      </div>
    )
  }

  return (
    <div className="flex w-full justify-end mb-3">
      <div className="max-w-[78%] px-4 py-2.5 rounded-2xl text-[15px] leading-snug bg-manulife-green text-white rounded-br-md">
        {children}
      </div>
    </div>
  )
}
