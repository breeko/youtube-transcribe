import { Typography } from "antd"
import React from "react"
import shortid from "shortid"
import _ from "lodash"
import { getWordDisplay } from "../../utils/utils"

const { Paragraph } = Typography

interface SentenceProps {
  text: string
  highlight?: number
  highlightWord: string | undefined
}

interface SearchResult {
  start: number
  end: number
}

const indexes = (source: string, find: string): SearchResult[] => {
  if (!source) {
    return []
  }
  const result = [];
  for (let i = 0; i < source.length; ++i) {
    if (source.substring(i, i + find.length).toLowerCase() === find.toLowerCase()) {
      result.push({start: i, end: i + find.length})
    }
  }
  return result
}

const wrapSearchResults = (source: string, find: string) => {
  const matches = indexes(source, find).reverse()

  const outputs: JSX.Element[] = []
  let prior = 0
  while (matches.length > 0) {
    const match = matches.pop()
    if (match.start !== 0 && prior === 0) {
      // first set of chars, not a match
      // outputs.push(f.slice(0, match.start - 1))
    }
    if (prior != match.start) {
      // non match
      outputs.push(<span key={source.slice(0, match.start)}>{source.slice(prior, match.start)}</span>)
    }
    // match
    outputs.push(<span key={source.slice(0, match.end)} className="highlight">{source.slice(match.start, match.end)}</span>)
    prior = match.end
  }
  if (prior < source.length - 1) {
    outputs.push(<span key={source}>{source.slice(prior, source.length)}</span>)
  }
  return outputs
}

const Sentence: React.FunctionComponent<SentenceProps> = ({ text, highlight, highlightWord }) => {
  const ref = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      })
    }
  }, [highlight])

  let highlightForward = false

  let inner: JSX.Element[] = []
  const combined = text

  // TODO: Figure out why this is too slow!
  if (highlightWord !== undefined) {
    inner = wrapSearchResults(combined, highlightWord)
  } else if (highlight === undefined) {
    inner = [<span key="1">{combined}</span>]
  } else {
    // must set random key so it gets re-rendered w/ the fade
    inner = [<span key={shortid()} className="highlight-fade">{combined}</span>]
  }

  return(
    <div ref={highlight === undefined ? undefined : ref} className="transcript-sentence">
      <Paragraph >
        { inner }
      </Paragraph>
    </div>
  )
}

export default React.memo(Sentence, (a, b) => _.isEqual(a, b))
