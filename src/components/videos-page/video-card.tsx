import { Card, Typography } from "antd"
import { useRouter } from "next/dist/client/router"
import React from "react"

const { Paragraph } = Typography

interface VideoCardProps {
  video: Video
  defaultImage: string
}

const VideoCard: React.FunctionComponent<VideoCardProps> = ({ video, defaultImage }) => {
  const router = useRouter()

  return(
    <Card
      hoverable
      cover={<img src={video.image || defaultImage} />}
      onClick={() => router.push(`/programs/${video.id}`)}
      className="media-card"
      size="small"
    >
      <Paragraph>{video.name}</Paragraph>
      <Paragraph type="secondary">Published: {video.published}</Paragraph>
    </Card>
  )
}

export default VideoCard
