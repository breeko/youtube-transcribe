

import React from "react"
import { createContainer } from "unstated-next"
import { YouTubePlayer } from 'youtube-player/dist/types'


const usePlayerController = (initialState: {startSeconds?: number}) => {

  const [player, setPlayer] = React.useState<YouTubePlayer | undefined>(undefined)
  const [playing, setPlaying] = React.useState(false)
  const [curSeconds, setCurSeconds] = React.useState(initialState.startSeconds || 0)
  const [highlightedSeconds, setHighlightedSeconds] = React.useState<undefined | number>(undefined)

  const getCurrentTime = () => player?.getCurrentTime()

  const play = () => { player?.playVideo(); setPlaying(true) }
  const pause = () => { player?.pauseVideo(); setPlaying(false) }

  // so that it re-renders
  const seekTo = (seconds: number) => player?.seekTo(seconds + Math.random() / 100, true)

  const skipSeconds = (seconds: number) => seekTo(player?.getCurrentTime() + seconds)

  const highlightPlaying = () => setHighlightedSeconds(player?.getCurrentTime())

  React.useEffect(() => {
    // updates the time
    let interval = null;
    player && setCurSeconds(player.getCurrentTime())
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

  return {
    playing,
    setPlayer,
    getCurrentTime,
    play,
    pause,
    seekTo,
    skipSeconds,
    setHighlightedSeconds,
    curSeconds,
    highlightPlaying,
    highlightedSeconds,
  }
}

const PlayerContainer = createContainer(usePlayerController)

export default PlayerContainer
