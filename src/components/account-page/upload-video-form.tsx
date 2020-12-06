import { Alert, Button, Card, Form, Input, message, Space, Spin } from "antd"
import React from "react"
import { getVideoId } from "../../utils/apiUtils"
import { uploadYoutube } from "../../utils/lambdaUtils"

interface UploadVideoFormProps {
  onSuccess: (res: string) => void
}

const UploadVideoForm: React.FunctionComponent<UploadVideoFormProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [form] = Form.useForm<{url: string}>()

  const handleSuccess = (r: string) => {
    message.success("Upload successful")
    onSuccess(r)
  }

  const onFinish = () => {
    const url = form.getFieldValue("url")
    const videoId = getVideoId(url)
    if (videoId) {
      setIsError(false)
      setIsLoading(true)
      uploadYoutube({videoId})
      .then(handleSuccess)
      .catch(e => setIsError(true))
      .finally(() => setIsLoading(false))
    }
  }

  return(
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
            <Alert className="text-center" message="Download started. Depending on the length, this could take a minute" type="info" />
          </Form.Item>}
        {isError &&
          <Form.Item >
            <Alert className="text-center" message="Unable to retrieve video. Check the link or try uploading instead" type="error" />
          </Form.Item>
        }
      </Space>
    </Form>
  )
}

export default UploadVideoForm
