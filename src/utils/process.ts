
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
        const word = {content, start: item.start_time, end: item.end_time}
        if (prior?.speaker !== speaker) {
          // new speaker!
          results.push({speaker, startTime: item.start_time, words: [word]})
        } else {
          prior.words.push(word)
        }
      }  
    }
  })
  return results
}