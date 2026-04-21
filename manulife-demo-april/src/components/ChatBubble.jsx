export default function ChatBubble({ from, children }) {
  const isUser = from === 'user'

  if (!isUser) {
    return (
      <div className="w-full text-ink text-[17px] leading-normal mb-5 whitespace-pre-wrap">
        {children}
      </div>
    )
  }

  return (
    <div className="flex w-full justify-end mb-5">
      <div className="max-w-[78%] px-4 py-2.5 rounded-2xl text-[17px] leading-normal bg-manulife-green text-white rounded-br-md">
        {children}
      </div>
    </div>
  )
}
