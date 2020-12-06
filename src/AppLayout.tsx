import { Layout } from "antd"
import React from "react"
import AppContent from "./AppContent"
import AppFooter from "./AppFooter"
import AppHeader from "./AppHeader"
import ModalContainer from "./containers/modal-container"
import PlayerContainer from "./containers/player-container"

const { Content } = Layout

interface AppLayoutProps {
  hideFooter?: boolean
  hideHeader?: boolean
}

const AppLayout: React.FunctionComponent<AppLayoutProps> = (props) => {
  return(
    <Layout className="app-layout">
      <PlayerContainer.Provider>
        <ModalContainer.Provider>
          {props.hideHeader ? null : <AppHeader />}
          <AppContent>
            {props.children}
          </AppContent>
          { props.hideFooter ? null : <AppFooter />}
        </ModalContainer.Provider>
      </PlayerContainer.Provider>
    </Layout>
  )
}

export default AppLayout
