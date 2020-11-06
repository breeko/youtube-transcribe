import React from "react"
import { Anchor, Divider, Layout, Space, Typography } from "antd"
import Link from "next/link"
import Avatar from "antd/lib/avatar/avatar"

const { Title } = Typography
// import Tree from '../public/images/tree-racket.png'

const { Header } = Layout

const AppHeader: React.FunctionComponent = () => {
  return(
  <Anchor>
    <Header className="app-header">
      <Link href="/">
        <a className="white">
          <Space direction="horizontal">
            <Avatar src="/images/tree-racket.svg" />
            {/* TODO: add title and make it look good */}
          </Space>
        </a>
      </Link>
    </Header>
  </Anchor>)
}

export default AppHeader
