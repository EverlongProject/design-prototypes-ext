import StreamingText from './StreamingText.jsx'

export default function AgentMessage({
  text,
  media = null,
  mediaPosition = 'below',
  streaming = false,
  onDone,
}) {
  const hasText = !!(text && text.length)
  return (
    <div className="w-full mb-4">
      {media && mediaPosition === 'above' && (
        <div className={hasText ? 'mb-3' : ''}>{media}</div>
      )}
      {hasText && (
        <div className="font-sans text-[15px] leading-relaxed text-ink whitespace-pre-wrap">
          {streaming ? (
            <StreamingText text={text} onDone={onDone} />
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html: text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          )}
        </div>
      )}
      {media && mediaPosition === 'below' && !streaming && (
        <div className={hasText ? 'mt-3' : ''}>{media}</div>
      )}
    </div>
  )
}
