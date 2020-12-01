import { padStart } from "lodash"

export const parseSeconds = (seconds: number) => {
  if (Number.isNaN(seconds)) {
    return "NA"
  }
  const hours = padStart(Math.floor(seconds / 3600).toString(), 2, "0")
  const min = padStart(Math.floor(seconds / 60 % 60).toString(), 2, "0") 
  const sec = padStart(Math.floor(seconds % 60).toFixed(0).toString(), 2, "0")
  return `${hours}:${min}:${sec}`
}
