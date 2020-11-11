import React, { useEffect, useState } from 'react'
import { uploadImage } from '../../../../utils/imageUtils'
import ImageCropper from './ImageCropper'

interface ImageUploadProps {
  onComplete: (url: string) => void
}

const ImageUpload: React.FunctionComponent<ImageUploadProps> = ({ onComplete }) => {
  const [blob, setBlob] = useState<Blob>()
  const [inputImg, setInputImg] = useState('')
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    if (complete) {
      blob && uploadImage(blob).then(out => onComplete(out.data.display_url))
    }
  }, [complete])

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // convert image file to base64 string
    const file = event.target.files?.[0]
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      if (typeof reader.result === "string") {
        setInputImg(reader.result)
        setComplete(false)
      }
    }, false)

    if (file) {
      reader.readAsDataURL(file)
    }
  }
  
  return (
    <React.Fragment>
        <input
          type='file'
          accept='image/*'
          onChange={onInputChange}
        />
        {
          inputImg && !complete && (
            <ImageCropper
              setBlob={setBlob}
              inputImg={inputImg}
              onComplete={() => setComplete(true)}
            />
          )
        }
      </React.Fragment>
  )
}

export default ImageUpload
