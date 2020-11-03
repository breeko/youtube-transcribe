import { useRouter } from "next/dist/client/router"
import React from "react"
import data from '../../../data/lex-fridman-george-hotz-142.json'
import AppLayout from "../../../src/AppLayout"
import Transcript from "../../../src/components/Transcript"
import Video from "../../../src/components/Video"
import { process } from "../../../src/utils/process"

const VideoPage: React.FunctionComponent = () => {
  const [videoId, setVideoId] = React.useState<string | undefined>()
  const [isLoading, setIsLoading] = React.useState(true)
  const [seconds, setSeconds] = React.useState<number|undefined>()
  const [jumpToSeconds, setJumpToSeconds] = React.useState<number|undefined>()

  const router = useRouter()

  const fetchVideo = async () => {    
    if (Object.keys(router.query).length === 0) { return }
    const { video } = router.query
    if (typeof video === "string") {
      setVideoId(video)
    }
    setIsLoading(false)
  }

  React.useEffect(() => {
    fetchVideo()
  }, [router.query])

  // const videoId = "_L3gNaAVjQ4"
  const lines = process(JSON.stringify(data))
  
  // TODO: add this to json
  const speakerMappings: {[speaker: string]: string} = {spk_0: "Lex Fridman", spk_1: "George Hotz"}

  return(
    <AppLayout>
      <Video videoId={videoId} seconds={seconds} jump={setJumpToSeconds}/>
      <Transcript lines={lines} speakerMapping={speakerMappings} jumpToSeconds={jumpToSeconds} setSeconds={setSeconds}/>
    </AppLayout>
  )
}

export default VideoPage
