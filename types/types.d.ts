import { SpeakerMappingInput } from "../../API"
interface Line {
  speaker: string
  startTime: number,
  endTime: number,
  text: string, //Word[]
}

interface Word {
  content: string
  start?: number
  end?: number
}

declare module "*.svg" {
  const content: string
  export default content
}

interface VideoInfo {
  name: string
  videoPath: string
  transcript: string
}
