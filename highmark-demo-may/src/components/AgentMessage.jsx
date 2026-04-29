import StreamingText from './StreamingText.jsx'

// Agent message: full-width text (no bubble), optional embedded media.
// `mediaPosition` controls whether the media renders above or below the text.
// `streaming` controls whether we type-on or render instantly (e.g. for messages
// already streamed before a minimize/restore).
// Optional `divider` renders an <hr> at the top of the message — used to
// signal a topic shift (e.g. P1 Beat 11's "Closing the loop").
// Optional `heading` renders a styled heading line above the text body.
export default function AgentMessage({
  text,
  media = null,
  mediaPosition = 'below',
  streaming = false,
  divider = false,
  heading,
  onDone,
}) {
  const hasText = !!(text && text.length)
  return (
    <div className="w-full mb-4">
      {divider && <hr className="border-border mb-4" />}
      {media && mediaPosition === 'above' && (
        <div className={hasText || heading ? 'mb-3' : ''}>{media}</div>
      )}
      {heading && (
        <p className="font-heading text-[19px] font-semibold text-ink leading-tight mb-2">
          {heading}
        </p>
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
