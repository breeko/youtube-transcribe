import { Divider, message } from "antd"
import Search from "antd/lib/input/Search"
import { useRouter } from "next/dist/client/router"
import React from "react"
import { FiCrosshair, FiFastForward, FiHome, FiMaximize2, FiMinimize2, FiPause, FiPlay, FiRewind, FiSearch, FiTrash2, FiX } from "react-icons/fi"
import YouTube from "react-youtube"
import PlayerContainer from "../../containers/player-container"
import { parseSeconds } from "../../utils/timeUtils"

interface PlayerProps {
  videoId: string
  setSearch: (s: string) => void
}

const Player: React.FunctionComponent<PlayerProps> = (props) => {
  const { videoId, setSearch } = props
  const [showSearch, setShowSearch] = React.useState(false)
  const [curSearch, setCurSearch] = React.useState<string>("")
  const [curExpanded, setCurExpanded] = React.useState(false)
  const [size, setSize] = React.useState({width: 480, height: 292 })

  const ref = React.useRef<HTMLDivElement>(null)
  const playerController = PlayerContainer.useContainer()

  const router = useRouter()

  const MIN_SEARCH_LENGTH = 3

  const updateSize = React.useCallback(() => {
    const width = Math.min(window.innerWidth - 20, 480)
    const height = Math.floor(width / 1.64)
    if (width !== size.width || height !== size.height) {
      setSize({width, height})
    }
  }, [])

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

  return(
    <div className="video-collapsed-row" >
      {/* must set style here because it doesn't work in less */}
      <div style={{display: curExpanded ? "inherit" : "none"}} ref={ref}>
        <YouTube
          onReady={t => playerController.setPlayer(t.target)}
          opts={{height: `${size.height}`, width: `${size.width}`}}
          onPlay={() => playerController.play()}
          onPause={() => playerController.pause()}
          videoId={videoId}
        />
      </div>

      <div className="video-collapsed-container" style={{fontSize: "min(6vw, 36px)"}}>
      
      {showSearch ?
        <React.Fragment>
          &nbsp;
          <Search
            autoFocus
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
          <FiHome onClick={ () => router.push("/") }/>
          <Divider type="vertical" />
          <span>
            {parseSeconds(playerController.curSeconds)}
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
          <FiSearch onClick={() => setShowSearch(true)} />
        </React.Fragment>
        }
        </div>
    </div>
  )
}

export default React.memo(Player, (a, b) => a.videoId === b.videoId)
