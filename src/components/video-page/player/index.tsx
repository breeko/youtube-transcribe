import { Divider } from "antd"
import { useRouter } from "next/router"
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

  const playerController = PlayerContainer.useContainer()

  const router = useRouter()

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
