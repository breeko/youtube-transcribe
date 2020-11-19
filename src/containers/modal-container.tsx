

import React from "react"
import { createContainer } from "unstated-next"
import LoginModal from "../modals/login/LoginModal"
import SpeakerMappingsModal from "../modals/speaker-mappings"

interface SigninProps {
  key: "signin"
  onSuccess: () => void
}

interface EditMappingsProps {
  key: "edit-mappings"
  speakers: string[]
  onSuccess: (mapping: Object) => void
}


type ModalProps = SigninProps | EditMappingsProps

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
            action="signin"
          />
          break
        case "edit-mappings":
          m = <SpeakerMappingsModal
            onCancel={() => setModalProps(undefined)}
            onSuccess={modalProps.onSuccess}
            speakers={modalProps.speakers}
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
