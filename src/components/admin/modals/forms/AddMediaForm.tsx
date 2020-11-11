
import { Alert, Button, Form, Image, Input, Popconfirm, Select, Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { MEDIA_TYPE } from "../../../../API";
import { createMedia, deleteMedia, getMedia, updateMedia } from "../../../../utils/apiUtils";
import { toPrimaryKey } from "../../../../utils/utils";
import ImageUpload from "./ImageUpload";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

interface FormProps {
  id: string
  image: string
  type: MEDIA_TYPE
  name: string
}

interface AddMediaFormProps {
  id?: string
  onComplete: () => void
}

const AddMediaForm: React.FunctionComponent<AddMediaFormProps> = ({ id, onComplete }) => {
  const [form] = Form.useForm<FormProps>()
  const [isLoading, setIsLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState<string>()
  const [imagePath, setImagePath] = useState<string>()
  const [newName, setNewName] = useState<string>()
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    form.setFields([{name: "image", value: imagePath}])
    setCurrentImage(imagePath)
  }, [imagePath])

  const loadEdit = useCallback(() => {
    if (id !== undefined) {
      getMedia(id).then(m => {
        if (m) {
          setCurrentImage(m.image)
          setNewName(m.name)
          form.setFieldsValue(m)
        }
      }).finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id === undefined) {
      const newId = toPrimaryKey(newName || '')
      form.setFieldsValue({id: newId})
    }
  }, [newName])

  useEffect(() => {
    loadEdit()
  }, [loadEdit])

  useEffect(() => {
  }, [errors])
  const handleDelete = async () => {
    if (id) {
      deleteMedia(id)
        .catch(r => r.errors && r.errors.length > 0 && setErrors(r.errors.map((e: {message: string}) => e.message)))
        .then(() => onComplete())
        .finally(() => setIsLoading(false))
    }
  }

  const onFinish = async (values: FormProps) => {
    setIsLoading(true)
    const res = id === undefined ? createMedia(values) : updateMedia(values)
    res
      .then(() => onComplete())
      .catch(r => r.errors && r.errors.length > 0 && setErrors(r.errors.map((e: {message: string}) => e.message)))
      .finally(() => setIsLoading(false))
  }
  
  return(
    <Spin spinning={isLoading}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} size="small">
        <Form.Item name="id" label="ID" rules={[{ required: true }]}>
          <Input disabled={id !== undefined}/>
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input value={newName} onChange={n => setNewName(n.target.value)} />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select options={[{value: MEDIA_TYPE.TV}, {value: MEDIA_TYPE.MOVIE}, {value: MEDIA_TYPE.OTHER}]} />
        </Form.Item>
        <Form.Item name="image" label="Image" rules={[{ required: true }]} >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item name="upload" label="Upload">
          <ImageUpload onComplete={setImagePath}/>
        </Form.Item>
        <Form.Item label="Current">
          <Image src={currentImage}/>
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
          <Button htmlType="button" onClick={() => id ? loadEdit() : form.resetFields()}>
            Reset
          </Button>
          <Button htmlType="submit" >
            {id ? "Confirm" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
      {errors.length > 0 && <Alert message={errors.join(", ")} type="error" />}
    </Spin>
  )
}

export default AddMediaForm
