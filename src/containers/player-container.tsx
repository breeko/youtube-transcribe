

import React from "react"
import { createContainer } from "unstated-next"
import { AudioPlayer } from "../utils/audioPlayer"


const usePlayerContainer = () => {
  const [ready, setReady] = React.useState(false)
  const [duration, setDuration] = React.useState(0)
  // const [player, setPlayer] = React.useState<AudioPlayer | null>(null)
  const [audio, setAudio] = React.useState<React.MutableRefObject<HTMLAudioElement>>(null)
  const [playing, setPlaying] = React.useState(false)
  const [highlightedSeconds, setHighlightedSeconds] = React.useState<undefined | number>(undefined)

  const getCurrentTime = () => ready && audio.current.currentTime

  const play = () => { if (ready) { audio.current.play().then(() => setPlaying(true)) } }
  const pause = () => { if (ready) { audio.current.pause(); setPlaying(false) } }
  const reset = () => {
    pause()
    setAudio(null)
    setHighlightedSeconds(undefined)
    setReady(false)
  }

  const seekTo = async (seconds: number) => {
    if (!ready) { return }
    play()
    let ct = 0
    while (!(audio.current.readyState > 1) && ct < 10) {
      // initial state takes a little bit to start up
      await new Promise(r => setTimeout(r, 500))
      ct += 1
    }
    if (audio !== undefined) {
      audio.current.currentTime = seconds
    }
  }

  const skipSeconds = (seconds: number) => ready && seekTo(audio.current.currentTime + seconds)

  const highlightPlaying = () => ready && setHighlightedSeconds(audio.current.currentTime + Math.random() / 100)

  React.useEffect(() => {
    if (audio?.current) {
      setReady(true)
    } else {
      setReady(false)
    }
  }, [audio?.current])

  return {
    audio,
    ready,
    reset,
    playing,
    duration,
    setDuration,
    setAudio,
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
