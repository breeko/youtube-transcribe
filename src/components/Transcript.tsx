import { Col, Divider, Row, Typography } from "antd"
import _ from "lodash"
import React, { useState } from "react"
import shortid from "shortid"
import { parseSeconds } from "../utils/timeUtils"


const { Paragraph } = Typography

interface TranscriptProps {
  lines: Line[]
  speakerMapping: {[speaker: string]: string}
  jumpToSeconds?: number
  setSeconds: (s: number) => void
}

const scrollToRefObject = (ref: React.MutableRefObject<HTMLDivElement>) => {
  if (ref && ref.current)
   ref.current.scrollIntoView(false)
   window.scrollBy({top: 50})
}

const Transcript: React.FunctionComponent<TranscriptProps> = ({ jumpToSeconds, setSeconds, lines, speakerMapping }) => {
  const ref = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    if (ref.current !== undefined) {
      scrollToRefObject(ref)
    }
  }, [ref, jumpToSeconds])


  const dialogue = React.useMemo(() =>
    lines.map(res => ({key: shortid(), startTime: res.startTime, speaker: `${res.speaker}`, sentence: res.words
      // remove spaces preceeding punctuation
      .map((w, idx) => idx === 0 || w.start === undefined ? w.content : ` ${w.content}`).join("")}))
  , [lines])

  const firstSpeaker = _.min(Object.keys(speakerMapping))

  const jumpMatch = React.useMemo(() => {
    const j = jumpToSeconds !== undefined ?
      _.chain(dialogue).map(d => d.startTime).reverse().find(t => t < jumpToSeconds).value() :
      undefined
    return j
  }, [jumpToSeconds])

  return(
    <React.Fragment >
      <div className="transcript-container">
        {dialogue.map(({key, speaker, sentence, startTime}) =>
          <Row key={key}>
            <Col xs={8}>
              <Paragraph className="pointer">
                <div onClick={() => setSeconds(startTime)}>
                  [{parseSeconds(startTime)}]: {speakerMapping[speaker] || speaker}
                </div>
              </Paragraph>
            </Col>
            <Col
              ref={startTime === jumpMatch ? ref : undefined}
              xs={16}
              className={
                startTime === jumpMatch ? "bold " : "" +
                firstSpeaker === speaker ? "" : "italics" }
            >
              {sentence}
            </Col>
            <Divider />
          </Row>
        )}
      </div>
    </React.Fragment>
  )
}

export default Transcript
