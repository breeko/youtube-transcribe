import { Button, Card, message, Popover, Skeleton, Space, Spin, Table, Typography } from "antd"
import { ColumnsType } from "antd/lib/table"
import { useRouter } from "next/router"
import React from "react"
import { FiDownload, FiEye } from "react-icons/fi"
import { TranscribeJob } from "../../../types/types"
import { getJob } from "../../utils/lambdaUtils"
import { getColumnSearchProps } from "../../utils/tableUtils"
import { parseSeconds } from "../../utils/timeUtils"

const { Text } = Typography

interface TranscriptsProps {
  jobs: TranscribeJob[]
}

const Transcripts: React.FunctionComponent<TranscriptsProps> = ({ jobs }) => {
  const router = useRouter()
  
  const [filteredJobs, setFilteredJobs] = React.useState<TranscribeJob[]>()

  React.useEffect(() => {
    setFilteredJobs(jobs)
  }, [jobs])

  const handleSelect = (id: string) => {
    router.push(`/transcripts/${id}`)
  }

  const handleSearch = (search: string | undefined) => {
      setFilteredJobs(jobs.filter(j => j.name.toLowerCase().includes(search)))
  }

  const handleDownload = (job: TranscribeJob, type: "text" | "html") => {
    const downloadInnerHtml = (filename: string, content: string, type: "text" | "html") => {
        const link = document.createElement('a')
        const mimeType = type === "text" ? 'text/plain' : "text/html"
        const txt = type === "text" ? content.replace(/(<([^>]+)>)/g, "").replace(/\n{2,}/g,'\n') : content
        link.setAttribute('download', filename)
        link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(txt))
        link.click()
    }
    getJob({jobId: job.id,
      onSuccess: ({transcriptPath}) => fetch(transcriptPath)
        .then(content => content.text()
        .then(content => downloadInnerHtml(`${job.name}.txt`, content , type))),
      onError: () => message.error("Download failed")
    })
  }

  const columns: ColumnsType<TranscribeJob> = [
    {key: "actions", title: "Actions", render: (v, record) =>
      <Spin spinning={!record.completed} key={record.id}>
        <Space direction="horizontal">
          <Button icon={<FiEye/>} onClick={() => handleSelect(record.id)}/>
          <Popover
            trigger="click"
            title="Download"
            content={
              <Space direction="vertical">
                <a onClick={() => handleDownload(record, "text")}>Text</a>
                <a onClick={() => handleDownload(record, "html")}>HTML</a>
              </Space>
            }
          >
          <Button icon={<FiDownload/>}/>
          </Popover>
        </Space>
      </Spin>
    },
    {key: "transcript", dataIndex: "id", title: "Transcript", defaultSortOrder: "descend", ...getColumnSearchProps('transcript', handleSearch),
    sorter: (v1, v2) => v1.created.diff(v2.created), render: (v, record) =>
      <div key={record.id}>
        <Text style={{fontSize: "large"}}>{record.name}</Text><br/>
        <Text type="secondary"><strong>Uploaded</strong>: {record.created?.format("LLLL") || "NA"}</Text><br/>
        <Text type="secondary"><strong>Duration</strong>: {parseSeconds(record.duration) || "NA"}</Text>
      </div>
    }
  ]

  return(
    <Card>
      {jobs === undefined ?
        <Skeleton/> :
        <Table dataSource={filteredJobs} columns={columns}/>
      }
    </Card>
  )
}

export default Transcripts
