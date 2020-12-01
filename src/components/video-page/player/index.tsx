import { Button, Divider, message, Popover, Slider, Space } from "antd"
import { useRouter } from "next/router"
import React from "react"
import { FiCrosshair, FiFastForward, FiHome, FiLogIn, FiLogOut, FiMaximize2, FiMenu, FiMinimize2, FiPause, FiPlay, FiRewind, FiSave, FiUser, FiUsers } from "react-icons/fi"
import YouTube from "react-youtube"
import { YouTubePlayer } from "youtube-player/dist/types"
import PlayerContainer from "../../../containers/player-container"
import { getVideoId } from "../../../utils/apiUtils"
import { AudioPlayer, getAudioPlayer, getYoutubeAudioPlayer } from "../../../utils/audioPlayer"
import { parseSeconds } from "../../../utils/timeUtils"

interface PlayerProps {
  videoPath?: string
  audioPath: string
  save?: () => void
  handleAuth?: (action: "login" | "logout") => void
  handleEditSpeakerMappings?: () => void
  fixed?: boolean
}

const Player: React.FunctionComponent<PlayerProps> = (props) => {
  const { audioPath, videoPath, save, handleAuth, handleEditSpeakerMappings, fixed } = props

  const [sliderSeconds, setSliderSeconds] = React.useState(0)
  const [curSeconds, setCurSeconds] = React.useState(0)
  const [curExpanded, setCurExpanded] = React.useState(false)
  const [optionsExpanded, setOptionsExpanded] = React.useState(false)
  const [videoId, setVideoId] = React.useState(videoPath ? getVideoId(videoPath) : undefined)

  const playerContainer = PlayerContainer.useContainer()

  const router = useRouter()

  React.useEffect(() => {
    if (videoPath === undefined) {
      // message.info("Video not available", 2.0)
    }
    return () => playerContainer.reset()
  }, [])

  React.useEffect(() => {
    if (videoId === undefined) {
      const audio = new Audio(audioPath)
      const p = getAudioPlayer(audio)
      playerContainer.setPlayer(p)
      audio.addEventListener('loadedmetadata', () => playerContainer.setDuration(audio.duration))
    }
  }, [])

  React.useEffect(() => {
    // updates the time
    let interval = null;
    const s = playerContainer.getCurrentTime()
    if (s !== undefined) {
      setCurSeconds(s)
      setSliderSeconds(s)
    }
    if (playerContainer.playing) {
      interval = setInterval(() => {  
        const s = playerContainer.getCurrentTime()
        if (s !== undefined) {
          setCurSeconds(s)
          setSliderSeconds(s)
        }
      }, 1000)
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playerContainer.playing])

  const handleError = (event: {target: YouTubePlayer, data: number}) => {
    switch(event.data){
      case 2:
        message.error("Video url contains an invalid parameter value")
        break
      case 5:
        message.error('Video content cannot be played in an HTML5 player')
        break
      case 100:
        message.error('Video requested was not found')
        break
      case 101:
      case 150:
        message.error('Video uploader has blocked this content from embedded playback')
        break
      default:
        message.error('error code: ' + event.data)
    }
    setVideoId(undefined)
  }

  return(
    <div className={(fixed ? "fixed " : "") + "video-collapsed-row"} >
      <div className="video-collapsed-container" style={{fontSize: "min(5vw, 36px)"}}>
          <React.Fragment>

            <FiHome onClick={ () => router.push("/") }/>
            <FiUser onClick={ () => router.push("/account") }/>
            <Divider type="vertical" />
            <span>
              {parseSeconds(curSeconds)}
            </span>
            <Divider type="vertical" />
            { curExpanded ?
              <FiMinimize2 onClick={() => setCurExpanded(false)} className={!videoId && "faded"}/> :
              <FiMaximize2 onClick={() => setCurExpanded(true)}  className={!videoId && "faded"}/>
            }
            <FiRewind onClick={() => playerContainer.skipSeconds(-15)} />
            {playerContainer.playing ?
              <FiPause onClick={() => playerContainer.pause()}/> :
              <FiPlay onClick={() => playerContainer.play()}/>
            }
            <FiFastForward onClick={() => playerContainer.skipSeconds(15)} />
            <FiCrosshair onClick={() => { playerContainer.highlightPlaying()} } />
            
            {handleAuth && <Popover
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
                  {handleEditSpeakerMappings && <Button 
                    icon={<FiUsers/>}
                    onClick={() => { handleEditSpeakerMappings(); setOptionsExpanded(false) }}
                    className="wide" disabled={save === undefined}
                  >
                    &nbsp;Edit speaker mappings
                  </Button>}
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
          }
          <Slider
            value={sliderSeconds}
            max={playerContainer.duration}
            onChange={(s) => setSliderSeconds(s)}
            onAfterChange={(s) => playerContainer.seekTo(s)}
            tipFormatter={(v) => parseSeconds(v)}
            tooltipPlacement="bottom"
          />
        </React.Fragment>
      </div>
      {/* must set style here because it doesn't work in less */}
      {videoId !== undefined &&
        <div style={{display: curExpanded ? "inherit" : "none"}}>
        <YouTube
          onReady={t => {
            const p = getYoutubeAudioPlayer(t.target)
            playerContainer.setPlayer(p)
            playerContainer.setDuration(t.target.getDuration())
          }}
          onPlay={() => playerContainer.play()}
          onPause={() => playerContainer.pause()}
          videoId={videoId}
          containerClassName="youtubeContainer"
          onError={handleError}
        />
      </div>
      }
    </div>
  )
}

export default Player
