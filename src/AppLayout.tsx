import { Layout } from "antd"
import React from "react"
import AppFooter from "./AppFooter"
import AppHeader from "./AppHeader"

const { Content } = Layout

interface AppLayoutProps {
  hideFooter?: boolean
  hideHeader?: boolean
}

const AppLayout: React.FunctionComponent<AppLayoutProps> = (props) => {
  return(
    <Layout className="app-layout">
      {props.hideHeader ? null : <AppHeader />}
      <Content className="app-content">
        {props.children}
      </Content>
      { props.hideFooter ? null : <AppFooter />}
    </Layout>
  )
}

export default AppLayout
