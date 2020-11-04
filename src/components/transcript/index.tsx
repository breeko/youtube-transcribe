import { Col, Divider, Row, Typography } from "antd"
import _ from "lodash"
import React from "react"
import { parseSeconds } from "../../utils/timeUtils"
import Sentence from "./sentence"


const { Paragraph } = Typography

interface TranscriptProps {
  lines: Line[]
  speakerMapping: {[speaker: string]: string}
  jumpToSeconds?: number
  setSeconds: (s: number) => void
}

const Transcript: React.FunctionComponent<TranscriptProps> = ({ jumpToSeconds, setSeconds, lines, speakerMapping }) => {



  // React.useEffect(() => {
  //   console.log('getting!')
  //   const d = lines.map(res => ({key: shortid(), startTime: res.startTime, speaker: `${res.speaker}`, sentence: res.words
  //     // remove spaces preceeding punctuation
  //     .map((w, idx) => idx === 0 || w.start === undefined ? w.content : ` ${w.content}`).join("")}))
  //   setDialogue(d)
  // }, [])
  

  // const jumpLookup = dialogue.map(d => d.startTime)
  const firstSpeaker = _.min(Object.keys(speakerMapping))

  // const jumpMatch = React.useMemo(() => {
  //   const j = jumpToSeconds !== undefined ? jumpLookup.find(t => t <= jumpToSeconds) : undefined
  //   console.log(j)
  //   return j
  // }, [jumpToSeconds])

  const jumpStart = lines.find(l => l.endTime > jumpToSeconds)?.startTime

  return(
    <React.Fragment >
      <div className="transcript-container">
        {lines.map(({speaker, startTime, words}) =>
          <Row key={`${speaker}${startTime}`}>
            <Col xs={24} md={8}>
              <Paragraph className="pointer">
                <div onClick={() => setSeconds(startTime)}>
                  [{parseSeconds(startTime)}]: {speakerMapping[speaker] || speaker}
                </div>
              </Paragraph>
            </Col>
            <Col
              // ref={startTime === jumpMatch ? ref : undefined}
              xs={24} md={16}
              className={firstSpeaker === speaker ? "" : "italics" }
            >
              <Sentence
                words={words}
                highlight={ startTime === jumpStart ? jumpToSeconds : undefined}
              />
            </Col>
            <Divider />
          </Row>
        )}
      </div>
    </React.Fragment>
  )
}

export default React.memo(Transcript, (a, b) => _.isEqual(a, b))
