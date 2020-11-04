import { Spin } from "antd"
import { Storage } from "aws-amplify"
import { useRouter } from "next/dist/client/router"
import React from "react"
import AppLayout from "../../../src/AppLayout"
import Transcript from "../../../src/components/transcript"
import Video from "../../../src/components/Video"
import { process } from "../../../src/utils/process"

const VideoPage: React.FunctionComponent = () => {
  const [videoId, setVideoId] = React.useState<string | undefined>()
  const [lines, setLines] = React.useState<Line[]>([])
  const [isError, setIsError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [seconds, setSeconds] = React.useState<number|undefined>()
  const [jumpToSeconds, setJumpToSeconds] = React.useState<number|undefined>()

  const router = useRouter()

  const fetchVideo = async () => {    
    if (Object.keys(router.query).length === 0) { return }
    const { video } = router.query
    if (typeof video === "string") {
      setVideoId(video)
      Storage.get(`${video}.json`, { download: true} )
        .then((e: {Body: Blob}) => e.Body.text()
          .then(s => process(s)))
          .then(l => setLines(l))
          .catch(() => setIsError(true))
        .finally(() => setIsLoading(false))
        .catch(() => setIsError(true))
    }
  }

  React.useEffect(() => {
    fetchVideo()
  }, [router.query])

  // const videoId = "_L3gNaAVjQ4"
  
  // TODO: add this to json
  const speakerMappings: {[speaker: string]: string} = {spk_0: "Lex Fridman", spk_1: "George Hotz"}

  return(
    <AppLayout>
      {isLoading ? <Spin /> :
        <React.Fragment>
          <Video videoId={videoId} seconds={seconds} jump={setJumpToSeconds}/>
          <Transcript lines={lines} speakerMapping={speakerMappings} jumpToSeconds={jumpToSeconds} setSeconds={setSeconds}/>
        </React.Fragment>
      }
    </AppLayout>
  )
}

export default VideoPage
