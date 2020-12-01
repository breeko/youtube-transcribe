import { Alert, Button, Card, Form, Input, message, Space, Spin } from "antd"
import React from "react"
import { getVideoId } from "../../utils/apiUtils"
import { uploadYoutube } from "../../utils/lambdaUtils"

interface UploadVideoFormProps {
  onSuccess: (res: string) => void
}

const UploadVideoForm: React.FunctionComponent<UploadVideoFormProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [form] = Form.useForm<{url: string}>()

  const handleSuccess = (r: string) => {
    setIsLoading(false)
    message.success("Upload successful")
    onSuccess(r)
  }
  const onFinish = () => {
    const url = form.getFieldValue("url")
    const videoId = getVideoId(url)
    if (videoId) {
      setIsLoading(true)
      uploadYoutube({
        videoId,
        onSuccess: handleSuccess,
        onError: (e) => message.error(e)})
    }
  }

  return(
    <Card>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="url" label="Youtube URL" required rules={[
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (getVideoId(value)) {
                return Promise.resolve()
              }
              return Promise.reject("Invalid youtube video")
            },
          })
        ]}>
          <Input />
        </Form.Item>
        <Space direction="vertical">
          <Spin spinning={isLoading}>
            <Button htmlType="submit">
              Upload
            </Button>
          </Spin>
          {isLoading &&
            <Form.Item>
              <Alert message="Transcribe started. Depending on the length, this could take a minute" type="info" />
            </Form.Item>}
        </Space>
      </Form>
    </Card>
  )
}

export default UploadVideoForm
