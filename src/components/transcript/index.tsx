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
  highlightWord: string | undefined
}

const Transcript: React.FunctionComponent<TranscriptProps> = (props) => {
  const { jumpToSeconds, setSeconds, lines, speakerMapping, highlightWord } = props
  const firstSpeaker = _.min(Object.keys(speakerMapping))
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
              xs={24} md={16}
              className={firstSpeaker === speaker ? "" : "italics" }
            >
              <Sentence
                words={words}
                highlight={ startTime === jumpStart ? jumpToSeconds : undefined}
                highlightWord={highlightWord}
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
