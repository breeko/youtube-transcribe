import { Col, Divider, Row, Space, Spin, Typography } from "antd"
import { Storage } from "aws-amplify"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import AppLayout from "../src/AppLayout"
import { listVideo } from "../src/utils/apiUtils"


const { Title } = Typography

interface Latest {
  name: string
  path: string
}
const Main: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [latest, setLatest] = React.useState<Latest[]>([])

  const fetch = React.useCallback(async () => {
    listVideo({})
      .then(v => setLatest(v.map(v => ({ name: v.name, path: v.id }))))
      .finally(() => setIsLoading(false))
  }, [])
  
  React.useEffect(() => {
    fetch()
  }, [])

  return(
    <AppLayout>
      <div className="list-videos">
        <img
          src={"https://i.ibb.co/gRp6Jbq/tree-racket.png"}
          alt="Deep Chats Logo"
          width={250}
          height={250}
        />
        <Title>Deep Chats</Title>
        <Divider />
        <Spin spinning={isLoading}>
          <Title level={3}>Latest Videos</Title>
        </Spin>
        <Space direction="vertical" >
          {latest.map(m => {
            const pathname = `videos/${m.path}`
            return (
              <Row key={pathname} gutter={[16, 16]}>
                <Col span={24}>
                  <Link href={{ pathname }}>
                    <a style={{color: "inherit"}}>{m.name}</a>
                  </Link>
                </Col>
              </Row>  
            )
          })}
        </Space>
      </div>
    </AppLayout>
  )
}

export default Main
