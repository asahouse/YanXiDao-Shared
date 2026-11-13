export interface TextSegment {
  text: string
  isLink: boolean
}

/**
 * Splits plain text into text and safe http(s) URL segments for rendering without v-html.
 */
export function splitTextWithLinks(input: string): TextSegment[] {
  if (!input) return []
  const regex = /(https?:\/\/[^\s<>"']+)/g
  const segments: TextSegment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: input.slice(lastIndex, match.index), isLink: false })
    }
    segments.push({ text: match[0], isLink: true })
    lastIndex = regex.lastIndex
  }

  if (lastIndex < input.length) {
    segments.push({ text: input.slice(lastIndex), isLink: false })
  }

  return segments
}
