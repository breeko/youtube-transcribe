interface Line {
  speaker: string
  startTime: number,
  words: Array<{content: string, start?: string, end?: string}>
}

declare module 'youtube-player/dist/types' {
  interface YouTubePlayer {
    getCurrentTime: () => Promise<number>
    seekTo: (to: number, forward: boolean) => Promise<void>
    playVideo: () => void
    pauseVideo: () => void
  }
}