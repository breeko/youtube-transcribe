import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { DraggerProps } from "antd/lib/upload";
import { RcCustomRequestOptions } from "antd/lib/upload/interface";
import React from "react";
import { MessageType } from "../../../../types/types";
import { getUploadLink, UploadLink } from "../../../utils/lambdaUtils";

const { Dragger } = Upload



interface UploadDraggerProps {
  onSuccess: () => void
  updateMessage: (type: MessageType, message: string) => void
}

const UploadDragger: React.FunctionComponent<UploadDraggerProps> = ({ onSuccess, updateMessage }) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const customRequest = async (options: RcCustomRequestOptions) => {
    const req: UploadLink = await getUploadLink({
      filename: options.file.name
    })
    if (req === undefined) {
      setIsLoading(false)
      return Promise.resolve()
    }
    const form = new FormData()
    Object.entries(req.fields).forEach(([key, val]) => form.append(key, val))
    form.append('file', options.file)
  
    // Send the POST request
    fetch(req.url, { method: 'POST', body: form })
      .then(res => {
        if (res.ok) {
          return options.onSuccess(res, options.file)
        } else {
          return options.onError(Error("Something went wrong"), res)}
        })
      .catch(e => updateMessage("error", e))
      .finally(() => setIsLoading(false))
  }

  const props = {
    name: 'files',
    multiple: false,
    customRequest,
    onChange(info) {
      const { status } = info.file;
      if (status === 'uploading') {
        setIsLoading(true)
        updateMessage("info", "Uploading...")
      } else if (status === 'done') {
        // handleProcess(req.fields.key.split("/").slice(-1)[0], info.file.name)
        updateMessage("success", "Finished uploading")
        setIsLoading(false)
      } else if (status === 'error') {
        updateMessage("error", `Failed uploading`)
      }
    },
  }

  // React.useEffect(() => {
  //   fetchUploadLink({
  //     onSuccess: u => {
  //       setDraggerProps(createDraggerProps(u))
  //       setIsLoading(false)
  //     },
  //     onError: e => {
  //       updateMessage("error", "Unable to initalize upload")
  //     }
  //   })
  // }, [])

  return (
    <Dragger
      {...props}
      headers={{'x-amz-acl': 'public-read' }}
      disabled={isLoading}
      className={isLoading ? "disabled" : undefined}
      accept="audio/*,video/*"
    >
      <p className="ant-upload-drag-icon"><InboxOutlined /></p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">Depending on the size, upload may take a few minutes</p>
      <p className="ant-upload-hint">Most video and audio types supported (eg. mp3, mp4, avi, etc.)</p>
      <br/>
      <p className="ant-upload-hint">Size limit of 250 MBs</p>
    </Dragger>
  )
}

export default UploadDragger
