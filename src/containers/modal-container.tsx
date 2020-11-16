

import React from "react"
import { createContainer } from "unstated-next"
import LoginModal from "../modals/login/LoginModal"

interface SigninProps {
  key: "signin"
  onSuccess: () => void
}

type ModalProps = SigninProps

const useModalContainer = () => {
  const [modalProps, setModalProps] = React.useState<ModalProps | undefined>(undefined)
  const [modal, setModal] = React.useState<JSX.Element>(null)

  React.useEffect(() => {
    if (modalProps === undefined) {
      setModal(null)
    } else {
      switch(modalProps.key) {
        case "signin":
          const m = <LoginModal
            onOk={() => setModalProps(undefined)}
            onSuccess={modalProps.onSuccess}
            action="signin"
          />
          setModal(m)
          break
        default:
          setModal(null)
          break
      }
    }
  }, [modalProps])

  return {
    setModalProps,
    modal
  }
}

const ModalContainer = createContainer(useModalContainer)

export default ModalContainer
