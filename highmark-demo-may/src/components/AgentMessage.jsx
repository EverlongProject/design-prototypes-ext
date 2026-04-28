import StreamingText from './StreamingText.jsx'

// Agent message: full-width text (no bubble), optional embedded media.
// `mediaPosition` controls whether the media renders above or below the text.
// `streaming` controls whether we type-on or render instantly (e.g. for messages
// already streamed before a minimize/restore).
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
