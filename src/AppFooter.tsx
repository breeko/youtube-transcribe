import React from "react"
import { Button, Layout, Space } from "antd"
import { FiGithub, FiMail } from "react-icons/fi"

const { Footer } = Layout

const AppFooter: React.FunctionComponent = () => {
  return(<Footer className="app-footer">
      <Space direction="horizontal">
        <Button icon={<FiMail />} href="mailto:branko@deep-chats.com"/>
        <Button icon={<FiGithub />} href="https://www.github.com/breeko/youtube-transcribe"/>
      </Space>
    
  </Footer>)
}

export default AppFooter
