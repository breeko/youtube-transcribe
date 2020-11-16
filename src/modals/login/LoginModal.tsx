import React, { useState } from "react"
import Modal from "antd/lib/modal/Modal"
import { Tabs } from "antd"
import Signin from "./Signin"
import Signup from "./Signup"

const { TabPane } = Tabs

type Action = "signin" | "signup"

interface LoginModalProps {
  action: Action
  onSuccess: () => void
  onOk: () => void
}

const LoginModal: React.FunctionComponent<LoginModalProps> = (
  props: LoginModalProps
) => {
  const [action, setAction] = useState(props.action)

  return (
    <Modal
      footer={null}
      title=""
      visible={true}
      onOk={props.onOk}
      onCancel={props.onOk}
    >
      <Tabs defaultActiveKey={action} onChange={(a) => setAction(a as Action)}>
        <TabPane tab="Sign in" key="signin">
          <Signin onSuccess={props.onSuccess} onOk={props.onOk} />
        </TabPane>
        {/* <TabPane tab="Sign up" key="signup">
          <Signup onSuccess={props.onSuccess} onOk={props.onOk} />
        </TabPane> */}
      </Tabs>
    </Modal>
  )
}

export default LoginModal
