import { Storage } from "aws-amplify"
import { message } from "antd"

export const getVideoId = (url: string): string => {
  const rx = /(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9-_]{1,})/g
  const arr = rx.exec(url)
  return arr == null || arr.length < 3 ? "" : arr[2]
}

export const getMetadata = (key: string): Promise<object> => {
  console.log(key)
  return Storage.get(key, {download: true})
    .then((source: { Body: Blob }) => source.Body.text())
      .then(m => JSON.parse(m))
      .catch(() => message.error("Failed to parse metadata"))
    .catch(() => message.error("Failed to get metadata"))

}
