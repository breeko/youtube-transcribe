import { withAuthenticator } from "@aws-amplify/ui-react"
import { Button, Collapse, Divider, message, Typography } from "antd"
import React from "react"
import { FiPlusCircle } from "react-icons/fi"
import { StagingJob, TranscribeJob, UserInfo } from "../../../types/types"
import ModalContainer from "../../containers/modal-container"
import { getUser, listStaging, listTranscribe } from "../../utils/lambdaUtils"
import AccountToolbar from "./account-toolbar"
import Staging from "./staging"
import Transcripts from "./transcripts"
import dynamic from "next/dynamic"
import Link from "next/link"

const Tour = dynamic( () => import('reactour'), { ssr: false } )


const { Title, Paragraph } = Typography
interface AccountPageInnerProps {

}


const AccountPageInner: React.FunctionComponent<AccountPageInnerProps> = () => {
  const [userInfo, setUserInfo] = React.useState<UserInfo>()
  const [jobs, setJobs] = React.useState<TranscribeJob[]>()
  const [metas, setMetas] = React.useState<StagingJob[]>()
  const [isTourOpen, setIsTourOpen] = React.useState(false)

  const steps = [
    {
      selector: '#upload-audio',
      content: <React.Fragment>
        <Paragraph ><strong>Upload audio or video here</strong></Paragraph>
        <Paragraph>You won't get charged and can always remove</Paragraph>
      </React.Fragment>,
    },
    {
      selector: '#staged-audio',
      content: <React.Fragment>
        <Paragraph><strong>Your uploaded audio shows up here</strong></Paragraph>
        <Paragraph>Select the audio you want to transcribe</Paragraph>
        <Paragraph>You can sample any 1 minute range for free</Paragraph>
      </React.Fragment>,
    },
    {
      selector: '#transcripts',
      content: <React.Fragment>
        <Paragraph><strong>Your transcripts show up here</strong></Paragraph>
        <Paragraph>View and export the transcript</Paragraph>
        <Paragraph>For examples of the output, click&nbsp;
          <Link href='/examples'><a target="_blank" rel="noreferrer">here</a></Link>
        </Paragraph>
      </React.Fragment>,
    },
    {
      selector: '#buy-credits',
      content: <React.Fragment>
        <Paragraph><strong>Buy credits</strong></Paragraph>
        <Paragraph>After you're happy with your sample and want to transcribe a longer portion, buy credits and follow the same procedure</Paragraph>
      </React.Fragment>,
    },
    {
      selector: '#mail',
      content: <React.Fragment>
        <Paragraph><strong>Contact us for help</strong></Paragraph>
        <Paragraph>Reach our via email to <a href="mailto:support@deep-chats.com">support@deep-chats.com</a></Paragraph>
      </React.Fragment>,
    },
  ]

  const modalContainer = ModalContainer.useContainer()

  const fetchUserInfo = () =>
    getUser()
      .then(u => {
        if (u.credits === 0) {
          setIsTourOpen(true)
        }
        setUserInfo(u)
      })
      .catch((e) => message.error(e))

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

  const handleUploadAudio = () => {
    modalContainer.setModalProps({key: "upload", onCancel: () => fetchMetadata(), onSuccess: () => fetchMetadata()})
  }

  React.useEffect(() => {
    fetchAll()
  }, [])

  return(
    <div className="page-container">
      <AccountToolbar userInfo={userInfo} startTour={() => { setIsTourOpen(true) }}/>
      <Collapse defaultActiveKey={["staging", "transcripts"]}>
        <Collapse.Panel key="staging" header={<Title level={5}>Audio</Title>}>
            <Button
              id="upload-audio"
              icon={<FiPlusCircle/>}
              type="primary"
              onClick={() => handleUploadAudio()}
            >
              &nbsp;Upload Audio
            </Button>
            <Divider/>
            <Staging metas={metas} onUpdate={() => fetchAll()} id="staged-audio"/>
        </Collapse.Panel>
        <Collapse.Panel key="transcripts" header={<Title level={5}>Transcripts</Title>}>
          <Transcripts jobs={jobs} onUpdate={() => fetchJobs()} id="transcripts" />
        </Collapse.Panel>
      </Collapse>
      <Tour
        closeWithMask={false}
        scrollDuration={500}
        disableInteraction
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
        lastStepNextButton={<Button>Get started</Button>}
      />
    </div>
  )
}

export default withAuthenticator(AccountPageInner)
