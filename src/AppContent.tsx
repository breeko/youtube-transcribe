import { Layout } from "antd"
import React from "react"
import PlayerContainer from "./containers/player-container"

const { Content } = Layout

const AppContent: React.FunctionComponent = (props) => {
  const playerContainer = PlayerContainer.useContainer()

  return(
    <Content className="app-content">
      {props.children}
    </Content>
  )
}

export default AppContent
