import { Button } from 'antd'
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import { Area } from 'react-easy-crop/types'
import { getCroppedImg } from './cropImage'


interface ImageCropperProps {
  setBlob: (blob: Blob) => void
  inputImg: string
  onComplete: () => void
}

const ImageCropper:React.FunctionComponent<ImageCropperProps> = ({ setBlob, inputImg, onComplete }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    /* onCropComplete() will occur each time the user modifies the cropped area, 
    which isn't ideal. A better implementation would be getting the blob 
    only when the user hits the submit button, but this works for now  */
    const onCropComplete = async (_croppedArea: Area, croppedAreaPixels: Area) => {
        const croppedImage = await getCroppedImg(
          inputImg,
          croppedAreaPixels
        )
        setBlob(croppedImage)
    }

    return (
      <div style={{position: "relative", height: "250px"}}>
        <Cropper
          image={inputImg}
          crop={crop}
          zoom={zoom}
          aspect={1.67}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <Button onClick={onComplete}>Done</Button>
      </div>
    )
}

export default ImageCropper
