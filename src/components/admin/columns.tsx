import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { MEDIA_TYPE, VIDEO_TYPE } from "../../API";
import { Media, VideoFull } from "../../types/graphql";


export const buildVideoColumns = (videos: VideoFull[], onEdit: (id: string) => void) => {
  const columns: ColumnsType<VideoFull> = [
    {
      title: "Action",
      key: "action",
      render: (_a, item) => <Button icon={<FiEdit />} onClick={() => onEdit(item.id)}/>
    },
    {
      title: "Video Type",
      dataIndex: "type",
      key: "videoType",
      sorter: (a, b) => a.type.localeCompare(b.type),
      onFilter: (value, record) => record.type === value,
      filters: [{text: "Review", value: VIDEO_TYPE.REVIEW}, {text: "Interview", value: VIDEO_TYPE.INTERVIEW}]
    },
    {
      title: "Media Type",
      key: "mediaType",
      render: (_v, r) => r.media?.type,
      sorter: (a, b) => a?.media?.type.localeCompare(b.media?.type || "") || 0,
      onFilter: (value, record) => record.media?.type === value,
      filters: [{text: "Movie", value: MEDIA_TYPE.MOVIE}, {text: "TV", value: MEDIA_TYPE.TV}, {text: "Other", value: MEDIA_TYPE.OTHER}]
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      onFilter: (value, record) => record.name === value,
      filters: videos.map(v => ({value: v.name, text: v.name}))
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "Media",
      dataIndex: "media",
      key: "media",
      render: (_v, r) => r.media?.name,
      sorter: (a, b) => a?.media?.name.localeCompare(b.media?.name || "") || 0,
      onFilter: (value, record) => record.media?.name === value,
      filters: videos.map(v => ({value: v.media.name, text: v.media.name}))
    },
    {
      title: "Season",
      dataIndex: "season",
      key: "season",
    },
    {
      title: "Episode",
      dataIndex: "episode",
      key: "episode",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Length (seconds)",
      dataIndex: "lengthSeconds",
      key: "lengthSeconds",
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      sorter: (a, b) => a.published.localeCompare(b.published),
    },
  ]
  return columns
}

export const buildMediaColumns = (media: Media[], onEdit: (id: string) => void) => {
  const tvSeriesColumns: ColumnsType<Media> = [
    {
      title: "Action",
      key: "action",
      render: (_a, item) =>
        <Button icon={<FiEdit/>} onClick={() => onEdit(item.id)}/>
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.name.localeCompare(b.name),
      onFilter: (value, record) => record.type === value,
      filters: [{text: "TV", value: MEDIA_TYPE.TV}, {text: "Movie", value: MEDIA_TYPE.MOVIE}, {text: "Other", value: MEDIA_TYPE.OTHER}]
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      onFilter: (value, record) => record.name === value,
      filters: media.map(m => ({value: m.name, text: m.name}))
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
  ]
  return tvSeriesColumns
}
