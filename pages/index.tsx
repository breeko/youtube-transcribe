import React from "react"
import AppLayout from "../src/AppLayout"
import { Storage } from "aws-amplify"
import { getMetadata, VideoMetadata } from "../src/utils/apiUtils"
import { Col, Divider, Row, Space, Typography } from "antd"
import Link from "next/link"
import Image from "next/image"
import { isDefined } from "../src/utils/utils"

const { Title } = Typography

const Main: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [metas, setMetas] = React.useState<VideoMetadata[]>([])

  const fetch = React.useCallback(async () => {
    // const keys = await Storage.list("").then(out => out.map((o: {key: string}) => console.log(o.key)))
    const keys = await Storage.list("").then(out => out.map(async (o: {key: string}) => {
      const videoId = /^(.+)\/transcript.json.zip$/.exec(o.key)?.[1]
      if (videoId !== undefined) {
        return await getMetadata(videoId)
      }
    }))
    const metas: VideoMetadata[] = await Promise.all(keys)
    setMetas(metas.filter(isDefined))
    setIsLoading(false)
  }, [])
  
  React.useEffect(() => {
    fetch()
  }, [])

  return(
    <AppLayout>
      <div className="list-videos">
        <Image
          src="/images/tree-racket.svg"
          alt="Deep Chats Logo"
          width={250}
          height={250}
        />
        <Title>Deep Chats</Title>
        <Divider />
        <Title level={3}>Current Videos</Title>
        <Space direction="vertical" >
          {metas.map(m => {
            const pathname = `videos/${m.video_details.videoId}`
            return (
              <Row key={pathname} gutter={[16, 16]}>
                <Col span={24}>
                  <Link href={{ pathname }}>
                    <a style={{color: "inherit"}}>{m.title}</a>
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
