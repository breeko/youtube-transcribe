import { message, Spin } from "antd"
import { Storage } from "aws-amplify"
import { useRouter } from "next/dist/client/router"
import React from "react"
import { SpeakerMappingInput } from "../../../src/API"
import AppLayout from "../../../src/AppLayout"
import Transcript from "../../../src/components/transcript"
import Player from "../../../src/components/player"
import { getVideo } from "../../../src/utils/apiUtils"
import _ from "lodash"
import { Line } from "../../../types/types"
import PlayerContainer from "../../../src/containers/player-container"
import EditModal, { EditModalProps } from "../../../src/modals/edit"

interface VideoInfo {
  name: string
  speakerMapping: Map<string, SpeakerMappingInput>
  videoPath: string
}

const VideoPage: React.FunctionComponent = () => {
  const [videoInfo, setVideoInfo] = React.useState<VideoInfo>()
  const [lines, setLines] = React.useState<Line[]>([])
  const [filteredLines, setFilteredLines] = React.useState<Line[]>([])
  const [search, setSearch] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState(true)
  const [startSeconds, setStartSeconds] = React.useState<number | undefined>(undefined)
  const [editProps, setEditProps] = React.useState<EditModalProps>()
  
  const router = useRouter()

  React.useEffect(() => {
    setFilteredLines(lines)
  }, [lines])

  React.useEffect(() => {
    const { video, t } = router.query
    if (typeof t === "string") {
      const s = Number.parseFloat(t)
      setStartSeconds(s)
    }

    if (typeof video === "string") {
      getVideo({id: video}).then(info => {
        const name = info.name
        const videoPath = info.videoPath
        const speakerMapping = new Map<string, SpeakerMappingInput>()
        info.speakers.forEach(s => speakerMapping.set(s.speaker, s))
        const i = {name, speakerMapping, videoPath}
        setVideoInfo(i)
        document.title = `Deep Chats: ${name}`
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
  }, [router.query])


  React.useEffect(() => {
    if (search === "") {
      setFilteredLines(lines)
    } else {
      const f = lines.filter(l =>
        l.text.toLowerCase().search(search.toLowerCase()) !== -1)
        setFilteredLines(f)
    }
  }, [search])


  const handleEdit = (text: string, speaker: string, startTime: number, endTime: number) => {
    return () => setEditProps({
      text,
      speaker,
      speakerMapping: videoInfo.speakerMapping,
      startTime,
      endTime,
      onClose: () => setEditProps(undefined)
      })
  }

  return(
    <AppLayout hideFooter={true} hideHeader={true}>
      <PlayerContainer.Provider initialState={{startSeconds}}>
        { editProps && <EditModal {...editProps}/> }
        <Spin spinning={isLoading} size="large">
          <div className="video-page-container">
            <Player
              videoId={videoInfo?.videoPath}
              setSearch={(s) => setSearch(s)}
            />
            {filteredLines.length > 0 &&
              <Transcript
                lines={filteredLines}
                speakerMapping={ videoInfo?.speakerMapping }
                highlightWord={search}
                handleEdit={handleEdit}
              />
            }
          </div>
        </Spin>
      </PlayerContainer.Provider>
    </AppLayout>
  )
}

export default React.memo(VideoPage, (a, b) => _.isEqual(a, b))
