import { Modal } from "antd"
import React from "react"
import UploadVideoForm from "../../components/account-page/upload-video-form"

interface UploadModalProps {
  onSuccess: () => void
  onCancel: () => void
}

const UploadModal: React.FunctionComponent<UploadModalProps> = ({onSuccess, onCancel}) => {
  return(
    <Modal forceRender visible={true} footer={null} onCancel={onCancel} title="Upload Audio">
      <UploadVideoForm onSuccess={() => {onSuccess(); onCancel()}} />
    </Modal>
  )
}

export default UploadModal
