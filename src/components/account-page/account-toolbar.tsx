import { Typography, Card, Space, Statistic, Divider, Button, message } from "antd"
import React from "react"
import { FiPlusCircle } from "react-icons/fi"
import { UserInfo } from "../../../types/types"
import ModalContainer from "../../containers/modal-container"

const { Paragraph } = Typography

interface AccountToolbarProps {
  userInfo: UserInfo
}

const AccountToolbar: React.FunctionComponent<AccountToolbarProps> = ({ userInfo }) => {

  const modalContainer = ModalContainer.useContainer()

  return(
    <Card >
      <Space direction="horizontal">
        <Button
          icon={<FiPlusCircle/>}
          type="primary"
          size="large"
          onClick={() => modalContainer.setModalProps({key: "checkout", onSuccess: () => message.success("yay")})}
        >&nbsp;Add Credits</Button>
        <Divider type="vertical"/>
        <Statistic title="Credits" value={userInfo?.credits} precision={2} />
      </Space>
    </Card>
  )
}

export default AccountToolbar
