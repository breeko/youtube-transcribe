import { Button, Card, message, Popconfirm, Skeleton, Space, Table, Typography } from "antd"
import { ColumnsType } from "antd/lib/table"
import React from "react"
import { FiMic, FiTrash } from "react-icons/fi"
import { UploadedMetadata } from "../../../types/types"
import ModalContainer from "../../containers/modal-container"
import { deleteStagingAudio } from "../../utils/lambdaUtils"
import { getColumnSearchProps } from "../../utils/tableUtils"
import { parseSeconds } from "../../utils/timeUtils"


const { Paragraph, Text, Title } = Typography

interface StagingProps {
  metas: UploadedMetadata[]
  onUpdate: () => void
}


const Staging: React.FunctionComponent<StagingProps> = ({ metas, onUpdate }) => {
  const [filteredMetas, setFilteredMetas] = React.useState<UploadedMetadata[]>()

  const modalContainer = ModalContainer.useContainer()

  React.useEffect(() => {
    setFilteredMetas(metas)
  }, [metas])

  
  const handleSearch = (search: string | undefined) => {
    setFilteredMetas(metas.filter(m => m.name.toLowerCase().includes(search)))
  }

  const handleDelete = (videoId: string) => {
    deleteStagingAudio({ videoId, onSuccess: () => {
      message.success("Successfully deleted")
      onUpdate()
    }, onError: (e) => message.error(e) })
  }

  const handleTranscribe = (record: UploadedMetadata) => {
    modalContainer.setModalProps({
      key: "transcribe",
      videoId: record.videoId,
      title: record.name,
      onSuccess: () => { message.success("Job created"); onUpdate(); modalContainer.setModalProps(undefined) }})
  }

  const columns: ColumnsType<UploadedMetadata> = [
    {key: "actions", title: "Actions", render: (v, record) =>
      <Space direction="horizontal" key={record.videoId}>
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => handleDelete(record.videoId)}
          okType="danger"
          okText="Delete"
        >
          <Button icon={<FiTrash/>} />
        </Popconfirm>
        <Button icon={<FiMic/>} onClick={() => handleTranscribe(record)}/>
      </Space>
    },
    {key: "audio", title: "Audio", defaultSortOrder: "descend", ...getColumnSearchProps('audio', handleSearch),
    sorter: (v1, v2) => v1.uploaded.diff(v2.uploaded), render: (v, record) =>
      <div key={record.videoId}>
        <Text style={{fontSize: "large"}}>{record.name}</Text><br/>
        <Text type="secondary"><strong>Uploaded</strong>: {record.uploaded?.format("LLLL") || "NA"}</Text><br/>
        <Text type="secondary"><strong>Duration</strong>: {parseSeconds(record.seconds) || "NA"}</Text>
      </div>
    }
  ]

  return(
    <Card>
      {filteredMetas === undefined ?
        <Skeleton /> :
        <Table dataSource={filteredMetas} columns={columns} />
      }
    </Card>
  )
}

export default Staging
