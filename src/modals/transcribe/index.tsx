import { Modal, message, Spin, Divider } from "antd"
import Title from "antd/lib/typography/Title"
import React from "react"
import Player from "../../components/video-page/player"
import PlayerContainer from "../../containers/player-container"
import { getCognitoUser, getStagingAudio } from "../../utils/lambdaUtils"
import TranscribeForm from "./transcribe-form"

interface TranscribeModalProps {
  title: string
  videoId: string
  onSuccess: () => void
  onCancel: () => void
}

const TranscribeModal: React.FunctionComponent<TranscribeModalProps> = ({ title, videoId, onSuccess, onCancel }) => {
  const [audioPath, setAudioPath] = React.useState<string>()
  const [credits, setCredits] = React.useState(0)

  React.useEffect(() => {
    getStagingAudio({ videoId, onSuccess: (p) => setAudioPath(p), onError: (e) => message.error(e)})
    getCognitoUser({onSuccess: (u) => setCredits(u.credits), onError: (e) => message.error(e)})
  }, [])

  const playerContainer = PlayerContainer.useContainer()

  return(
    <Modal
      style={{top: "10px"}}
      title={`Transcribe ${title}`}
      width={650}
      visible={true}
      maskClosable={false}
      onOk={() => {
        // in order to stop audio
        playerContainer.reset()
        onSuccess()
      }}
      onCancel={() => {
        playerContainer.reset()
        onCancel()
      }}
      footer={null}
    >
      <Spin spinning={audioPath === undefined} className="wide">
        { audioPath && <Player audioPath={audioPath}/> }
        
        <Divider />
          <TranscribeForm
            videoId={videoId}
            duration={playerContainer.duration}
            credits={credits}
            onSuccess={() => onSuccess()}
            onCancel={() => onCancel()}
          />
      </Spin>
    </Modal>
  )
}

export default TranscribeModal
