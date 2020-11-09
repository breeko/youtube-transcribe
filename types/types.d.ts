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

interface VideoMetadata {
  speakerMapping?: SpeakerMapping
  name: string,
  uploaded: string,
  videoId: string
}

interface SpeakerMapping {
  [speaker: string]: {
    name: string
    style?: "italics"
  }
}

declare module 'youtube-player/dist/types' {
  interface YouTubePlayer {
    getCurrentTime: () => number // Promise<number>
    seekTo: (to: number, forward: boolean) => void//Promise<void>
    playVideo: () => void
    pauseVideo: () => void
  }
}

declare module "*.svg" {
  const content: string
  export default content
}
