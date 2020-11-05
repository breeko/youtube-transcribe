import axios from "axios"
import XRegExp from "xregexp"

const qsToJson = (queryString: string) => {
  let res: {[k: string]: any} = {}
  let params = queryString.split("&")
  for (let i in params) {
      const keyValuePair = params[i].split("=")
      const key = keyValuePair[0]
      const value = keyValuePair[1]
      res[key] = decodeURIComponent(value)
  }
  return res;
}

export interface VideoMetadata {
  title: string
  video_details:  
   { videoId: string
     title: string
     lengthSeconds: string
     keywords: string[]
     channelId: string
     isOwnerViewing: boolean
     shortDescription: string
     isCrawlable: boolean 
     thumbnail: { thumbnails: [Object] }, 
     averageRating: number
     allowRatings: boolean
     viewCount: string
     author: string
     isPrivate: boolean
     isUnpluggedCorpus: boolean
     isLiveContent: boolean
     publishDate: string
   }
}

export const getMetadata = async (videoId: string, noCors?: boolean): Promise<VideoMetadata> => {
  const url = noCors ?
    `https://www.youtube.com/get_video_info?video_id=${videoId}` :
    `https://cors-anywhere.twelve31.workers.dev/?https://www.youtube.com/get_video_info?video_id=${videoId}`
  const video_metadata: {[k: string]: any} = {}
  const response = await axios.get(url)
  const get_video_info = qsToJson(response.data)
  let tmp = get_video_info["url_encoded_fmt_stream_map"]
  if (tmp) {
      tmp = tmp.split(",")
      for (let i in tmp) {
        tmp[i] = qsToJson(tmp[i])
        tmp[i].ext = tmp[i].type
          .match(/^video\/\w+(?=;)/g)[0]
          .replace(/^video\//, "")
      }

      video_metadata["videos"] = tmp
  }
  video_metadata["title"] = JSON.parse(get_video_info["player_response"]).videoDetails.title.replace(/\+/g, " ")
  video_metadata["video_details"] = JSON.parse(get_video_info["player_response"]).videoDetails
  const publishRegex = XRegExp(`(?<="publishDate":")([0-9]{4}-[0-9]{2}-[0-9]{2})`)
  const publishMatch = XRegExp.exec(get_video_info["player_response"], publishRegex)
  if (publishMatch) {
    video_metadata["video_details"]["publishDate"] = publishMatch[0]
  }
  return video_metadata as VideoMetadata

}

export const getVideoId = (url: string): string => {
  const rx = /(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9-_]{1,})/g
  const arr = rx.exec(url)
  return arr == null || arr.length < 3 ? "" : arr[2]
}