import { withAuthenticator } from "@aws-amplify/ui-react"
import React, { useEffect, useState } from "react"
import { Storage } from "aws-amplify"
import { Alert, Button, Form, Input, message } from "antd"
import { useForm } from "antd/lib/form/Form"
import { getVideoId } from "../../src/utils/apiUtils"

interface FormProps {
  url: string
  file: File
}

const Admin: React.FunctionComponent = () => {
  const [form] = useForm<FormProps>()
  const [file, setFile] = useState<File>()
  const [validated, setValidated] = useState(false)
  const [fileName, setFileName] = useState<string | undefined>()  
  const [error, setError] = useState<string | undefined>()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.currentTarget.files[0]
    setFile(f)
  }

  const handleFinish = (values: FormProps) => {
    if (fileName !== undefined && file !== undefined) {
      Storage.put(fileName, file, { level: "public" })
        .then(() => message.success("Uploaded"))
        .then(() => form.resetFields())
        .catch(e => setError(e))
    }
  }

  React.useEffect(() => {
    form.setFields([{value: fileName, name: "name"}])
  }, [fileName])

  React.useEffect(() => {
    setValidated(false)
  }, [form])

  const validate = async () => {
    const videoId = getVideoId(form.getFieldValue("url"))
    if (!videoId) {
      setError("Invalid youtube")
      setFileName(undefined)
      setValidated(false)
    } else {
      setError(undefined)
      setFileName(`${videoId}.json`)
      setValidated(true)
    }
  }

  return(
    <div>
      hello
      <Form form={form} onFinish={handleFinish} labelCol={{span: 8}} wrapperCol={{span: 16}} >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input disabled={true}/>
        </Form.Item>
        <Form.Item name="url" label="Url" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="file" label="File" rules={[{ required: true }]}>
          <input type="file" onChange={(e) => handleChange(e)} />
        </Form.Item>
        <Button type="primary" onClick={() => validate()}>
          Validate
        </Button>
        <Button htmlType="button" onClick={() => { form.resetFields(); setValidated(false) }}>
          Reset
        </Button>
        <Button htmlType="submit" disabled={!validated}>
          Submit
        </Button>
        { error && <Alert message={error} type="error" /> }
      </Form>
    </div>
  )
}


export default withAuthenticator(Admin)

