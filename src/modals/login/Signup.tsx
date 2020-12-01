import React, { useState } from "react"
import { Form, Space, Spin } from "antd"
import { Store } from "antd/lib/form/interface"
import { Auth } from "aws-amplify"
import { FormItems } from "./FormItems"

interface LoginModalProps {
  onSuccess: () => void
  onOk: () => void
}

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
}

const tailLayout = {
  wrapperCol: { span: 24 },
}

const Signup: React.FunctionComponent<LoginModalProps> = (
  props: LoginModalProps
) => {
  const [error, setError] = useState<string | undefined>()
  const [action, setAction] = useState<"signup" | "confirm">("signup")
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values: Store) => {
    switch (action) {
      case "signup":
        return signup(values)
      case "confirm":
        return confirm(values)
    }
  }

  const confirm = async (values: Store) => {
    try {
      setIsLoading(true)
      await Auth.confirmSignUp(values.email, values.confirm)
      await Auth.signIn(values.email, values.password)
      setError(undefined)
      props.onSuccess()
      props.onOk()
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  const signup = async (values: Store) => {
    try {
      setIsLoading(true)
      const { password, email } = values
      await Auth.signUp({
        username: email,
        password,
        attributes: { email },
      })
      setError(undefined)
      setAction("confirm")
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
    >
      {FormItems.email}
      {FormItems.password(true)}
      {action === "confirm" && FormItems.confirm}
      {error !== undefined && FormItems.error(error)}
      <Form.Item {...tailLayout}>
        <Spin spinning={isLoading}>
          <Space direction="vertical" style={{ width: "100%" }}>
            {action !== "confirm" &&
              FormItems.button("Sign up", () => setAction("signup"), "primary")}
            {action === "confirm" &&
              FormItems.button("Confirm", () => setAction("confirm"), "primary")}
          </Space>
        </Spin>
      </Form.Item>
    </Form>
  )
}

export default Signup
