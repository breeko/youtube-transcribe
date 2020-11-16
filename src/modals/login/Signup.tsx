import React, { useState } from "react"
import { Form, Space } from "antd"
import { Store } from "antd/lib/form/interface"
import { Auth } from "aws-amplify"
import { FormItems } from "./FormItems"

interface LoginModalProps {
  onSuccess: () => void
  onOk: () => void
}

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
}

const tailLayout = {
  wrapperCol: { span: 22 },
}

const Signup: React.FunctionComponent<LoginModalProps> = (
  props: LoginModalProps
) => {
  const [error, setError] = useState<string | undefined>()
  const [action, setAction] = useState<"signup" | "confirm">("signup")

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
      await Auth.confirmSignUp(values.email, values.confirm)
      await Auth.signIn(values.email, values.password)
      setError(undefined)
      props.onSuccess()
      props.onOk()
    } catch (error) {
      setError(error.message)
    }
  }

  const signup = async (values: Store) => {
    try {
      const { password, email } = values
      await Auth.signUp({
        username: email,
        password,
        attributes: { email },
      })
      setError(undefined)
      setAction("confirm")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <React.Fragment>
        {FormItems.email}
        {FormItems.password(true)}
        {action === "confirm" && FormItems.confirm}
      </React.Fragment>
      {error !== undefined && FormItems.error(error)}
      <Form.Item {...tailLayout}>
        <Space direction="vertical" style={{ width: "100%" }}>
          {action !== "confirm" &&
            FormItems.button("Sign up", () => setAction("signup"), "primary")}
          {action === "confirm" &&
            FormItems.button("Confirm", () => setAction("confirm"), "primary")}
        </Space>
      </Form.Item>
    </Form>
  )
}

export default Signup
