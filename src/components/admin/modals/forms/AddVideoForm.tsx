import { Alert, Button, Form, Input, InputNumber, Popconfirm, Select, Spin } from "antd";
import { ValidateStatus } from "antd/lib/form/FormItem";
import React, { useCallback, useEffect, useState } from "react";
import { VIDEO_TYPE } from "../../../../API";
import { Media } from "../../../../types/graphql";
import { createVideo, deleteVideo, getVideoFull, listMedia, updateVideo } from "../../../../utils/apiUtils";
import { getMetadata, getVideoId } from "../../../../utils/youtubeUtils";


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const { Option } = Select


interface FormProps {
  name: string
  type: VIDEO_TYPE
  videoMediaId: string
  path: string
  season?: number | null
  episode?: number | null
  score?: number | null
  lengthSeconds: number
  published: string
}

interface ValidationStatus {
  status: ValidateStatus
  message: string
}

interface AddTvFormProps {
  id?: string
  onComplete: () => void
}

const AddVideoForm: React.FunctionComponent<AddTvFormProps> = ({ onComplete, id }) => {
  const [form] = Form.useForm<FormProps>()
  const [errors, setErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [validated, setValidated] = useState(false)
  const [validateStatus, setValidateStatus] = useState<ValidationStatus | undefined>()

  const [mediaChoices, setMediaChoices] = useState<Media[]>([])

  const onFinish = async (values: FormProps) => {
    const res = id ? updateVideo({...values, id}) : createVideo(values)
    res
      .then(() => onComplete())
      .catch(r => r.errors && r.errors.length > 0 && setErrors(r.errors.map((e: {message: string}) => e.message)))
      .finally(() => setIsLoading(false))
  }

  const handleDelete = async () => {
    if (id !== undefined) {
      deleteVideo(id)
      .then(() => onComplete())
      .catch(r => r.errors && r.errors.length > 0 && setErrors(r.errors.map((e: {message: string}) => e.message)))
      .finally(() => setIsLoading(false))
    }  
  }

  const loadEdit = useCallback(() => {
    if (id !== undefined) {
          getVideoFull(id).then(review => {
            if (review !== undefined) {
              const formData = {...review, videoMediaId: review.media.id}
              form.setFieldsValue(formData)
            }
          }).finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [id])
  
  useEffect(() => {
    listMedia({}).then(medies => setMediaChoices(medies))
    loadEdit()

  }, [loadEdit])

  const validate = async () => {
    const videoId = getVideoId(form.getFieldValue("path"))
    if (!videoId) {
      const status: ValidationStatus = {
        status: "error",
        message: "Invalid url. Provide youtube url (e.g. https://youtu.be/SixHrR_C6FI)",
      }
      setValidateStatus(status)
      return
    }

    try {
      const meta = await getMetadata(videoId)
      const lengthSeconds = Number.parseInt(meta.video_details.lengthSeconds)
      const published = meta.video_details.publishDate
      form.setFieldsValue({name: meta.title, lengthSeconds, published})
      setValidated(true)
    } catch {
      const status: ValidationStatus = {
        status: "error",
        message: "Cannot access link. Check url is valid",
      }
      setValidateStatus(status)
      return
    }
  }

  return(
    <Spin spinning={isLoading}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} size="small">
        <Form.Item name="videoMediaId" label="Media" rules={[{ required: true }]}>
          <Select placeholder="Select media" showSearch>
            {mediaChoices.map(m => (
              <Option value={m.id} key={m.id}>{m.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select placeholder="Select type" options={[{value: VIDEO_TYPE.INTERVIEW}, {value: VIDEO_TYPE.REVIEW}]} />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="path" label="url" validateStatus={validateStatus?.status} help={validateStatus?.message} rules={[{ required: true }]}>
          <Input onChange={() => {setValidated(false); setValidateStatus(undefined)}} />
        </Form.Item>
        <Form.Item name="season" label="Season" rules={[{ required: false }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="episode" label="Episode" rules={[{ required: false }]}>
          <InputNumber min={1}/>
        </Form.Item>
        <Form.Item name="score" label="Score" rules={[{ required: false }]}>
          <InputNumber min={0} max={10} />
        </Form.Item>
        <Form.Item name="lengthSeconds" label="Length (seconds)" rules={[{ required: false }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="published" label="Published" rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          { id &&
              <Popconfirm
                title="Are you sure delete?"
                onConfirm={() => handleDelete()}
                okText="Delete"
                cancelText="Cancel"
              >
              <Button htmlType="button">
                Delete
              </Button>
            </Popconfirm>
          }
          <Button type="primary" onClick={() => validate()}>
            Validate
          </Button>
          <Button htmlType="button" onClick={() => {form.resetFields(); setValidated(false) }}>
            Reset
          </Button>
          <Button htmlType="submit" disabled={!validated}>
            Submit
          </Button>

        </Form.Item>
        {errors.length > 0 && <Alert message={errors.join(", ")} type="error" />}
      </Form>
    </Spin>
  )
}

export default AddVideoForm
