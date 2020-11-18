import React from "react"
import { FiAlertTriangle, FiHome } from "react-icons/fi"
import AppLayout from "../src/AppLayout"
import { Button, Space, Typography } from "antd"
import { useRouter } from "next/router"

const { Title } = Typography

const NotFound: React.FunctionComponent = () => {
  const router = useRouter()

  return(
    <AppLayout>
      <div className="main-page">
        <Title>
          <Space direction="vertical">
            <FiAlertTriangle/>
            Page not found
            <Button onClick={() => router.push("/")} >
              Go Home
            </Button>
          </Space>
        </Title>
      </div>
    </AppLayout>
  )
}

export default NotFound
