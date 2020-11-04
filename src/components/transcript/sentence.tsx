import { Typography } from "antd"
import React from "react"
import shortid from "shortid"
import _ from "lodash"

const { Paragraph } = Typography

interface SentenceProps {
  words: Word[]
  highlight?: number
}


const Sentence: React.FunctionComponent<SentenceProps> = ({ words, highlight }) => {
  const ref = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView(false)
    }
  }, [highlight])


  let highlightForward = false
  let prior = ""
  const keyedWords = words.map(w => {
    highlightForward = highlightForward || highlight !== undefined && w.start !== undefined && w.start > highlight
    // must set key to random if being highlighted to className is re-applied
    const key = highlight ? shortid() : w.start?.toString() || prior + w.content
    prior = key
    return {
      ...w,
      key,
      className: highlightForward ? "highlight" : undefined
    }
  })

  return(
    <div ref={highlight === undefined ? undefined : ref}>
      <Paragraph >
        { keyedWords.map(w =>
            <span
              key={w.key}
              className={w.className}
            >
              {w.start ? ` ${w.content}` : w.content}
            </span>)
          }
      </Paragraph>
    </div>
  )
}

export default React.memo(Sentence, (a, b) => _.isEqual(a, b))

