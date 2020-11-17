import { Divider } from "antd"
import { useRouter } from "next/dist/client/router"
import React from "react"
import { FiCrosshair, FiFastForward, FiHome, FiLogIn, FiLogOut, FiMaximize2, FiMinimize2, FiPause, FiPlay, FiRewind, FiSave } from "react-icons/fi"
import YouTube from "react-youtube"
import PlayerContainer from "../../../containers/player-container"
import { parseSeconds } from "../../../utils/timeUtils"


interface PlayerProps {
  videoId: string
  save?: () => void
  handleAuth: (action: "login" | "logout") => void
}

const Player: React.FunctionComponent<PlayerProps> = (props) => {
  const { videoId, save, handleAuth } = props
  const [curSeconds, setCurSeconds] = React.useState(0)
  const [curExpanded, setCurExpanded] = React.useState(false)
  const [size, setSize] = React.useState({width: 480, height: 292 })

  const playerController = PlayerContainer.useContainer()

  const router = useRouter()

  const updateSize = React.useCallback(() => {
    const width = Math.min(window.innerWidth - 20, 480)
    const height = Math.floor(width / 1.64)
    if (width !== size.width || height !== size.height) {
      setSize({width, height})
    }
  }, [])

  React.useEffect(() => {
    // updates the time
    let interval = null;
    const s = playerController.getCurrentTime()
    if (s !== undefined) {
      setCurSeconds(s)
    }
    if (playerController.playing) {
      interval = setInterval(() => {  
        const s = playerController.getCurrentTime()
        if (s !== undefined) {
          setCurSeconds(s)
        }
      }, 1000)
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playerController.playing])


  React.useEffect(() => {
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return(
    <div className="video-collapsed-row" >
      {/* must set style here because it doesn't work in less */}
      <div style={{display: curExpanded ? "inherit" : "none"}}>
        <YouTube
          onReady={t => playerController.setPlayer(t.target)}
          onPlay={() => playerController.play()}
          onPause={() => playerController.pause()}
          videoId={videoId}
          containerClassName="youtubeContainer"
        />
      </div>

      <div className="video-collapsed-container" style={{fontSize: "min(5vw, 36px)"}}>
        <React.Fragment>
          <FiHome onClick={ () => router.push("/") }/>
          <Divider type="vertical" />
          <span>
            {parseSeconds(curSeconds)}
          </span>
          <Divider type="vertical" />
          { curExpanded ?
            <FiMinimize2 onClick={() => setCurExpanded(false)} /> :
            <FiMaximize2 onClick={() => setCurExpanded(true)} />
          }
          <FiRewind onClick={() => playerController.skipSeconds(-15)} />
          {playerController.playing ?
            <FiPause onClick={() => playerController.pause()}/> :
            <FiPlay onClick={() => playerController.play()}/>
          }
          <FiFastForward onClick={() => playerController.skipSeconds(15)} />
          <FiCrosshair onClick={() => { playerController.highlightPlaying()} } />
          <FiSave onClick={save} className={save === undefined ? "faded" : "inherit"}/>
          {
            save === undefined ?
            <FiLogIn onClick={() => handleAuth("login")} /> :
            <FiLogOut onClick={() => handleAuth("logout")} />
          }
            
        </React.Fragment>
      </div>
    </div>
  )
}

export default Player
