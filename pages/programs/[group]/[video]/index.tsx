import { message, Spin } from "antd"
import { Auth, Storage } from "aws-amplify"
import _ from "lodash"
import { useRouter } from "next/router"
import React from "react"
import AppLayout from "../../../../src/AppLayout"
import VideoPageInner from "../../../../src/components/video-page"
import { downloadFromS3, getVideo, saveToS3 } from "../../../../src/utils/apiUtils"
import { VideoInfo } from "../../../../types/types"

const VideoPage: React.FunctionComponent = () => {
  const [videoInfo, setVideoInfo] = React.useState<VideoInfo>()
  const [innerRaw, setInnerRaw] = React.useState<string>()
  const [start, setStart] = React.useState<number | undefined>(undefined)
  const [isLoading, setIsLoading] = React.useState(true)

  const router = useRouter()
  
  const loadInfo = async (id: string) => {
    try {
      const v = await getVideo({id})
      const audioPath = await Storage.get(v.audioPath) as string
      setVideoInfo({...v, audioPath})
      document.title = `Deep Chats: ${v.name}`
      const r = await downloadFromS3(v.transcript)
      setInnerRaw(r)  
    } catch {
      router.push('/404')
    }
    setIsLoading(false)
  }

  React.useEffect(() => {
    const { group, video, t } = router.query
    if (typeof video !== "string" || typeof video !== "string") { return }
    if (typeof t === "string") {
      const s = Number.parseFloat(t)
      setStart(s)
    }

    const videoId = `${group}/${video}`
    loadInfo(videoId)
  }, [router.query])

  const onSave = (content: string) => {
    Auth.currentAuthenticatedUser()
      .then((u) => {
        const groups = u.signInUserSession.accessToken.payload["cognito:groups"]
        const admin = groups.find(g => g === "admin") !== -1
        if (admin) {
          saveToS3(videoInfo.transcript, content)
        } else {
          message.error("Only owner can edit transcripts")
        }
      })
  }

  return(
    <Spin spinning={isLoading}>
      <AppLayout hideFooter={true} hideHeader={true}>
          {!isLoading &&
            <VideoPageInner
              name={videoInfo.name}
              audioPath={videoInfo.audioPath}
              videoPath={videoInfo.videoPath}
              innerRaw={innerRaw}
              start={start}
              onSave={onSave}
            />}
      </AppLayout>
    </Spin>
  )
}

export default React.memo(VideoPage, (a, b) => _.isEqual(a, b))
