import { Space, Button, Divider, Row, Col, Card, Spin, Typography } from "antd"
import { Auth } from "aws-amplify"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { SiGofundme } from "react-icons/si"
import ModalContainer from "../../containers/modal-container"
import { listVideo } from "../../utils/apiUtils"

const { Title, Paragraph } = Typography

interface MainPageProps {

}

interface Latest {
  name: string
  path: string
}

const MainPage: React.FunctionComponent<MainPageProps> = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [latest, setLatest] = React.useState<Latest[]>([])

  const router = useRouter()

  const modalContainer = ModalContainer.useContainer()

  const fetch = React.useCallback(async () => {
    listVideo({})
      .then(v => setLatest(v.map(v => ({ name: v.name, path: v.id }))))
      .finally(() => setIsLoading(false))
  }, [])
  
  React.useEffect(() => {
    fetch()
  }, [])

  const handleGetStarted = () => {
    Auth.currentAuthenticatedUser()
      .then(() => router.push("/account"))
      .catch(() => modalContainer.setModalProps({key: "signin", action: "signup", onSuccess: () => router.push("/account")}))
  }
  
  return(
    <React.Fragment>      
      <div className="main-page">
        <div className="main-splash">
          <Space direction="vertical">
            <img
              src={"https://i.ibb.co/vsL1kFR/deep-chats.png"}
              alt="Deep Chats Logo"
              width={250}
            />
            <Title className="white" level={1}>Deep Chats</Title>
            <Paragraph className="white" type="secondary">Video and audio, transcribed and attributed</Paragraph>
            <Button onClick={handleGetStarted}>Get started for free</Button>
          </Space>
        </div>
        <Divider/>
        <Title level={2}>Featured Programs</Title>
        <Row gutter={[32,32]} className="padded" justify="space-around">
          <Col xs={12} sm={8}>
            <Card
              hoverable
              cover={<img src="https://i.ibb.co/ZmVL6kk/lex-fridman.webp" alt="Lex Fridman"/>}
              onClick={() => router.push("/programs/lex")}
              size="small"
              className="media-card"
            >
              Lex Fridman Podcast
            </Card>
          </Col>
          <Col xs={12} sm={8}>
            <Card
              hoverable
              cover={
                <img
                  style={{padding: "20px"}}
                  src="https://i.ibb.co/bg2DV1X/add.png"
                  alt="Add yours"
                />}
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
            return (
              <Row key={`programs/${m.path}`} gutter={[16, 16]}>
                <Col span={24}>
                  <Link href={ `programs/${m.path}` }>
                    <a style={{color: "inherit"}}>{m.name}</a>
                  </Link>
                </Col>
              </Row>  
            )
          })}
        </Space>
        <Divider />
      </div>
    </React.Fragment>
  )
}

export default MainPage