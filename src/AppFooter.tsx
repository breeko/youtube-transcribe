import React from "react"
import { Button, Layout } from "antd"
import { FiGithub } from "react-icons/fi"

const { Footer } = Layout

const AppFooter: React.FunctionComponent = () => {
  return(<Footer className="app-footer">
    <Button icon={<FiGithub />} href="https://www.github.com/breeko/youtube-transcribe"/>
    
  </Footer>)
}

export default AppFooter
