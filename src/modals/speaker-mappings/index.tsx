import { Form, Input, Modal } from "antd";
import React from "react"
import { SpeakerMappingInput } from "../../API";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};


interface SpeakerMappingsModalProps {
  onCancel: () => void
  onSuccess: (updates: Object) => void
  speakers: string[]
}

const SpeakerMappingsModal: React.FunctionComponent<SpeakerMappingsModalProps> = (props) => {
  const { onCancel, onSuccess, speakers } = props
  const [form] = Form.useForm()

  const handleFinish = () => {
    const values = form.getFieldsValue()
    // remove mappings that didn't change or are left blank
    const updatedValues = Object.fromEntries(Object.entries(values).filter(([k, v]) => v && k !== v))
    onSuccess(updatedValues)
    onCancel()
  }

  return(
    <Modal okText="Save" onCancel={onCancel} onOk={handleFinish} visible={true} >
      <Form
        {...formItemLayout}
        name="Speaker Mappings"
        onFinish={handleFinish}
        form={form}
        className="padded"
        layout="vertical"
      >
        {speakers.map(s =>
          <Form.Item
            label={`Speaker: ${s}`}
            name={s}
            key={s}
          >
            <Input placeholder={"New name here"} />
          </Form.Item>
          )}
      </Form>
    </Modal>
    )
}

export default SpeakerMappingsModal
