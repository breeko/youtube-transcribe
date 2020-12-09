import { Button, Card, message, Popconfirm, Skeleton, Space, Spin, Table, Typography } from "antd"
import { ColumnsType } from "antd/lib/table"
import React from "react"
import { FiMic, FiTrash } from "react-icons/fi"
import { StagingJob } from "../../../types/types"
import ModalContainer from "../../containers/modal-container"
import { deleteStaging } from "../../utils/lambdaUtils"
import { getColumnSearchProps } from "../../utils/tableUtils"
import { parseSeconds } from "../../utils/timeUtils"


const { Paragraph, Text, Title } = Typography

interface StagingProps {
  metas: StagingJob[]
  onUpdate: () => void
  id?: string
}


const Staging: React.FunctionComponent<StagingProps> = ({ id, metas, onUpdate }) => {
  const [filteredJobs, setFilteredJobs] = React.useState<StagingJob[]>()

  const modalContainer = ModalContainer.useContainer()

  React.useEffect(() => {
    setFilteredJobs(metas)
  }, [metas])

  
  const handleSearch = (search: string | undefined) => {
    setFilteredJobs(metas.filter(m => m.name.toLowerCase().includes(search)))
  }

  const handleDelete = (record: StagingJob) => {
    if (record.status !== "started") {
      deleteStaging({id: record.id})
        .then(() => {message.success("Successfully deleted"); onUpdate()})
        .catch(e => message.error(e))
    }
  }

  const handleTranscribe = (record: StagingJob) => {
    modalContainer.setModalProps({
      key: "transcribe",
      id: record.id,
      title: record.name,
      duration: record.duration,
      onSuccess: () => { message.success("Job created"); onUpdate(); modalContainer.setModalProps(undefined) }})
  }

  const columns: ColumnsType<StagingJob> = [
    {key: "actions", title: "Actions", render: (v, record) =>
      <Spin spinning={record.status === "started"} key={record.id}>
        <Space direction="horizontal">
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDelete(record)}
            disabled={record.status === "started"}
            okType="danger"
            okText="Delete"
          >
            <Button disabled={record.status === "started"} icon={<FiTrash/>} />
          </Popconfirm>
          <Button disabled={record.status !== "completed"} icon={<FiMic/>} onClick={() => handleTranscribe(record)}/>
        </Space>
      </Spin>
    },
    {key: "audio", title: "Audio", defaultSortOrder: "descend", ...getColumnSearchProps('audio', handleSearch),
    sorter: (v1, v2) => v1.uploaded.diff(v2.uploaded), render: (v, record) =>
      <div key={record.id}>
        <Text style={{fontSize: "large"}}>{record.name}</Text><br/>
        <Text type="secondary"><strong>Uploaded</strong>: {record.uploaded?.format("LLLL") || "NA"}</Text><br/>
        <Text type="secondary"><strong>Duration</strong>: {parseSeconds(record.duration) || "NA"}</Text><br/>
        { record.error && <Text type="danger"><strong>Error</strong>: Error processing file</Text> }
      </div>
    }
  ]

  return(
    <Card id={id}>
      {filteredJobs === undefined ?
        <Skeleton loading/> :
        <Table dataSource={filteredJobs} columns={columns} />
      }
    </Card>
  )
}

export default Staging
