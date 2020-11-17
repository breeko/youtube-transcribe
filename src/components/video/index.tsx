import { Divider, Spin } from "antd"
import { Auth } from "aws-amplify"
import parse from 'html-react-parser'
import { useRouter } from "next/dist/client/router"
import React from "react"
import { SpeakerMappingInput } from "../../API"
import ModalContainer from "../../containers/modal-container"
import PlayerContainer from "../../containers/player-container"
import { downloadFromS3, getVideo, saveToS3 } from "../../utils/apiUtils"
import Player from "./player"

interface VideoInfo {
  name: string
  speakerMapping: Map<string, SpeakerMappingInput>
  videoPath: string
  transcript: string
}

const VideoPageInner: React.FunctionComponent = () => {
  const [videoInfo, setVideoInfo] = React.useState<VideoInfo>()
  const [isLoading, setIsLoading] = React.useState(true)
  const [innerRaw, setInnerRaw] = React.useState<string>()
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [inner, setInner] = React.useState<JSX.Element|JSX.Element[]>()

  const innerRef = React.useRef<HTMLDivElement>(null)

  const playerContainer = PlayerContainer.useContainer()
  const modalContainer = ModalContainer.useContainer()

  const router = useRouter()

  React.useEffect(() => {
    const { video, t } = router.query
    if (typeof t === "string") {
      const s = Number.parseFloat(t)
      playerContainer.seekTo(s)
    }

    if (typeof video === "string") {
      getVideo({id: video}).then(info => {
        const name = info.name
        const videoPath = info.videoPath
        const transcript = info.transcript
        const speakerMapping = new Map<string, SpeakerMappingInput>()
        info.speakers.forEach(s => speakerMapping.set(s.speaker, s))
        const i = {name, speakerMapping, videoPath, transcript}
        setVideoInfo(i)
        document.title = `Deep Chats: ${name}`
        downloadFromS3(transcript)
          .then(t => setInnerRaw(t))
      })}
  }, [router.query])


  React.useEffect(() => {
    if (inner === undefined || !playerContainer.ready || !isLoading) { return }
    const transcriptLinks: Element[] = [...document.getElementsByClassName("transcript-link")]
    transcriptLinks.forEach(e => {
      const seconds = Number(e.getAttribute("data-start"))
      if (!isNaN(seconds)) {
        e.addEventListener("click", () => playerContainer.seekTo(seconds))
      }
    })
    setIsLoading(false)
  }, [inner, playerContainer.ready])

  React.useEffect(() => {
    const elems: Element[] = [...document.getElementsByClassName("transcript-sentence")]
    const toFind = Math.floor(playerContainer.highlightedSeconds * 100) / 100
    const toHighlightIdx = elems.findIndex(e => {
      const start = Number(e.getAttribute("data-start"))
      const end = Number(e.getAttribute("data-end"))
      return start <= toFind && toFind <= end
    })
    const el = elems[toHighlightIdx]

    if (el) {
      el.classList.add("highlight-fade")
      el.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'

      })
    }
  }, [playerContainer.highlightedSeconds])


  React.useEffect(() => {
    if (innerRaw) {
      setInner(parse(innerRaw))
    }
  }, [innerRaw])

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((u) => {
        const groups = u.signInUserSession.accessToken.payload["cognito:groups"]
        const admin = groups.find(g => g === "admin") !== -1
        setIsAdmin(admin)
      })
      .catch(() => setIsAdmin(false))
  }, [])

  React.useEffect(() => {
    if (isAdmin && !isLoading) {
      const editable = [
        ...document.getElementsByClassName("inner-sentence"),
        ...document.getElementsByClassName("transcript-link")
      ]
      editable.forEach(e => {
        e.addEventListener("click", (ev) => {
          e.setAttribute("contenteditable", "true")
        })
        e.addEventListener("blur", (ev) => {
          e.removeAttribute("contenteditable")
        })
        // e.setAttribute("contenteditable", "true")
      })
    }
  }, [isAdmin, isLoading])

  const handleSave = () => {
    if (isAdmin && innerRef.current && videoInfo.transcript) {
      const clean = innerRef.current.innerHTML.replace(/contenteditable="true"/g, "")
      saveToS3(videoInfo.transcript, clean)
    }
  }

  const handleAuth = (action: "login" | "logout") => {
    switch(action) {
      case "logout":
        Auth.signOut().finally(() => setIsAdmin(false))
        break
      case "login":
        modalContainer.setModalProps({ key: "signin", onSuccess: () => setIsAdmin(true)})
        break
    }
  }

  return(
    <Spin spinning={isLoading} size="large">
      {modalContainer.modal}
      <div className="video-page-container">
        <Player
          videoId={videoInfo?.videoPath}
          save={isAdmin ? handleSave : undefined}
          handleAuth={handleAuth}
        />
        <Divider style={{marginTop: "70px"}}/>
        <div ref={innerRef}>
          {inner}
        </div>
      </div>
    </Spin>

  )
}

export default VideoPageInner
