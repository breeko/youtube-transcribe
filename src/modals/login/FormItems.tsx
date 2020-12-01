/* eslint-disable react/display-name */
import React from "react"
import { Form, Input, Button, Typography } from "antd"
import { MailOutlined, LockOutlined } from "@ant-design/icons"

const { Text } = Typography

export const FormItems = {
  email: (
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          type: "email",
          message: "Please input a valid email",
          validateTrigger: "onSubmit",
        },
      ]}
    >
      <Input placeholder="Email" prefix={<MailOutlined />} />
    </Form.Item>
  ),
  password: (required: boolean) => (
    <Form.Item
      name="password"
      rules={[
        {
          required,
          message: "Please input your password",
          validateTrigger: "onSubmit",
        },
        {
          min: 6,
          message: "Password must be minimum 6 characters.",
          validateTrigger: "onSubmit",
        },
      ]}
    >
      <Input.Password placeholder="Password" prefix={<LockOutlined />} />
    </Form.Item>
  ),
  confirm: (
    <Form.Item label="Confirmation Code" name="confirm">
      <Input placeholder="Check your email" />
    </Form.Item>
  ),
  button: (
    text: string,
    onClick: () => void,
    type: "primary" | "default" | "link"
  ): JSX.Element => (
    <Button
      type={type}
      onClick={onClick}
      htmlType="submit"
      style={{ width: "100%" }}
    >
      {text}
    </Button>
  ),
  error: (text: string): JSX.Element => (
    <Form.Item>
      <Text>{text}</Text>
    </Form.Item>
  ),
}
