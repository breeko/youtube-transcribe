import { message, Spin } from "antd"
import { Storage } from "aws-amplify"
import { useRouter } from "next/dist/client/router"
import React from "react"
import { SpeakerMappingInput } from "../../../src/API"
import AppLayout from "../../../src/AppLayout"
import Transcript from "../../../src/components/transcript"
import Video from "../../../src/components/video"
import { getVideo } from "../../../src/utils/apiUtils"
import _ from "lodash"

interface VideoInfo {
  name: string
  speakerMapping: Map<string, SpeakerMappingInput>
  videoPath: string
}


const VideoPage: React.FunctionComponent = () => {
  const [videoInfo, setVideoInfo] = React.useState<VideoInfo>()
  const [lines, setLines] = React.useState<Line[]>([])
  const [filteredLines, setFilteredLines] = React.useState<Line[]>([])
  const [search, setSearch] = React.useState<string | undefined>(undefined)
  const [seconds, setSeconds] = React.useState<number|undefined>()
  const [jumpToSeconds, setJumpToSeconds] = React.useState<number|undefined>()
  const [isLoading, setIsLoading] = React.useState(true)

  const router = useRouter()

  React.useEffect(() => {
    setFilteredLines(lines)
  }, [lines])

  React.useEffect(() => {
    const { video, t } = router.query
    if (typeof t === "string") {
      const s = Number.parseFloat(t)
      setSeconds(s)
      setJumpToSeconds(s)
    }

    if (typeof video === "string") {
      getVideo({id: video}).then(info => {
        const name = info.name
        const videoPath = info.videoPath
        const speakerMapping = new Map<string, SpeakerMappingInput>()
        info.speakers.forEach(s => speakerMapping.set(s.speaker, s))
        const i = {name, speakerMapping, videoPath}
        setVideoInfo(i)
        Storage.get(info.transcript, { download: true} )
          .then((source: { Body: Blob }) => source.Body.text()
            .then(d => setLines(JSON.parse(d.toString())))
          .catch(() => message.error("Failed to parse"))) // failed to parse
          })
          .catch(() => message.error("Failed to retrieve video info"))
          .finally(() => setIsLoading(false))
      } else {
        setIsLoading(false)
      }
  }, [])


  React.useEffect(() => {
    if (search === undefined) {
      setFilteredLines(lines)
    } else {
      const f = lines.filter(l =>
        l.words.toLowerCase().search(search.toLowerCase()) !== -1)
        setFilteredLines(f)
    }
  }, [search])

  return(
    <AppLayout hideFooter={true} hideHeader={true}>
      <Spin spinning={isLoading} size="large">
        <div className="video-page-container">
          <Video
            videoId={videoInfo?.videoPath}
            seconds={seconds}
            jump={setJumpToSeconds}
            setSearch={(s) => setSearch(s)}
          />
          <Transcript
            lines={filteredLines}
            speakerMapping={ videoInfo?.speakerMapping }
            jumpToSeconds={jumpToSeconds}
            setSeconds={setSeconds}
            highlightWord={search}
          />
        </div>
      </Spin>
    </AppLayout>
  )
}

export default VideoPage
