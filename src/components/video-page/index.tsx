import { Divider, message, Spin } from "antd"
import { Auth } from "aws-amplify"
import parse from 'html-react-parser'
import React from "react"
import ModalContainer from "../../containers/modal-container"
import PlayerContainer from "../../containers/player-container"
import { sentenceClick } from "./nodeUtils"
import Player from "./player"

interface VideoPageInnerProps {
  name: string
  audioPath?: string
  videoPath?: string
  innerRaw: string
  start: number | undefined
  onSave: (content: string) => void
}

const VideoPageInner: React.FunctionComponent<VideoPageInnerProps> = (props) => {
  const { name, audioPath, videoPath, innerRaw, start, onSave } = props

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [inner, setInner] = React.useState<JSX.Element|JSX.Element[]>()
  const [speakers, setSpeakers] = React.useState<string[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const innerRef = React.useRef<HTMLDivElement>(null)

  const playerContainer = PlayerContainer.useContainer()
  const modalContainer = ModalContainer.useContainer()

  const parseSpeaker = (e: Element) => e.innerHTML.trim().split(" ").slice(1).join(" ")

  React.useEffect(() => {
    if (start) {
      playerContainer.setHighlightedSeconds(start)
    }
    setInner(parse(innerRaw))
    Auth.currentAuthenticatedUser()
      .then((u) => setIsLoggedIn(true)).catch(() => setIsLoggedIn(false))
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
    const highlightSentence = elems.find(e => {
      const start = Number(e.getAttribute("data-start"))
      const end = Number(e.getAttribute("data-end"))
      return start <= toFind && toFind <= end
    })
    if (highlightSentence === undefined) { return }
    const children = [...highlightSentence.querySelector(".inner-sentence").children]
    const startIdx = children.findIndex(c => Number(c.getAttribute("data-start")) >= toFind)
    const els = children.slice(startIdx, startIdx + 20)
    console.log(els)
    if (els && els.length > 0) {
      els[0].scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      })
      els.forEach(el => el.classList.add("highlight-fade"))
    }
  }, [playerContainer.highlightedSeconds])

  React.useEffect(() => {
    if (isLoggedIn && !isLoading) {
      const transcripts = [...document.getElementsByClassName("transcript-link")]
      const editable = [
        ...document.getElementsByClassName("inner-sentence"),
        ...transcripts
      ]
      editable.forEach(e => {
        e.addEventListener("click", () => sentenceClick(e))
        e.addEventListener("blur", () => {
          e.parentElement.querySelectorAll("sentence-action").forEach(n => n.remove())
          e.removeAttribute("contenteditable")
        })
      })
    }
  }, [isLoggedIn, isLoading])

  const handleSave = () => {
    if (innerRef.current) {
      innerRef.current.querySelectorAll("span.sentence-action").forEach(s => s.remove())
      innerRef.current.querySelectorAll(".highlight-fade").forEach(s => s.classList.remove("highlight-fade"))
      const readOnly = innerRef.current.innerHTML.replace(/contenteditable="true"/g, "")
      onSave(readOnly)
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
        Auth.signOut().finally(() => setIsLoggedIn(false))
        break
      case "login":
        modalContainer.setModalProps({
           key: "signin", action: "signin", onSuccess: () => setIsLoggedIn(true)})
        break
    }
  }

  return(
    <Spin spinning={isLoading} size="large">
      {modalContainer.modal}
      <div className="video-page-container">
        <Player
          fixed
          videoPath={videoPath}
          audioPath={audioPath}
          save={isLoggedIn ? handleSave : undefined}
          handleAuth={handleAuth}
          handleEditSpeakerMappings={handleEditSpeakerMappings}
        />
        <Divider style={{marginTop: "100px"}}/>
        <div ref={innerRef}>
          {inner}
        </div>
      </div>
    </Spin>

  )
}

export default VideoPageInner
