import React from "react"
import { Anchor, Layout } from "antd"

const { Header } = Layout

const AppHeader: React.FunctionComponent = () => {
  return(
  <Anchor>
    <Header className="white app-header">
      Youtube Transcribe
    </Header>
  </Anchor>)
}

export default AppHeader
