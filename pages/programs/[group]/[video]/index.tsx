import { Spin } from "antd"
import _ from "lodash"
import { useRouter } from "next/router"
import React from "react"
import AppLayout from "../../../../src/AppLayout"
import VideoPageInner from "../../../../src/components/video-page"
import PlayerContainer from "../../../../src/containers/player-container"
import { downloadFromS3, getVideo } from "../../../../src/utils/apiUtils"
import { VideoInfo } from "../../../../types/types"

const VideoPage: React.FunctionComponent = () => {
  const [videoInfo, setVideoInfo] = React.useState<VideoInfo>()
  const [innerRaw, setInnerRaw] = React.useState<string>()
  const [start, setStart] = React.useState<number | undefined>(undefined)
  const [isLoading, setIsLoading] = React.useState(true)

  const router = useRouter()
  
  React.useEffect(() => {
    const { group, video, t } = router.query
    if (typeof video !== "string" || typeof video !== "string") { return }
    if (typeof t === "string") {
      const s = Number.parseFloat(t)
      setStart(s)
    }

    const videoId = `${group}/${video}`

    getVideo({id: videoId})
      .then(info => {
        const name = info.name
        const videoPath = info.videoPath
        const transcript = info.transcript
        const i = {name, videoPath, transcript}
        setVideoInfo(i)
        document.title = `Deep Chats: ${name}`
        downloadFromS3(transcript)
          .then(t => setInnerRaw(t))
          .catch(() => router.push("/404"))
          .finally(() => setIsLoading(false))
        })
      .catch(() => router.push("/404"))
  }, [router.query])

  return(
    <Spin spinning={isLoading}>
      <AppLayout hideFooter={true} hideHeader={true}>
          <PlayerContainer.Provider initialState={undefined}>
            {!isLoading &&
              <VideoPageInner videoInfo={videoInfo} innerRaw={innerRaw} start={start} />}
          </PlayerContainer.Provider>
      </AppLayout>
    </Spin>
  )
}

export default React.memo(VideoPage, (a, b) => _.isEqual(a, b))
