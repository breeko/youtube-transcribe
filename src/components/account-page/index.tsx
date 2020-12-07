import { withAuthenticator } from "@aws-amplify/ui-react"
import { Button, Collapse, Divider, message, Typography } from "antd"
import { useRouter } from "next/router"
import React from "react"
import { FiPlusCircle } from "react-icons/fi"
import { StagingJob, TranscribeJob, UserInfo } from "../../../types/types"
import ModalContainer from "../../containers/modal-container"
import { getStripeCheckoutSesssion, getUser, listStaging, listTranscribe } from "../../utils/lambdaUtils"
import AccountToolbar from "./account-toolbar"
import Staging from "./staging"
import Transcripts from "./transcripts"

interface AccountPageInnerProps {

}

interface FormProps {
  url: string
}

const { Title } = Typography

const AccountPageInner: React.FunctionComponent<AccountPageInnerProps> = () => {
  const [userInfo, setUserInfo] = React.useState<UserInfo>()
  const [jobs, setJobs] = React.useState<TranscribeJob[]>()
  const [metas, setMetas] = React.useState<StagingJob[]>()

  const modalContainer = ModalContainer.useContainer()

  const router = useRouter()

  const fetchUserInfo = () =>
    getUser().then(u => setUserInfo(u)).catch((e) => message.error(e))

  const fetchMetadata = () => {
    listStaging()
      .then(m => {
        if (m.findIndex(m => m.status === "started") !== -1) {
          setTimeout(() => fetchMetadata(), 5000)
        }
        setMetas(m)
      })
      .catch(e => message.error("Error loading videos"))
  }

  const fetchJobs = () => {
    listTranscribe()
      .then(j => {
        const incomplete = j.findIndex(j => j.completed === false) !== -1
        if (incomplete) {
          setTimeout(() => fetchJobs(), 5000)
        }
        setJobs(j)
      }).catch(e => message.error(e))
  }

  const fetchAll = () => {
    fetchUserInfo()
    fetchMetadata()
    fetchJobs()
  }

  React.useEffect(() => {
    fetchAll()
  }, [])

  return(
    <div className="page-container">
      <AccountToolbar userInfo={userInfo} />
      <Collapse defaultActiveKey={["staging", "transcripts"]}>
        <Collapse.Panel key="staging" header={<Title level={5}>Audio</Title>}>
            <Button
              icon={<FiPlusCircle/>}
              type="primary"
              onClick={() => modalContainer.setModalProps({key: "upload", onCancel: () => fetchMetadata(), onSuccess: () => fetchMetadata()})}
            >
              &nbsp;Upload Audio
            </Button>
            <Divider/>
            <Staging metas={metas} onUpdate={() => fetchAll()}/>
        </Collapse.Panel>
        <Collapse.Panel key="transcripts" header={<Title level={5}>Transcripts</Title>}>
          <Transcripts jobs={jobs} onUpdate={() => fetchJobs()}/>
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}

export default withAuthenticator(AccountPageInner)
