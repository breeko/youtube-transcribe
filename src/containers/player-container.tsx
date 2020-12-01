

import React from "react"
import { createContainer } from "unstated-next"
import { YouTubePlayer } from 'youtube-player/dist/types'
import { AudioPlayer } from "../utils/audioPlayer"


const usePlayerContainer = () => {
  const [ready, setReady] = React.useState(false)
  const [duration, setDuration] = React.useState(0)
  const [player, setPlayer] = React.useState<AudioPlayer | null>(null)
  const [playing, setPlaying] = React.useState(false)
  const [highlightedSeconds, setHighlightedSeconds] = React.useState<undefined | number>(undefined)

  const getCurrentTime = () => ready && player.getCurrentTime()

  const play = () => { if (ready) { player?.play().then(() => setPlaying(true)) } }
  const pause = () => { if (ready) { player?.pause(); setPlaying(false) } }
  const reset = () => {
    pause()
    setPlayer(null)
    setHighlightedSeconds(undefined)
    setReady(false)
  }

  const seekTo = async (seconds: number) => {
    if (!ready) { return }
    play()
    let ct = 0
    while (!player.getReady() && ct < 10) {
      // initial state takes a little bit to start up
      await new Promise(r => setTimeout(r, 500))
      ct += 1
    }
    player?.seekTo(seconds)
  }

  const skipSeconds = (seconds: number) => ready && seekTo(player.getCurrentTime() + seconds)

  const highlightPlaying = () => ready && setHighlightedSeconds(player.getCurrentTime() + Math.random() / 100)

  React.useEffect(() => {
    if (player) {
      setReady(true)
    } else {
      setReady(false)
    }
  }, [player])

  return {
    ready,
    reset,
    playing,
    duration,
    setDuration,
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
