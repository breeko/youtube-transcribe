import { Anchor, Divider, message, Space, Spin, Tooltip } from "antd"
import Search from "antd/lib/input/Search"
import React from "react"
import { FiCrosshair, FiFastForward, FiMaximize2, FiMinimize2, FiPause, FiPlay, FiRewind } from "react-icons/fi"
import YouTube from "react-youtube"
import { YouTubePlayer } from "youtube-player/dist/types"
import { parseSeconds } from "../utils/timeUtils"

interface VideoProps {
  videoId: string
  seconds: number
  jump: (to: number) => void
  setSearch: (s: string) => void
}

const Video: React.FunctionComponent<VideoProps> = ({ jump, videoId, seconds: seek, setSearch }) => {
  const ref = React.useRef<YouTube>()
  const [loading, setLoading] = React.useState(true)
  // const [regexEnabled, setRegexEnabled] = React.useState(false)
  const [curSearch, setCurSearch] = React.useState<string>("")
  const [expanded, setExpanded] = React.useState(false)
  const [seconds, setSeconds] = React.useState(seek || 0)
  const [player, setPlayer] = React.useState<YouTubePlayer | undefined>(undefined)
  const [playing, setPlaying] = React.useState(seek !== undefined ? true : false)
  const [wide, setWide] = React.useState(true)
  const [size, setSize] = React.useState({width: 640, height: 390})

  const MIN_SEARCH_LENGTH = 3

  React.useEffect(() => {
    // updates the time
    let interval = null;
    if (playing) {
      player?.getCurrentTime().then(s => setSeconds(s))
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
      player?.seekTo(seek, true)
        .then(() => setPlaying(true))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [player, seek])


  React.useEffect(() => {
    if (playing) {
      player?.playVideo()
    } else {
      player?.pauseVideo()
    }
  }, [playing, player])

  React.useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth >= 851
      setWide(w)
      const width = Math.min(window.innerWidth - 80, 640)
      const height = Math.floor(width / 1.64)
      if (width != size.width) {
        setSize({width, height})
      }
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])


  const handleSearch = () => {
    if (curSearch.length >= MIN_SEARCH_LENGTH) {
      setSearch(curSearch)
    } else if (curSearch === "") {
      setSearch(undefined)
    } else {
      message.error("Search at least 3 characters")
    }
  }
  
  const handleForward = (direction: "forward" | "backward") => {
    setLoading(true)
    switch(direction) {
      case "forward":
        player.seekTo(seconds + 15, true).then(() => setPlaying(true)).finally(() => setLoading(false))
        break
      case "backward":
        player.seekTo(seconds - 15, true).then(()=> setPlaying(true)).finally(() => setLoading(false))
        break
    }
  }
  
  return(
    <Spin spinning={loading}>
      <Anchor offsetTop={64} className="video-collapsed-anchor">
        <div className="video-collapsed-container">
            <div className={wide ? "left" : "undefined"}>
              {loading ? <Spin /> : parseSeconds(seconds)}
              <Divider type="vertical"/>
              <Space direction="horizontal">
                {expanded ?
                  <Tooltip title="Hide video" placement="bottom">
                    <FiMinimize2 onClick={() => setExpanded(false)} />
                  </Tooltip> :
                  <Tooltip title="Show video" placement="bottom">
                    <FiMaximize2 onClick={() => setExpanded(true)} />
                  </Tooltip>
                  }
                <Tooltip title="-15 sec" placement="bottom">
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
                <Tooltip title="+15 sec" placement="bottom">
                  <FiFastForward onClick={() => handleForward("forward")}/>
                </Tooltip>
                <Tooltip title="Jump to Text" placement="bottom">
                  <FiCrosshair onClick={() => jump(seconds)}/>
                </Tooltip>
              </Space>
            </div>
            <div style={{display: expanded ? "inherit" : "none"}} className={wide ? "right" : "left"}>
              <YouTube opts={{height: `${size.height}`, width: `${size.width}`}} ref={ref} videoId={videoId} />
            </div>
            <div className={expanded ? "left" : "right"}>
              <Space direction="horizontal">
                <div className="flex-col">
                  <Search
                    placeholder="Search"
                    size="large"
                    className="search-input"
                    value={curSearch}
                    onChange={s => setCurSearch(s.target.value)}
                    onPressEnter={() => handleSearch()}
                  />
                </div>
                {/* <Tooltip title="Regex" placement="bottom">
                  <VscRegex className={regexEnabled ? undefined : "faded"} onClick={() => setRegexEnabled(p => !p)}/>
                </Tooltip> */}
                &nbsp; {/* hack to make items align */}
              </Space>
            </div>
          </div>
      </Anchor>
    </Spin>
  )
}

export default Video
