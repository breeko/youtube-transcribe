import { YouTubePlayer } from "youtube-player/dist/types"

export interface AudioPlayer {
  seconds: number
  getCurrentTime: () => number
  getReady: () => boolean
  play: () => Promise<void>
  pause: () => void
  seekTo: (s: number) => void
}

export const getAudioPlayer = (a: HTMLAudioElement): AudioPlayer => {
  const p = {
    getCurrentTime: () => a.currentTime,
    getReady: () => a.readyState > 1,
    play: () => a.play(),
    pause: () => a.pause(),
    seekTo: (s: number) => a.currentTime = s,
    seconds: a.duration
  }
  return p
}

export const getYoutubeAudioPlayer = (yt: YouTubePlayer): AudioPlayer => {
  const p = {
    getCurrentTime: () => yt.getCurrentTime(),
    getReady: () => yt.getPlayerState() === 1,
    play: () => Promise.resolve(yt.playVideo()),
    pause: () => yt.pauseVideo(),
    seekTo: (s: number) => yt.seekTo(s, true),
    seconds: yt.getDuration()
  }
  return p
}
