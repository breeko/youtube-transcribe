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

const Signin: React.FunctionComponent<LoginModalProps> = (
  props: LoginModalProps
) => {
  const [error, setError] = useState<string | undefined>()
  const [action, setAction] = useState<"signin" | "confirm" | "reset" | "resetConfirm">("signin")

  const onFinish = (values: Store) => {
    switch (action) {
      case "signin":
        return signin(values)
      case "confirm":
        return confirm(values)
      case "reset":
        return reset(values)
      case "resetConfirm":
        return resetConfirm(values)
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
  const signin = async (values: Store) => {
    try {
      await Auth.signIn(values.email, values.password)
      setError(undefined)
      props.onSuccess()
      props.onOk()
    } catch (error) {
      if (error.code === "UserNotConfirmedException") {
        Auth.resendSignUp(values.email)
        setAction("confirm")
      } else {
        setError(error.message)
      }
    }
  }

  const reset = async (values: Store) => {
    try {
      await Auth.forgotPassword(values.email)
      setError(undefined)
      setAction("resetConfirm")
    } catch (error) {
      setError(error.message)
    }
  }

  const resetConfirm = async (values: Store) => {
    try {
      await Auth.forgotPasswordSubmit(
        values.email,
        values.confirm,
        values.password
      )
      await Auth.signIn(values.email, values.password)
      setError(undefined)
      setAction("signin")
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
        {FormItems.password(action === "reset" ? false : true)}
      </React.Fragment>
      {(action === "confirm" || action == "resetConfirm") && FormItems.confirm}
      {error !== undefined && FormItems.error(error)}
      <Form.Item {...tailLayout}>
        <Space direction="vertical" style={{ width: "100%" }}>
          {FormItems.button("Login", () => setAction("signin"), "primary")}
          {action === "confirm" &&
            FormItems.button("Confirm", () => setAction("confirm"), "primary")}
          {action === "resetConfirm" &&
            FormItems.button(
              "Reset password",
              () => setAction("resetConfirm"),
              "primary"
            )}
        </Space>
      </Form.Item>
      <Form.Item {...tailLayout}>
        {FormItems.button("Forgot Password", () => setAction("reset"), "link")}
      </Form.Item>
    </Form>
  )
}

export default Signin
