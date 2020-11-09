import { Col, Divider, Row, Space, Spin, Typography } from "antd"
import { Storage } from "aws-amplify"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import AppLayout from "../src/AppLayout"
import { getMetadata } from "../src/utils/apiUtils"
import { isDefined } from "../src/utils/utils"

const { Title } = Typography

const Main: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [metas, setMetas] = React.useState<VideoMetadata[]>([])

  const fetch = React.useCallback(async () => {
    // const keys = await Storage.list("").then(out => out.map((o: {key: string}) => console.log(o.key)))
    const keys = await Storage.list("").then(async (metas: Array<{key: string}>) =>
      metas.map(k => k.key.endsWith("meta.json") ? k.key : undefined
    ))
    const m = keys.filter(isDefined).map(async k => await getMetadata(k))
    Promise.all(m).then(m => setMetas(m as VideoMetadata[]))
    setIsLoading(false)
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
          {metas.map(m => {
            const pathname = `videos/${m.videoId}`
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
