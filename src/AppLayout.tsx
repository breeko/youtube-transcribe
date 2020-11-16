import { Layout } from "antd"
import React from "react"
import AppFooter from "./AppFooter"
import AppHeader from "./AppHeader"
import ModalContainer from "./containers/modal-container"

const { Content } = Layout

interface AppLayoutProps {
  hideFooter?: boolean
  hideHeader?: boolean
}

const AppLayout: React.FunctionComponent<AppLayoutProps> = (props) => {
  return(
    <Layout className="app-layout">
      <ModalContainer.Provider>
        {props.hideHeader ? null : <AppHeader />}
        <Content className="app-content">
          {props.children}
        </Content>
        { props.hideFooter ? null : <AppFooter />}
      </ModalContainer.Provider>
    </Layout>
  )
}

export default AppLayout
