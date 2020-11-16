import { API, graphqlOperation, Storage } from "aws-amplify"
import { message } from "antd"
import { GetVideoQuery, GetVideoQueryVariables, ListMediasQuery, ListMediasQueryVariables, ListVideosQuery, ListVideosQueryVariables } from "../API"
import * as queries from '../../src/graphql/queries'
import { isDefined } from "./utils"
import _ from "lodash"

const noLimit = { limit: 65536 }

export const getVideoId = (url: string): string => {
  const rx = /(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9-_]{1,})/g
  const arr = rx.exec(url)
  return arr == null || arr.length < 3 ? "" : arr[2]
}

export const getMetadata = (key: string): Promise<object> => {
  return Storage.get(key, {download: true})
    .then((source: { Body: Blob }) => source.Body.text())
      .then(m => JSON.parse(m))
      .catch(() => message.error("Failed to parse metadata"))
    .catch(() => message.error("Failed to get metadata"))
}

export const downloadFromS3 = (key: string) =>
  Storage.get(key, { download: true} )
    .then((source: { Body: Blob }) => source.Body.text()
      .then(d => d.toString())
    .catch(() => message.error("Failed to parse")))
    .catch(() => message.error("Failed to retrieve"))


export const saveToS3 = (key: string, data: string) =>
  Storage.put(key, data)
    .then(() => message.success("File saved", 2))
    .catch(() => message.error("Save failed", 2))

// media
export const listMedia = async (variables: ListMediasQueryVariables) => {
  const m = await API.graphql(graphqlOperation(queries.listMedias, {...noLimit, ...variables})) as {data: ListMediasQuery}
  const filtered = m.data.listMedias?.items?.filter(isDefined) || []
  const sorted = _.orderBy(filtered, [i => i.name])
  return sorted
}

export const listVideo = async (variables: ListVideosQueryVariables) => {
  const m = await API.graphql(graphqlOperation(queries.listVideos, {...noLimit, ...variables})) as {data: ListVideosQuery}
  const filtered = m.data.listVideos?.items?.filter(isDefined) || []
  const sorted = _.orderBy(filtered, [i => i.name])
  return sorted
}

export const getVideo = async (variables: GetVideoQueryVariables) => {
  const m = await API.graphql(graphqlOperation(queries.getVideo, variables)) as {data: GetVideoQuery}
  return m.data.getVideo
}
