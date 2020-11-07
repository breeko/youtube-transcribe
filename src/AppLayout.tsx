import { Layout } from "antd"
import React from "react"
import AppFooter from "./AppFooter"
import AppHeader from "./AppHeader"

const { Content } = Layout

interface AppLayoutProps {
  showFooter?: boolean
}

const AppLayout: React.FunctionComponent<AppLayoutProps> = (props) => {
  return(
    <Layout>
      <AppHeader />
      <Content className="app-content">
        {props.children}
      </Content>
      { props.showFooter === false ? null : <AppFooter />}
    </Layout>
  )
}

export default AppLayout
