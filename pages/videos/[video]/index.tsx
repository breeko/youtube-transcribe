import { message, Spin } from "antd"
import { Storage } from "aws-amplify"
import { useRouter } from "next/dist/client/router"
import React from "react"
import unzipper from "unzipper"
import AppLayout from "../../../src/AppLayout"
import Transcript from "../../../src/components/transcript"
import Video from "../../../src/components/video"
import { getMetadata } from "../../../src/utils/apiUtils"
import { process } from "../../../src/utils/process"
import { getWordDisplay } from "../../../src/utils/utils"

const VideoPage: React.FunctionComponent = () => {
  const [meta, setMeta] = React.useState<VideoMetadata>()
  const [videoId, setVideoId] = React.useState<string | undefined>()
  const [lines, setLines] = React.useState<Line[]>([])
  const [filteredLines, setFilteredLines] = React.useState<Line[]>([])
  const [search, setSearch] = React.useState<string | undefined>(undefined)
  const [seconds, setSeconds] = React.useState<number|undefined>()
  const [jumpToSeconds, setJumpToSeconds] = React.useState<number|undefined>()
  const [isLoading, setIsLoading] = React.useState(true)

  const router = useRouter()

  const fetchVideo = async () => {    
    if (Object.keys(router.query).length === 0) { return }
    const { video, t } = router.query
    if (typeof t === "string") {
      const s = Number.parseFloat(t)
      setSeconds(s)
      setJumpToSeconds(s)
    }

    if (typeof video === "string") {
      setVideoId(video)
      const storageKey = `${video}/transcript.json.zip`
      Storage.get(storageKey, { download: true} )
        .then((source: { Body: Blob }) => source.Body.arrayBuffer()
          .then(b => unzipper.Open.buffer(Buffer.from(b)))
            .then(dir => dir.files[0]?.buffer()
              .then(d => setLines(process(d.toString())))))
            .catch(() => message.error("Failed to parse")) // failed to parse
          .catch(() => message.error("Array buffer failed")) // array buffer failed
        .catch(() => message.error("Key doesn't exist")) // key doesn't exist
        .finally(() => setIsLoading(false))
    }
  }

  React.useEffect(() => {
    if (videoId) {
      getMetadata(`${videoId}/meta.json`).then((m: VideoMetadata) => {
        document.title = `Deep Chats: ${m.name}`
        setMeta(m)
      })
    }
  }, [videoId])

  React.useEffect(() => {
    setFilteredLines(lines)
  }, [lines])

  React.useEffect(() => {
    fetchVideo()
  }, [router.query])

  React.useEffect(() => {
    if (search === undefined) {
      setFilteredLines(lines)
    } else {
      const f = lines.filter(l =>
        l.words.map(getWordDisplay).join("").toLowerCase().search(search.toLowerCase()) !== -1)
        setFilteredLines(f)
    }
  }, [search])

  return(
    <AppLayout hideFooter={true} hideHeader={true}>
      <Spin spinning={isLoading} size="large">
        <Video
          videoId={videoId}
          seconds={seconds}
          jump={setJumpToSeconds}
          setSearch={(s) => setSearch(s)}
        />
        <Transcript
          lines={filteredLines}
          speakerMapping={meta?.speakerMapping || {}}
          jumpToSeconds={jumpToSeconds}
          setSeconds={setSeconds}
          highlightWord={search}
        />
      </Spin>
    </AppLayout>
  )
}

export default VideoPage
