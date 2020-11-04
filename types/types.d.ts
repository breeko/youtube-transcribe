interface Line {
  speaker: string
  startTime: number,
  endTime: number,
  words: Word[]
}

interface Word {
  content: string
  start?: number
  end?: number
}

declare module 'youtube-player/dist/types' {
  interface YouTubePlayer {
    getCurrentTime: () => Promise<number>
    seekTo: (to: number, forward: boolean) => Promise<void>
    playVideo: () => void
    pauseVideo: () => void
  }
}