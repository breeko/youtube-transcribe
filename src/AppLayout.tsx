import { Layout } from "antd"
import React from "react"
import AppFooter from "./AppFooter"
import AppHeader from "./AppHeader"

const { Content } = Layout

const AppLayout: React.FunctionComponent = (props) => {
  return(
    <Layout>
      <AppHeader />
      <Content className="app-content">
        {props.children}
      </Content>
      <AppFooter />
    </Layout>
  )
}

export default AppLayout
