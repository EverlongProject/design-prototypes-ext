import { useEffect, useState } from 'react'

const MS_PER_CHAR = 12
const MIN_WORD_MS = 20

export default function StreamingText({ text, onDone }) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    setShown('')
    const words = text.split(' ')
    let i = 0
    let cancelled = false

    function next() {
      if (cancelled) return
      if (i >= words.length) {
        onDone?.()
        return
      }
      const word = words[i++]
      const delay = Math.max(MIN_WORD_MS, word.length * MS_PER_CHAR)
      setTimeout(() => {
        if (cancelled) return
        setShown((s) => (s ? s + ' ' : '') + word)
        next()
      }, delay)
    }

    next()
    return () => {
      cancelled = true
    }
  }, [text])

  const html = shown.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}
