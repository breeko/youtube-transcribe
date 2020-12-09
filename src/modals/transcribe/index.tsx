import { Modal, message, Spin, Divider } from "antd"
import Title from "antd/lib/typography/Title"
import React from "react"
import Player from "../../components/video-page/player"
import PlayerContainer from "../../containers/player-container"
import { getUser, getStagingAudio } from "../../utils/lambdaUtils"
import TranscribeForm from "./transcribe-form"

interface TranscribeModalProps {
  title: string
  id: string
  duration: number
  onSuccess: () => void
  onCancel: () => void
}

const TranscribeModal: React.FunctionComponent<TranscribeModalProps> = ({ title, id, duration, onSuccess, onCancel }) => {
  const [audioPath, setAudioPath] = React.useState<string>()
  const [credits, setCredits] = React.useState(0)

  React.useEffect(() => {
    getStagingAudio({ id }).then(p => setAudioPath(p)).catch(e => message.error(e))
    getUser().then(u => setCredits(u.credits)).catch(e => message.error(e))
  }, [])

  const handleOk = () => { playerContainer.reset(); onSuccess() }
  const handleCancel = () => { playerContainer.reset(); onCancel() }

  const playerContainer = PlayerContainer.useContainer()

  return(
    <Modal
      style={{top: "10px"}}
      title={`Transcribe ${title}`}
      width={650}
      visible={true}
      maskClosable={false}
      onCancel={handleCancel}
      onOk={handleOk}
      footer={null}
    >
      <Spin spinning={audioPath === undefined} className="wide">
        { audioPath && <Player audioPath={audioPath}/> }
        
        <Divider />
          <TranscribeForm
            videoId={id}
            duration={duration}
            credits={credits}
            onSuccess={handleOk}
            onCancel={handleCancel}
          />
      </Spin>
    </Modal>
  )
}

export default TranscribeModal
