import { Card } from "antd"
import { useRouter } from "next/dist/client/router"
import React from "react"

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
      onClick={() => router.push(`videos/${video.id}`)}
      style={{height: "100%"}}
    >
      {video.name}
    </Card>
  )
}

export default VideoCard
