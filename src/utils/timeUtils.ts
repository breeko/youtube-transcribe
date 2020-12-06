import { padStart } from "lodash"

export const parseSeconds = (seconds: number | string) => {
  const s = Number(seconds)
  if (Number.isNaN(s)) {
    return "NA"
  }
  const hours = padStart(Math.floor(s / 3600).toString(), 2, "0")
  const min = padStart(Math.floor(s / 60 % 60).toString(), 2, "0") 
  const sec = padStart(Math.floor(s % 60).toFixed(0).toString(), 2, "0")
  return `${hours}:${min}:${sec}`
}
