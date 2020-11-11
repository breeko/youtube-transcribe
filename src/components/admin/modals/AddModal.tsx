import { Divider, Select } from "antd"
import Modal from "antd/lib/modal/Modal"
import React, { useState } from "react"
import AddMediaForm from "./forms/AddMediaForm"
import AddVideoForm from "./forms/AddVideoForm"

const { Option } = Select

export interface EditProps {id: string, type: AddType}

interface AddModalProps {
  onClose: () => void
  edit?: EditProps
}

export type AddType = "media" | "video"

const AddModal: React.FunctionComponent<AddModalProps> = ({ onClose, edit }) => {
  const [addType, setAddType] = useState<AddType | undefined>(edit?.type || "media")
  let formElem: JSX.Element = <div></div>
  switch (addType) {
    case "media":
      formElem = <AddMediaForm onComplete={onClose} id={edit?.id}/>
      break
    case "video":
      formElem = <AddVideoForm onComplete={onClose} id={edit?.id}/>
      break
  }

  return(
    <Modal visible={true} onCancel={onClose} title={edit ? "Edit" : "Add"} footer={null} keyboard={false}>
      { edit === undefined &&
        <React.Fragment>
          <Select value={addType} onChange={setAddType} style={{width: "100%"}} >
            <Option value="media">Media</Option>
            <Option value="video">Video</Option>
          </Select>
        <Divider />
      </React.Fragment>}
      {formElem}
    </Modal>
  )
}

export default AddModal
