export default function ChatBubble({ from, children }) {
  const isUser = from === 'user'
  if (!isUser) {
    return (
      <div className="w-full text-ink text-[15px] leading-relaxed mb-4 whitespace-pre-wrap font-sans">
        {children}
      </div>
    )
  }
  return (
    <div className="flex w-full justify-end mb-4">
      <div className="max-w-[78%] px-3.5 py-2 rounded-2xl text-[15px] leading-relaxed bg-highmark-primary text-white rounded-br-md font-sans">
        {children}
      </div>
    </div>
  )
}
