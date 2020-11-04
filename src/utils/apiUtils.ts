export const getVideoId = (url: string): string => {
  const rx = /(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9-_]{1,})/g
  const arr = rx.exec(url)
  return arr == null || arr.length < 3 ? "" : arr[2]
}
