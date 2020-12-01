import { Button, Collapse, Divider, Form, message, Space, Typography } from "antd"
import locale from "antd/lib/date-picker/locale/en_US"
import { useRouter } from "next/router"
import React from "react"
import { FiPlusCircle } from "react-icons/fi"
import { UploadedMetadata, UserInfo, TranscribeJob } from "../../../types/types"
import ModalContainer from "../../containers/modal-container"
import { getCognitoUser, getMetadatas, getStripeCheckoutSesssion, getTranscribeJobs } from "../../utils/lambdaUtils"
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
  const [metas, setMetas] = React.useState<UploadedMetadata[]>()

  const modalContainer = ModalContainer.useContainer()

  const router = useRouter()

  const fetchUserInfo = () =>
    getCognitoUser({onSuccess: (u) => setUserInfo(u), onError: (e) => message.error(e)})

  const fetchMetadata = () => {
    getMetadatas({ onError: e => message.error(e), onSuccess: r => setMetas(r)} )
  }

  const fetchJobs = () => {
    getTranscribeJobs({ onError: e => message.error(e), onSuccess: j => {
      const incomplete = j.findIndex(j => j.completed === false) !== -1
      if (incomplete) {
        setTimeout(() => fetchJobs(), 5000)
      }
      setJobs(j)
    }})
  }

  const fetchAll = () => {
    fetchUserInfo()
    fetchMetadata()
    fetchJobs()
  }

  React.useEffect(() => {
    const sessionId = router.asPath.match(/\?sessionId=([^&]+)/)?.[1]
    if (sessionId !== undefined) {
      window.history.replaceState(null, document.title, "/account")
      getStripeCheckoutSesssion({
        sessionId,
        onSuccess: () => { message.success("Credit applied"); fetchUserInfo(); },
        onError: (e) => message.error(e)
      })
    }
    fetchAll()
  }, [])

  return(
    <div className="page-container">
      {modalContainer.modal}
      <AccountToolbar userInfo={userInfo} />
      <Collapse defaultActiveKey={["staging", "transcripts"]}>
        <Collapse.Panel key="staging" header={<Title level={5}>Audio</Title>}>
            <Button
              icon={<FiPlusCircle/>}
              type="primary"
              onClick={() => modalContainer.setModalProps({key: "upload", onSuccess: () => fetchMetadata()})}
            >
              &nbsp;Upload Audio
            </Button>
            <Divider/>
            <Staging metas={metas} onUpdate={() => fetchAll()}/>
        </Collapse.Panel>
        <Collapse.Panel key="transcripts" header={<Title level={5}>Transcripts</Title>}>
          <Transcripts jobs={jobs} />
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}

export default AccountPageInner
