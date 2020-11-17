import { Card, Col, Divider, Row, Space, Spin, Typography } from "antd"
import Link from "next/link"
import React from "react"
import AppLayout from "../src/AppLayout"
import { listVideo } from "../src/utils/apiUtils"

const { Title, Paragraph } = Typography

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
        <Space direction="vertical">
          <img
            src={"https://i.ibb.co/HgtBvtN/deep-chats.png"}
            alt="Deep Chats Logo"
            width={250}
          />
          <Title level={1}>Deep Chats</Title>
          <Paragraph type="secondary">Video and audio, transcribed and attributed</Paragraph>
        </Space>
        <Divider/>
        <Title level={2}>Featured Programs</Title>
        <Row gutter={[32,32]}>
          <Col xs={12} sm={8}>
            <Card cover={<img src="https://i.ibb.co/ZmVL6kk/lex-fridman.webp" alt="Lex Fridman"/>}>
              {/* <Card.Meta title="Lex Fridman Podcast" /> */}
              Lex Fridman Podcast
              <br/>
            </Card>
          </Col>
          <Col xs={12} sm={8}>
            <Card cover={<img src="https://i.ibb.co/bg2DV1X/add.png" alt="Add yours"/>}>
              <a href="mailto=sponsor@deep-chats.com">Contact us</a> to be featured
            </Card>
          </Col>
        </Row>
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
                  <Link href={ pathname }>
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
