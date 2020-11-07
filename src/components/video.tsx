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

const Video: React.FunctionComponent<VideoProps> = ({ jump, videoId, seconds, setSearch }) => {
  const [loading, setLoading] = React.useState(true)
  // const [regexEnabled, setRegexEnabled] = React.useState(false)
  const [curSearch, setCurSearch] = React.useState<string>("")
  const [expanded, setExpanded] = React.useState(false)
  const [curSeconds, setCurSeconds] = React.useState(seconds || 0)
  const [playing, setPlaying] = React.useState(false)
  const [player, setPlayer] = React.useState<YouTubePlayer | undefined>(undefined)
  const [wide, setWide] = React.useState(true)
  const [size, setSize] = React.useState({width: 640, height: 390})

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
    const w = window.innerWidth >= 1090
    setWide(w)
    const width = Math.min(window.innerWidth - 80, 640)
    const height = Math.floor(width / 1.64)
    if (width != size.width) {
      setSize({width, height})
    }
  }, [])

  React.useEffect(() => {
    if (seconds !== undefined) {
      // TODO: this doesn't work when video first loaded, not played yet and someone seeks
      player.seekTo(seconds, true)
      setPlaying(true)
    }
  }, [seconds])

  React.useEffect(() => {

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
  
  const handleForward = React.useCallback((direction: "forward" | "backward") => {
    setLoading(true)
    switch(direction) {
      case "forward":
        player?.seekTo(curSeconds + 15, true)
        setCurSeconds(p => p + 15)
        setLoading(false)
        break
      case "backward":
        setCurSeconds(p => p - 15)
        player?.seekTo(curSeconds - 15, true)
        setLoading(false)
        break
    }
  }, [curSeconds])

  return(
    <Anchor offsetTop={64} className="video-collapsed-anchor">
      <div className="video-collapsed-container">
            {parseSeconds(curSeconds)}
            <Divider type="vertical"/>
              <Space direction="horizontal" >
              {expanded ?
                <Tooltip title="Hide video" placement="bottom" mouseEnterDelay={1}>
                  <FiMinimize2 onClick={() => setExpanded(false)} />
                </Tooltip> :
                <Tooltip title="Show video" placement="bottom" mouseEnterDelay={1}>
                  <FiMaximize2 onClick={() => setExpanded(true)} />
                </Tooltip>
                }
              <Tooltip title="-15 sec" placement="bottom" mouseEnterDelay={1}>
                <FiRewind onClick={() => handleForward("backward")}/>
              </Tooltip>
              {playing ?
                <Tooltip title="Pause" placement="bottom" mouseEnterDelay={1}>
                  <FiPause onClick={() => setPlaying(false)}/>
                </Tooltip> :
                <Tooltip title="Play" placement="bottom" mouseEnterDelay={1}>
                  <FiPlay onClick={() => setPlaying(true)}/>
                </Tooltip>
              }
              <Tooltip title="+15 sec" placement="bottom" mouseEnterDelay={1}>
                <FiFastForward onClick={() => handleForward("forward")}/>
              </Tooltip>
              <Tooltip title="Jump to Text" placement="bottom" mouseEnterDelay={1}>
                <FiCrosshair onClick={() => { jump(curSeconds)} } />
              </Tooltip>
              </Space>
              <Divider type="vertical"/>
              <Search
                placeholder="Search"
                size="large"
                className="search-input"
                value={curSearch}
                onChange={s => setCurSearch(s.target.value)}
                onPressEnter={() => handleSearch()} />
          
          {/* <Tooltip title="Regex" placement="bottom">
            <VscRegex className={regexEnabled ? undefined : "faded"} onClick={() => setRegexEnabled(p => !p)}/>
          </Tooltip> */}
          </div>
          <div style={{display: expanded ? "inherit" : "none"}} className={wide ? "right" : "left"}>
            <YouTube
              onReady={t => {setPlayer(t.target); setLoading(false)}}
              opts={{height: `${size.height}`, width: `${size.width}`}}
              videoId={videoId}
            />
          </div>
    </Anchor>
  )
}

export default React.memo(Video, (a, b) => a.videoId === b.videoId && a.seconds === b.seconds)
