import { SpeakerMappingInput } from "../../API"
import moment from "moment"

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
  videoPath?: string
  audioPath?: string
  transcript: string
}

interface UserInfo {
  username: string
  email: string
  emailVerified: boolean
  credits: number
}

interface StagingJob {
  uploaded: moment.Moment
  name: string
  id: string
  status: "completed" | "error" | "started"
  duration: number
  error?: string
}

interface TranscribeJob {
  id: string
  name: string
  created: moment.Moment
  input_path: string
  output_path: string
  start: number
  duration: number
  settings: string
  completed: boolean
  public: boolean
}

type MessageType = 'success' | 'info' | 'warning' | 'error'
