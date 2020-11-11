import { Button, Col, Divider, Row, Typography } from "antd"
import _ from "lodash"
import React from "react"
import { SpeakerMappingInput } from "../../API"
import { parseSeconds } from "../../utils/timeUtils"
import Sentence from "./sentence"

interface TranscriptProps {
  lines: Line[]
  speakerMapping: Map<string, SpeakerMappingInput>
  jumpToSeconds?: number
  setSeconds: (s: number) => void
  highlightWord: string | undefined
}

const Transcript: React.FunctionComponent<TranscriptProps> = (props) => {
  const { jumpToSeconds, setSeconds, lines, speakerMapping, highlightWord } = props

  const jumpStart = lines.find(l => l.endTime > jumpToSeconds)?.startTime

  return(
    <React.Fragment >
      <div className="transcript-container">
        {lines.map(({speaker, startTime, words}) =>
          <Row key={`${speaker}${startTime}`}>
            <Col xs={24} md={6}>
              {/* Add random so that it re-renders state even if originally set */}
              <Button type="link" onClick={() => setSeconds(startTime + Math.random() / 100)}>
                [{parseSeconds(startTime)}]: {speakerMapping.get(speaker)?.name || speaker}
              </Button>
            </Col>
            <Col
              xs={24} md={18}
              className={speakerMapping.get(speaker)?.style}
            >
              <Sentence
                text={words}
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
