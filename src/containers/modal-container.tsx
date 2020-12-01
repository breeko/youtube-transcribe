

import React from "react"
import { createContainer } from "unstated-next"
import CheckoutModal from "../modals/checkout"
import LoginModal from "../modals/login/LoginModal"
import SpeakerMappingsModal from "../modals/speaker-mappings"
import TranscribeModal from "../modals/transcribe"
import UploadModal from "../modals/upload"

interface SigninProps {
  key: "signin"
  action: "signin" | "signup"
  onSuccess: () => void
}

interface EditMappingsProps {
  key: "edit-mappings"
  speakers: string[]
  onSuccess: (mapping: Object) => void
}


interface TranscribeProps {
  key: "transcribe"
  title: string
  videoId: string
  onSuccess: () => void
}

interface UploadProps {
  key: "upload"
  onSuccess: () => void
}

interface CheckoutProps {
  key: "checkout"
  onSuccess: () => void
}

type ModalProps = SigninProps | EditMappingsProps | TranscribeProps | UploadProps | CheckoutProps

const useModalContainer = () => {
  const [modalProps, setModalProps] = React.useState<ModalProps | undefined>(undefined)
  const [modal, setModal] = React.useState<JSX.Element>(null)

  React.useEffect(() => {
    if (modalProps === undefined) {
      setModal(null)
    } else {
      let m: JSX.Element = null
      switch(modalProps.key) {
        case "signin":
          m = <LoginModal
            onOk={() => setModalProps(undefined)}
            onSuccess={modalProps.onSuccess}
            action={modalProps.action}
          />
          break
        case "edit-mappings":
          m = <SpeakerMappingsModal
            onCancel={() => setModalProps(undefined)}
            onSuccess={modalProps.onSuccess}
            speakers={modalProps.speakers}
          />
          break
        case "transcribe":
          m = <TranscribeModal
            title={modalProps.title}
            videoId={modalProps.videoId}
            onSuccess={modalProps.onSuccess}
            onCancel={() => setModalProps(undefined)}
          />
          break
        case "upload":
          m = <UploadModal
            onSuccess={modalProps.onSuccess}
            onCancel={() => setModalProps(undefined)}
          />
          break
        case "checkout":
          m = <CheckoutModal
            onSuccess={modalProps.onSuccess}
            onCancel={() => setModalProps(undefined)}
          />
          break
        default:
          break
      }
      setModal(m)
    }
  }, [modalProps])

  return {
    setModalProps,
    modal
  }
}

const ModalContainer = createContainer(useModalContainer)

export default ModalContainer
