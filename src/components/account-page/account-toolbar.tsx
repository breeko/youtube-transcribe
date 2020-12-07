import { Typography, Card, Space, Statistic, Divider, Button, message } from "antd"
import React from "react"
import { FiHelpCircle, FiMail, FiPlusCircle } from "react-icons/fi"
import { UserInfo } from "../../../types/types"
import ModalContainer from "../../containers/modal-container"

const { Paragraph } = Typography

interface AccountToolbarProps {
  userInfo: UserInfo
  startTour: () => void
}

const AccountToolbar: React.FunctionComponent<AccountToolbarProps> = ({ userInfo, startTour }) => {

  const modalContainer = ModalContainer.useContainer()

  return(
    <Card >
      <Space direction="horizontal">
        <Button
          id="buy-credits"
          icon={<FiPlusCircle/>}
          type="primary"
          size="large"
          onClick={() => modalContainer.setModalProps({key: "checkout", onSuccess: () => message.success("yay")})}
        >&nbsp;Add Credits</Button>
        <Divider type="vertical"/>
        <Statistic title="Credits" value={userInfo?.credits} precision={2} />
        <Divider type="vertical" />
        <Button icon={<FiHelpCircle size="large"/>} type="text" shape="circle" onClick={startTour}/>
        <a href="mailto:support@deep-chats.com">
          <Button icon={<FiMail size="large"/>} type="text" shape="circle" id="mail"/>
        </a>
      </Space>
    </Card>
  )
}

export default AccountToolbar
