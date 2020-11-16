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

type SpeakerMapping = Map<string, SpeakerMappingInput>
declare module "*.svg" {
  const content: string
  export default content
}
