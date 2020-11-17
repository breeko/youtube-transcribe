import React from "react"
import { Anchor, Button, Divider, Layout, message, Space, Spin, Typography } from "antd"
import Link from "next/link"
import Avatar from "antd/lib/avatar/avatar"
import { FiHome, FiLogIn, FiLogOut, FiUser } from "react-icons/fi"
import ModalContainer from "./containers/modal-container"
import { Auth } from "aws-amplify"
import { useRouter } from "next/dist/client/router"

const { Title } = Typography
const { Header } = Layout

const AppHeader: React.FunctionComponent = () => {
  const [signedIn, setSignedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const router = useRouter()

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
        {
          router.pathname !== "/" &&
          <Button icon={<FiHome />} onClick={() => router.push("/")} type="ghost" size="large"/>
        }
        
        <Space direction="horizontal" className="right">
          { !loading ?
              !signedIn ?
                <Button
                  icon={<FiLogIn />}
                  type="ghost"
                  size="large"
                  onClick={() => modalContainer.setModalProps({key: "signin", onSuccess: () => setSignedIn(true)})} /> :
                <Button
                  type="ghost"
                  size="large"
                  icon={<FiLogOut />}
                  onClick={() => Auth.signOut().then(() => { message.info("Logged out"); setSignedIn(false) })} /> :
                <Spin />
          }
        </Space>
      </Header>
    )
}

export default AppHeader
