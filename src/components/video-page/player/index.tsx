import { Button, Divider, Popover, Space } from "antd"
import { useRouter } from "next/router"
import React from "react"
import { FiCrosshair, FiFastForward, FiHome, FiLogIn, FiLogOut, FiMaximize2, FiMenu, FiMinimize2, FiPause, FiPlay, FiRewind, FiSave, FiUsers } from "react-icons/fi"
import YouTube from "react-youtube"
import PlayerContainer from "../../../containers/player-container"
import { parseSeconds } from "../../../utils/timeUtils"


interface PlayerProps {
  videoId: string
  save?: () => void
  handleAuth: (action: "login" | "logout") => void
  handleEditSpeakerMappings: () => void
}

const Player: React.FunctionComponent<PlayerProps> = (props) => {
  const { videoId, save, handleAuth, handleEditSpeakerMappings } = props
  const [curSeconds, setCurSeconds] = React.useState(0)
  const [curExpanded, setCurExpanded] = React.useState(false)
  const [optionsExpanded, setOptionsExpanded] = React.useState(false)

  const playerContainer = PlayerContainer.useContainer()

  const router = useRouter()

  React.useEffect(() => {
    // updates the time
    let interval = null;
    const s = playerContainer.getCurrentTime()
    if (s !== undefined) {
      setCurSeconds(s)
    }
    if (playerContainer.playing) {
      interval = setInterval(() => {  
        const s = playerContainer.getCurrentTime()
        if (s !== undefined) {
          setCurSeconds(s)
        }
      }, 1000)
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playerContainer.playing])

  return(
    <div className="video-collapsed-row" >
      {/* must set style here because it doesn't work in less */}
      <div style={{display: curExpanded ? "inherit" : "none"}}>
        <YouTube
          onReady={t => playerContainer.setPlayer(t.target)}
          onPlay={() => playerContainer.play()}
          onPause={() => playerContainer.pause()}
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
          <FiRewind onClick={() => playerContainer.skipSeconds(-15)} />
          {playerContainer.playing ?
            <FiPause onClick={() => playerContainer.pause()}/> :
            <FiPlay onClick={() => playerContainer.play()}/>
          }
          <FiFastForward onClick={() => playerContainer.skipSeconds(15)} />
          <FiCrosshair onClick={() => { playerContainer.highlightPlaying()} } />
          
          <Popover
            placement="bottom"
            title={null}
            trigger="click"
            visible={optionsExpanded}
            onVisibleChange={setOptionsExpanded}
            content={
              <Space direction="vertical">
                <Button
                  icon={<FiSave/>}
                  onClick={() => { save(); setOptionsExpanded(false) }}
                  className="wide"
                  disabled={save === undefined}
                >
                  &nbsp;Save
                </Button>
                <Button 
                  icon={<FiUsers/>}
                  onClick={() => { handleEditSpeakerMappings(); setOptionsExpanded(false) }}
                  className="wide" disabled={save === undefined}
                >
                  &nbsp;Edit speaker mappings
                </Button>
                
                <Button
                  icon={save ? <FiLogOut/> : <FiLogIn/>}
                  className="wide"
                onClick={() => handleAuth(save ? "logout" : "login")}
                >
                  &nbsp;{save ? "Logout" : "Login"}
                </Button>

              </Space>
            }
          >
            <FiMenu />  
          </Popover>
            
        </React.Fragment>
      </div>
    </div>
  )
}

export default Player
