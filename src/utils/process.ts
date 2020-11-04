const parseFloat = (s: string | undefined) => s === undefined ? undefined : Number.parseFloat(s)

export const process = (raw: string) => {
  const results: Line[] = []
  const speakers: Map<string, string> = new Map()
  
  const out = JSON.parse(raw)
  out.results.speaker_labels.segments.forEach(seg => seg.items.map(i => speakers.set(i.start_time, seg.speaker_label)))

  out.results.items.forEach(item => {
    const content = item.alternatives[0]?.content
    if (content) {

      const prior = results.length === 0 ? undefined: results[results.length - 1]
      if (item.start_time === undefined && prior) {
        // puntuation
        prior.words.push({content})
      } else {
        const speaker = speakers.get(item.start_time)
        const word = {content, start: parseFloat(item.start_time), end: parseFloat(item.end_time)}
        const startTime = parseFloat(item.start_time)
        const endTime = parseFloat(item.end_time)
        if (prior?.speaker !== speaker) {
          // new speaker!
          results.push({ speaker, startTime, endTime, words: [word] })
        } else {
          prior.words.push(word)
          prior.endTime = endTime
        }
      }  
    }
  })
  return results
}