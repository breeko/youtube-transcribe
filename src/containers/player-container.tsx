

import React from "react"
import { createContainer } from "unstated-next"
import { YouTubePlayer } from 'youtube-player/dist/types'


const usePlayerContainer = () => {
  const [ready, setReady] = React.useState(false)
  const [player, setPlayer] = React.useState<YouTubePlayer | undefined>(undefined)
  const [playing, setPlaying] = React.useState(false)
  const [highlightedSeconds, setHighlightedSeconds] = React.useState<undefined | number>(undefined)

  const getCurrentTime = () => player?.getCurrentTime()

  const play = () => { if (!playing) { player?.playVideo(); setPlaying(true) } }
  const pause = () => { if (playing) { player?.pauseVideo(); setPlaying(false) } }

  const seekTo = async (seconds: number) => {
    play()
    let ct = 0
    while (player.getPlayerState() !== 1 && ct < 10) {
      // initial state takes a little bit to start up
      await new Promise(r => setTimeout(r, 500))
      ct += 1
    }
    player?.seekTo(seconds, true)
  }

  const skipSeconds = (seconds: number) => seekTo(player?.getCurrentTime() + seconds)

  const highlightPlaying = () => setHighlightedSeconds(player?.getCurrentTime() + Math.random() / 100)

  React.useEffect(() => {
    if (player === undefined) {
      setReady(false)
    } else {
      setReady(true)
    }
  }, [player])

  return {
    ready,
    playing,
    setPlayer,
    getCurrentTime,
    play,
    pause,
    seekTo,
    skipSeconds,
    setHighlightedSeconds,
    highlightPlaying,
    highlightedSeconds,
  }
}

const PlayerContainer = createContainer(usePlayerContainer)

export default PlayerContainer
