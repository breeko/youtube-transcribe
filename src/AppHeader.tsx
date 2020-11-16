import React from "react"
import { Anchor, Button, Divider, Layout, message, Space, Spin, Typography } from "antd"
import Link from "next/link"
import Avatar from "antd/lib/avatar/avatar"
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi"
import ModalContainer from "./containers/modal-container"
import { Auth } from "aws-amplify"

const { Title } = Typography
const { Header } = Layout

const AppHeader: React.FunctionComponent = () => {
  const [signedIn, setSignedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setSignedIn(true))
      .catch(() => setSignedIn(false))
      .finally(() => setLoading(false))
  }, [])

  const modalContainer = ModalContainer.useContainer()
  return(
      <Header className="app-header">
        {modalContainer.modal}
        <Space direction="horizontal" className="right">
          { !loading ?
              !signedIn ?
                <Button icon={<FiLogIn />} onClick={() =>
                  modalContainer.setModalProps({key: "signin", onSuccess: () => setSignedIn(true)})} /> :
                <Button icon={<FiLogOut />} onClick={() => Auth.signOut().then(() => { message.info("Logged out"); setSignedIn(false) })} /> :
                <Spin />
          }
        </Space>
      </Header>
    )
}

export default AppHeader
