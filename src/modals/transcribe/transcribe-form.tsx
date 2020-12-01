import { Alert, Button, Divider, Form, InputNumber, message, Slider, Space, Spin, Statistic, Typography } from "antd"
import React from "react"
import { transcribe } from "../../utils/lambdaUtils"
import { parseSeconds } from "../../utils/timeUtils"

interface TranscribeFormProps {
  videoId: string
  duration: number
  credits: number
  onSuccess: () => void
  onCancel: () => void
}

interface FormProps {
  // VocabularyName: string
  // ShowSpeakerLabels: boolean
  maxSpeakerLabels: number
  range: [number, number]
  // cost: number
  // ChannelIdentification: boolean
  // ShowAlternatives: boolean
  // MaxAlternatives: number
  // VocabularyFilterName: string
  // VocabularyFilterMethod: string
}

const { Paragraph, Title, Text } = Typography

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
}

const tailLayout = {
  wrapperCol: { offset: 16, span: 8 },
}
const SECONDS_FREE = 60
const SECONDS_MINIMUM = 30

const TranscribeForm: React.FunctionComponent<TranscribeFormProps> = ({videoId, duration, credits, onSuccess, onCancel}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [cost, setCost] = React.useState<number>(undefined)

  const [form] = Form.useForm<FormProps>()
  const handleFinish = () => {
    setIsLoading(true)
  
    const [start, end] = form.getFieldValue("range")
    const duration = end - start
    const MaxSpeakerLabels = form.getFieldValue("maxSpeakerLabels")
    const args = {videoId, start, duration, settings: { MaxSpeakerLabels }, onSuccess: () => onSuccess(), onError: e => message.error(e)}
    transcribe(args)
  }

  const handleSliderChange = () => {
    const [start, end] = form.getFieldValue("range")
    setCost(calculateCost(start, end))
  }

  const calculateCost = (start: number, end: number) => Math.max(0.0, (end - start - SECONDS_FREE) / 60.0)

  return(
    <Spin spinning={isLoading}>
      <Form form={form} onFinish={handleFinish} size="small">
        {form &&
          <Space direction="horizontal">
            <Statistic value={credits} title="Credits" precision={2}/>
            <Divider type="vertical"/>
            <Statistic value={cost} title="Cost" precision={2}/>
            <Divider type="vertical"/>
            <Statistic value={form.getFieldValue("range")?.[0]} title="Start" formatter={parseSeconds}/>
            <Divider type="vertical"/>
            <Statistic value={form.getFieldValue("range")?.[1]} title="End" formatter={parseSeconds}/>
            <Divider type="vertical"/>
            <Statistic value={form.getFieldValue("range")?.[1] - form.getFieldValue("range")?.[0]} title="Length" formatter={parseSeconds}/>
          </Space>
        }
        <Paragraph type="secondary">First {SECONDS_FREE} seconds free</Paragraph>
        <Divider type="horizontal" />
        <Form.Item
          name="range"
          label="Time Range"
          rules={[
            {required: true},
            () => ({
              validator(_rule, value) {
                if (calculateCost(value[0], value[1]) > credits) {
                  return Promise.reject("Not enough credits")
                } else if ((value[1] - value[0]) < SECONDS_MINIMUM) {
                  return Promise.reject(`Minimum audio length of ${SECONDS_MINIMUM} seconds`)
                }
                return Promise.resolve()
            }})
          ]}
        >
          <Slider
            range
            min={0} max={duration}
            tipFormatter={(v) => parseSeconds(v)}
            onChange={() => handleSliderChange()}
          />
        </Form.Item>
        <Form.Item name="maxSpeakerLabels" label="Max # speakers" rules={[{required: true}]}>
          <InputNumber step={1} min={1} max={10} precision={0} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space direction="horizontal">
            <Button htmlType="button" onClick={() => onCancel()}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
              >Transcribe</Button>
          </Space>
        </Form.Item>
        {isLoading &&
          <Form.Item>
            <Alert message="Transcribe started. Depending on the length, this could take a minute" type="info" />
          </Form.Item>}
      </Form>
    </Spin>
  )
}

export default TranscribeForm
