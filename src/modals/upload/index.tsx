import { Alert, Divider, Modal } from "antd"
import React from "react"
import { MessageType } from "../../../types/types"
import UploadVideoForm from "../../components/account-page/upload-video-form"
import UploadDragger from "./dragger"

interface UploadModalProps {
  onSuccess: () => void
  onCancel: () => void
}

const UploadModal: React.FunctionComponent<UploadModalProps> = ({onSuccess, onCancel}) => {
  const [message, setMessage] = React.useState<{type: MessageType, message: string}>()

  return(
    <Modal forceRender visible={true} footer={null} onCancel={onCancel} title="Upload Audio">
      <UploadVideoForm onSuccess={() => { onSuccess()} } />
      <Divider>or</Divider>
      { message && <Alert type={message.type} message={message.message} /> }
      <br/>
      <UploadDragger onSuccess={onSuccess} updateMessage={(type, message) => setMessage({type, message})} />
    </Modal>
  )
}

export default UploadModal
