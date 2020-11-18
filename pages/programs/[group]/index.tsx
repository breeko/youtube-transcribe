import { Col, Divider, Row, Spin } from "antd"
import Title from "antd/lib/typography/Title"
import { useRouter } from "next/dist/client/router"
import React from "react"
import AppLayout from "../../../src/AppLayout"
import VideoCard from "../../../src/components/videos-page/video-card"
import { getMediaFull } from "../../../src/utils/apiUtils"

const GroupPage: React.FunctionComponent = () => {
  const [media, setMedia] = React.useState<MediaFull>()
  const [loading, setLoading] = React.useState(true)

  const router = useRouter()

  React.useEffect(() => {
    const { group } = router.query
    if (group === undefined) { return }
    const id = typeof group === "string" ? group : group.join("/")
    getMediaFull(id)
      .then(m => setMedia(m))
      .finally(() => setLoading(false))
  })

  return(
    <AppLayout>
      <Spin spinning={loading}>
        <div className="main-page">
          <Title>{media?.name}</Title>
          <Divider type="horizontal"/>
          <Row className="padded" gutter={[32, 32]} justify="space-around">
          {media?.videos.map(v => {
            return(
              <Col xs={24} sm={12} md={8}>
                <VideoCard video={v} defaultImage={media.image}/>
              </Col>
            )
          })}
          </Row>
        </div>
      </Spin>
    </AppLayout>
  )
}

export default GroupPage