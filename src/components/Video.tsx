import { Anchor, Spin, Tooltip } from "antd"
import React from "react"
import YouTube from "react-youtube"
import { YouTubePlayer } from "youtube-player/dist/types"
import { FiRewind, FiPlay, FiFastForward, FiMaximize2, FiPause, FiMinimize2, FiCrosshair } from "react-icons/fi"
import { parseSeconds } from "../utils/timeUtils"
import { setWith } from "lodash"

interface VideoProps {
  videoId: string
  seconds: number
  jump: (to: number) => void
}

const Video: React.FunctionComponent<VideoProps> = ({ jump, videoId, seconds: seek }) => {
  const ref = React.useRef<YouTube>()
  const [loading, setLoading] = React.useState(true)
  const [expanded, setExpanded] = React.useState(false)
  const [seconds, setSeconds] = React.useState(seek || 0)
  const [player, setPlayer] = React.useState<YouTubePlayer>()
  const [playing, setPlaying] = React.useState(false)
  const [wide, setWide] = React.useState(true)
  const [videoWidth, setVideoWidth] = React.useState(640)

  React.useEffect(() => {
    let interval = null;
    if (playing) {
      player.getCurrentTime().then(s => setSeconds(s))
      interval = setInterval(() => {
        player?.getCurrentTime().then(s => setSeconds(s))
      }, 1000);
    } else if (!playing && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playing, seconds]);

  React.useEffect(() => {
    if (ref.current) {
      setPlayer(ref.current.getInternalPlayer())
    }
  }, [ref.current])

  React.useEffect(() => {
    if (seek !== undefined) {
      setLoading(true)
      player?.seekTo(seek, true).then(() => setPlaying(true)).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [player, seek])


  React.useEffect(() => {
    if (player !== undefined) {
      if (playing) {
        player.playVideo()
      } else {
        player?.pauseVideo()
      }
    }
  }, [playing, player])

  React.useLayoutEffect(() => {
    const w = window.innerWidth >= 640
    const vw = Math.min(640, window.innerWidth)
    setWide(w)
    setVideoWidth(vw)
  }, [])

  
  const handleForward = (direction: "forward" | "backward") => {
    setLoading(true)
    switch(direction) {
      case "forward":
        player.seekTo(seconds + 10, true).finally(() => setLoading(false))
        break
      case "backward":
        player.seekTo(seconds - 10, true).finally(() => setLoading(false))
        break
    }
  }
  
  return(
    <Anchor offsetTop={64}>
      <div className="video-collapsed-container">
        <div>
          <div className={wide ? "left" : "undefined"}>
            {expanded ?
              <Tooltip title="Hide video" placement="bottom">
                <FiMinimize2 onClick={() => setExpanded(false)} />
              </Tooltip> :
              <Tooltip title="Show video" placement="bottom">
                <FiMaximize2 onClick={() => setExpanded(true)} />
              </Tooltip>
              }
            <Tooltip title="-10 sec" placement="bottom">
              <FiRewind onClick={() => handleForward("backward")}/>
            </Tooltip>
            {playing ?
              <Tooltip title="Pause" placement="bottom">
                <FiPause onClick={() => setPlaying(false)}/>
              </Tooltip> :
              <Tooltip title="Play" placement="bottom">
                <FiPlay onClick={() => setPlaying(true)}/>
              </Tooltip>
            }
            <Tooltip title="+10 sec" placement="bottom">
              <FiFastForward onClick={() => handleForward("forward")}/>
            </Tooltip>
            <Tooltip title="Jump to Text" placement="bottom">
              <FiCrosshair onClick={() => jump(seconds)}/>
            </Tooltip>
            {loading ? <Spin /> : parseSeconds(seconds)}
          </div>
          <div style={{display: expanded ? "inherit" : "none"}} className={wide ? "right" : undefined}>
            <YouTube opts={{width: `${videoWidth}px`}} ref={ref} videoId={videoId} />
          </div>
        </div>
      </div>
    </Anchor>
  )
}

export default Video
