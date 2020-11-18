import { Card, Col, Divider, Row, Space, Spin, Typography } from "antd"
import { useRouter } from "next/dist/client/router"
import Link from "next/link"
import React from "react"
import { SiGofundme } from "react-icons/si"
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

  const router = useRouter()

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
      <div className="main-page">
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
        <Row gutter={[32,32]} className="padded" justify="space-around">
          <Col xs={12} sm={8}>
            <Card
              hoverable
              cover={<img src="https://i.ibb.co/ZmVL6kk/lex-fridman.webp" alt="Lex Fridman"/>}
              onClick={() => router.push("/lex")}
              size="small"
              className="media-card"
            >
              
              Lex Fridman Podcast
            </Card>
          </Col>
          <Col xs={12} sm={8}>
            <Card
              hoverable
              cover={<img src="https://i.ibb.co/bg2DV1X/add.png" alt="Add yours"/>}
              onClick={() => window.open("mailto:feature@deep-chats.com")}
              size="small"
              className="media-card"
            >
              <a href="mailto=feature@deep-chats.com">Contact us</a> to be featured
            </Card>
          </Col>
        </Row>
        <Divider />
        <a href="https://www.gofundme.com/f/transcribe-lex-fridman-podcasts">
          <SiGofundme size={60}/>
          <Paragraph>
              Sponsor transcription of all Lex Fridman Podcast episodes (at cost)
          </Paragraph>
        </a>
        
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
        <Divider />
      </div>
    </AppLayout>
  )
}

export default Main
