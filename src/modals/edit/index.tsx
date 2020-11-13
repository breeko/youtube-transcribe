
import { Button, Form, Input, Select, Space } from "antd"
import Modal from "antd/lib/modal/Modal"
import React from "react"
import { SpeakerMapping } from "../../../types/types"
import { parseSeconds } from "../../utils/timeUtils"
import _ from "lodash"
import PlayerContainer from "../../containers/player-container"

export interface EditModalProps {
  text: string
  speaker: string
  speakerMapping: SpeakerMapping
  startTime: number
  endTime: number
  onClose: () => void
}

interface FormProps {
  speaker: string
  start: number
  end: number
  text: number
}

const EditModal: React.FunctionComponent<EditModalProps> = (props) => {
  const [form] = Form.useForm<FormProps>()
  const { text, speaker, speakerMapping, startTime, endTime, onClose } = props
  const playerContainer = PlayerContainer.useContainer()
  return(
    <Modal
      title="Edit Transcript"
      visible={true}
      onCancel={onClose}
    >
      <Form size="small" labelCol={{span: 4}} wrapperCol={{span: 20}} form={form}>
        <Form.Item name="speaker" label="Speaker" initialValue={speaker}>
          <Select>
            {Array.from(speakerMapping.values()).map(({name, speaker}) =>
              <Select.Option value={speaker} key={speaker}>{name}</Select.Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item name="start" label="Start" initialValue={parseSeconds(startTime)}>
          <Input disabled={true} />
        </Form.Item>
        <Form.Item name="end" label="End" initialValue={parseSeconds(endTime)} >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item name="text" label="Text" initialValue={text}>
          <Input.TextArea rows={10} />
        </Form.Item>
        <Form.Item>
          <Space direction="horizontal">
            <Button
              onClick={() => playerContainer.seekTo(startTime)}
              disabled={playerContainer.playing}
            >
              Play
            </Button>
            <Button
              onClick={() => playerContainer.pause()}
              disabled={!playerContainer.playing}
            >
              Stop
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditModal
