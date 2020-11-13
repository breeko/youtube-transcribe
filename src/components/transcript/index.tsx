import { Button, Col, Divider, Row } from "antd"
import _ from "lodash"
import React from "react"
import { Line, SpeakerMapping } from "../../../types/types"
import PlayerContainer from "../../containers/player-container"
import { parseSeconds } from "../../utils/timeUtils"
import Sentence from "./sentence"

interface TranscriptProps {
  lines: Line[]
  speakerMapping: SpeakerMapping
  highlightWord: string | undefined
  handleEdit: (text: string, speaker: string, startTime: number, endTime: number) => () => void
}

const Transcript: React.FunctionComponent<TranscriptProps> = (props) => {
  const { lines, speakerMapping, highlightWord, handleEdit } = props
  const playerContainer = PlayerContainer.useContainer()

  const jumpStart = lines.find(l => l.endTime > playerContainer.highlightedSeconds)?.startTime

  return(
    <React.Fragment >
      <div className="transcript-container">
        {lines.map(({speaker, startTime, endTime, text}) =>
          <Row key={`${speaker}${startTime}`}>
            <Col xs={24} md={6}>
              {/* <Button icon={<FiEdit/>} type="link"/> */}
              <Button type="link" onClick={() => playerContainer.seekTo(startTime)}>
                [{parseSeconds(startTime)}]: {speakerMapping.get(speaker)?.name || speaker}
              </Button>
            </Col>
            <Col
              xs={24} md={18}
              className={speakerMapping.get(speaker)?.style}
            >
              <Sentence
                text={text}
                highlight={ startTime === jumpStart }
                highlightWord={highlightWord}
                handleEdit={handleEdit(text, speaker, startTime, endTime)}
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
