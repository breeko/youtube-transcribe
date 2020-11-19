import { Divider, message, Spin } from "antd"
import { Auth } from "aws-amplify"
import parse from 'html-react-parser'
import { useRouter } from "next/dist/client/router"
import React from "react"
import { VideoInfo } from "../../../types/types"
import ModalContainer from "../../containers/modal-container"
import PlayerContainer from "../../containers/player-container"
import { saveToS3 } from "../../utils/apiUtils"
import Player from "./player"

interface VideoPageInnerProps {
  videoInfo: VideoInfo
  innerRaw: string
  start: number | undefined

}

const VideoPageInner: React.FunctionComponent<VideoPageInnerProps> = (props) => {
  const { videoInfo, innerRaw, start } = props

  const [isAdmin, setIsAdmin] = React.useState(false)
  const [inner, setInner] = React.useState<JSX.Element|JSX.Element[]>()
  const [speakers, setSpeakers] = React.useState<string[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const innerRef = React.useRef<HTMLDivElement>(null)

  const playerContainer = PlayerContainer.useContainer()
  const modalContainer = ModalContainer.useContainer()

  const router = useRouter()

  const parseSpeaker = (e: Element) => e.innerHTML.trim().split(" ").slice(1).join(" ")

  React.useEffect(() => {
    if (start) {
      playerContainer.setHighlightedSeconds(start)
    }
    setInner(parse(innerRaw))
    Auth.currentAuthenticatedUser()
      .then((u) => {
        const groups = u.signInUserSession.accessToken.payload["cognito:groups"]
        const admin = groups.find(g => g === "admin") !== -1
        setIsAdmin(admin)
      })
      .catch(() => setIsAdmin(false))
  }, [])


  React.useEffect(() => {
    // setup inner html
    if (inner === undefined || !playerContainer.ready) { return }
    const transcriptLinks: Element[] = [...document.getElementsByClassName("transcript-link")]
    const newSpeakers = new Set<string>()
    transcriptLinks.forEach(e => {
      const seconds = Number(e.getAttribute("data-start"))
      if (!isNaN(seconds)) {
        e.addEventListener("click", () => playerContainer.seekTo(seconds))
      }

      const s = parseSpeaker(e)
      newSpeakers.add(s)
    })
    setSpeakers([...newSpeakers])
    setIsLoading(false)
  }, [inner, playerContainer.ready])

  React.useEffect(() => {
    if (playerContainer.highlightedSeconds === undefined) { return }
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
    if (isAdmin && !isLoading) {
      const editable = [
        ...document.getElementsByClassName("inner-sentence"),
        ...document.getElementsByClassName("transcript-link")
      ]
      editable.forEach(e => {
        e.addEventListener("click", () => {
          e.setAttribute("contenteditable", "true")
        })
        e.addEventListener("blur", () => {
          e.removeAttribute("contenteditable")
        })
      })
    }
  }, [isAdmin, isLoading])

  const handleSave = () => {
    if (isAdmin && innerRef.current && videoInfo.transcript) {
      const clean = innerRef.current.innerHTML.replace(/contenteditable="true"/g, "")
      saveToS3(videoInfo.transcript, clean)
    }
  }

  const handleEditSpeakerMappings = () => {
    modalContainer.setModalProps({
      key: "edit-mappings",
      speakers,
      onSuccess: (s) => updateSpeakerMapping(s)
    })
  }

  const updateSpeakerMapping = (speakers: Object) => {
    const orig = [...document.getElementsByClassName("transcript-link")]
    const newSpeakers = new Set<string>()
    let ct = 0
    Object.entries(speakers).forEach(([prior, updated]) => {
      orig.forEach(o => {
        const s = parseSpeaker(o)
        if (s === prior) {
          o.innerHTML = o.innerHTML.replace(prior, updated)
          newSpeakers.add(updated)
          ct += 1
        } else {
          newSpeakers.add(s)
        }
      })
    })
    setSpeakers([...newSpeakers])
    message.success(`Renamed ${ct} speakers`)
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
          handleEditSpeakerMappings={handleEditSpeakerMappings}
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
