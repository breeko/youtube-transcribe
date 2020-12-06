import React from "react"
import { Anchor, Button, Divider, Layout, message, Space, Spin, Typography } from "antd"
import Link from "next/link"
import Avatar from "antd/lib/avatar/avatar"
import { FiHome, FiLogIn, FiLogOut, FiUser } from "react-icons/fi"
import ModalContainer from "./containers/modal-container"
import { Auth } from "aws-amplify"
import { useRouter } from "next/dist/client/router"
import PlayerContainer from "./containers/player-container"
import { AmplifySignOut } from "@aws-amplify/ui-react"

const { Title } = Typography
const { Header } = Layout

const AppHeader: React.FunctionComponent = () => {
  const [signedIn, setSignedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const router = useRouter()

  const updateAuth = () => {
    Auth.currentUserInfo()
      .then(() => setSignedIn(true))
      .catch(() => setSignedIn(false))
      .finally(() => setLoading(false))
  }
  React.useEffect(() => {
    updateAuth()
  }, [])

  const modalContainer = ModalContainer.useContainer()
  const home = router.pathname === "/"
  return(
    <Header className={home ? "app-header white" : "app-header"}>
      { modalContainer.modal }
      { !home &&
        <Button icon={<FiHome />} onClick={() => router.push("/")} type="ghost" size="large"/> }
      <Space direction="horizontal" className="right">
        { !loading ?
            !signedIn ?
              <Button
                icon={<FiLogIn />}
                type="ghost"
                size="large"
                onClick={() => modalContainer.setModalProps({key: "signin", action: "signin", onSuccess: () => updateAuth()})} /> :
              <React.Fragment>
                <Button
                  type="ghost"
                  size="large"
                  icon={<FiUser />}
                  onClick={() => router.push("/account")} />
                <Button
                  type="ghost"
                  size="large"
                  icon={<FiLogOut />}
                  onClick={() => Auth.signOut().then(() => { localStorage.clear(); message.info("Logged out"); setSignedIn(false); router.push("/") })} />
                  </React.Fragment> :
              <Spin />
        }
      </Space>
    </Header>
    )
}

export default AppHeader
