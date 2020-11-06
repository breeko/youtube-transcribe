import { Spin } from "antd"
import { Storage } from "aws-amplify"
import { useRouter } from "next/dist/client/router"
import React from "react"
import AppLayout from "../../../src/AppLayout"
import Transcript from "../../../src/components/transcript"
import Video from "../../../src/components/video"
import { process } from "../../../src/utils/process"
import { Typography } from "antd"
import { getWordDisplay } from "../../../src/utils/utils"
import unzipper from "unzipper"

const { Paragraph } = Typography

const VideoPage: React.FunctionComponent = () => {
  const [videoId, setVideoId] = React.useState<string | undefined>()
  const [lines, setLines] = React.useState<Line[]>([])
  const [filteredLines, setFilteredLines] = React.useState<Line[]>([])
  const [isError, setIsError] = React.useState(false)
  const [search, setSearch] = React.useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = React.useState(true)
  const [seconds, setSeconds] = React.useState<number|undefined>()
  const [jumpToSeconds, setJumpToSeconds] = React.useState<number|undefined>()

  const router = useRouter()

  const fetchVideo = async () => {    
    if (Object.keys(router.query).length === 0) { return }
    const { video } = router.query
    if (typeof video === "string") {
      setVideoId(video)
      const storageKey = `${video}/transcript.json.zip`
      Storage.get(storageKey, { download: true} )
        .then((source: { Body: Blob }) => source.Body.arrayBuffer()
          .then(b => unzipper.Open.buffer(Buffer.from(b)))
            .then(dir => dir.files[0]?.buffer()
              .then(d => setLines(process(d.toString())))))
            .catch(() => setIsError(true)) // failed to parse
          .catch(() => setIsError(true)) // array buffer failed
        .catch(() => setIsError(true)) // key doesn't exist
        .finally(() => setIsLoading(false))
    }
  }

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
  // const videoId = "_L3gNaAVjQ4"
  
  // TODO: add this to json
  const speakerMappings: {[speaker: string]: string} = {spk_0: "Lex Fridman", spk_1: "George Hotz"}

  return(
    <AppLayout>
        <Spin spinning={isLoading} size="large">
          <Video videoId={videoId} seconds={seconds} jump={setJumpToSeconds} setSearch={setSearch}/>
          {
            !isLoading && false && lines.length === 0 ?
              <Paragraph>Transcript not found</Paragraph> :
              <Transcript
                lines={filteredLines}
                speakerMapping={speakerMappings}
                jumpToSeconds={jumpToSeconds}
                setSeconds={setSeconds}
                highlightWord={search}
              />
          }
        </Spin>
    </AppLayout>
  )
}

export default VideoPage
