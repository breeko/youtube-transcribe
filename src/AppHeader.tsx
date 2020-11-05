import React from "react"
import { Anchor, Layout } from "antd"

const { Header } = Layout

const AppHeader: React.FunctionComponent = () => {
  return(
  <Anchor>
    <Header className="white app-header">
      YTT
    </Header>
  </Anchor>)
}

export default AppHeader
