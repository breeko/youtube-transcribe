import { Anchor, Divider, Drawer, message, Space, Spin, Tooltip } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import Search from "antd/lib/input/Search"
import Link from "next/link"
import React from "react"
import { FiCrosshair, FiFastForward, FiHome, FiMaximize2, FiMinimize2, FiPause, FiPlay, FiRewind, FiSearch, FiTrash2, FiX } from "react-icons/fi"
import YouTube from "react-youtube"
import { YouTubePlayer } from "youtube-player/dist/types"
import { parseSeconds } from "../utils/timeUtils"

interface VideoProps {
  videoId: string
  seconds: number
  jump: (to: number) => void
  setSearch: (s: string) => void
}

const Video: React.FunctionComponent<VideoProps> = ({ jump, videoId, seconds, setSearch }) => {
  const [showSearch, setShowSearch] = React.useState(false)
  const [curSearch, setCurSearch] = React.useState<string>("")
  const [expanded, setExpanded] = React.useState(false)
  const [curSeconds, setCurSeconds] = React.useState(seconds || 0)
  const [playing, setPlaying] = React.useState(false)
  const [player, setPlayer] = React.useState<YouTubePlayer | undefined>(undefined)
  const [size, setSize] = React.useState({width: 480, height: 292 })

  const ref = React.useRef<HTMLDivElement>(null)

  const MIN_SEARCH_LENGTH = 3

  React.useEffect(() => {
    // updates the time
    let interval = null;
    if (playing) {
      interval = setInterval(() => {  
        const s = player?.getCurrentTime()
        if (s !== undefined) {
          setCurSeconds(s)
        }
      }, 1000)
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playing])


  React.useEffect(() => {
    if (playing) {
      player?.playVideo()
    } else {
      player?.pauseVideo()
    }
  }, [playing, player])

  const updateSize = React.useCallback(() => {
    const width = Math.min(window.innerWidth - 20, 480)
    const height = Math.floor(width / 1.64)
    if (width !== size.width || height !== size.height) {
      setSize({width, height})
    }
  }, [])

  React.useEffect(() => {
    if (seconds !== undefined) {
      // TODO: this doesn't work when video first loaded, not played yet and someone seeks
      setPlaying(true)
      setTimeout(() => {
        player?.seekTo(seconds, true)
      }, 500)
    }
  }, [seconds])

  React.useEffect(() => {

    window.addEventListener('resize', updateSize)
    // updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const handleSearch = (search?: string) => {
    if (curSearch.length >= MIN_SEARCH_LENGTH) {
      setSearch(curSearch)
    } else if (curSearch === "") {
      setSearch(undefined)
    } else {
      message.error("Search at least 3 characters")
    }
  }
  
  const handleForward = React.useCallback((direction: "forward" | "backward") => {
    switch(direction) {
      case "forward":
        player?.seekTo(curSeconds + 15, true)
        setCurSeconds(p => p + 15)
        break
      case "backward":
        setCurSeconds(p => p - 15)
        player?.seekTo(curSeconds - 15, true)
        break
    }
  }, [curSeconds])

  return(
    <div className="video-collapsed-row" >
      {/* must set style here because it doesn't work in less */}
      <div className="video-collapsed-container" style={{fontSize: "min(6vw, 36px)"}}>
      {showSearch ?
        <React.Fragment>
          &nbsp;
          <Search
            placeholder="Search"

            className="search-input"
            value={curSearch}
            onChange={s => setCurSearch(s.target.value)}
            onPressEnter={() => handleSearch()}
          />
          <FiTrash2
            className={curSearch === "" ? "faded" : undefined}
            onClick={() => { setCurSearch(""); setSearch(undefined) }}
          />
          <FiX onClick={() => setShowSearch(false)}/>
        </React.Fragment> :
        <React.Fragment>
          <Link href="/">
            <FiHome />
          </Link>
          <Divider type="vertical" />
          <span>
            {parseSeconds(curSeconds)}
          </span>
          <Divider type="vertical" />
          { expanded ?
            <FiMinimize2 onClick={() => setExpanded(false)} /> :
            <FiMaximize2 onClick={() => setExpanded(true)} />
          }
          <FiRewind onClick={() => handleForward("backward")} />
          {playing ?
            <FiPause onClick={() => setPlaying(false)}/> :
            <FiPlay onClick={() => setPlaying(true)}/>
          }
          <FiFastForward onClick={() => handleForward("forward")} />
          <FiCrosshair onClick={() => { jump(curSeconds)} } />
          <FiSearch onClick={() => setShowSearch(true)} />
        </React.Fragment>
        }
        </div>
      <div style={{display: expanded ? "inherit" : "none"}} ref={ref}>
        <YouTube
          onReady={t => setPlayer(t.target)}
          opts={{height: `${size.height}`, width: `${size.width}`}}
          videoId={videoId}
        />
      </div>
    </div>
  )
}

export default React.memo(Video, (a, b) => a.videoId === b.videoId && a.seconds === b.seconds)
