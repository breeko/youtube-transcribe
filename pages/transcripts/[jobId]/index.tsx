import { withAuthenticator } from "@aws-amplify/ui-react"
import { message, Spin } from "antd"
import axios from "axios"
import { useRouter } from "next/router"
import React from "react"
import AppLayout from "../../../src/AppLayout"
import VideoPageInner from "../../../src/components/video-page"
import { downloadFromS3 } from "../../../src/utils/apiUtils"
import { getJob, updateTranscript } from "../../../src/utils/lambdaUtils"

const TranscriptPage: React.FunctionComponent = () => {
  const [jobId, setJobId] = React.useState<string>()
  const [isLoading, setIsLoading] = React.useState(true)
  const [innerRaw, setInnerRaw] = React.useState<string>()
  const [transcriptPath, setTranscriptPath] = React.useState<string>()
  const [audioPath, setAudioPath] = React.useState<string>()


  const router = useRouter()

  React.useEffect(() => {
    const paths = window.location.pathname.split('/')
    const jobId = paths.length > 0 ? paths[paths.length - 1] : undefined
    if (jobId === undefined) {
      router.push("/404")
    } else {
      setJobId(jobId)
      getJob({
        jobId,
        onSuccess: (args: {audioPath: string, transcriptPath: string, updatePath: {url: string, fields: any}}) => {
          setTranscriptPath(args.transcriptPath)
          setAudioPath(args.audioPath)
        },
        onError: e => router.push("/404")
        }).finally(() => setIsLoading(false))  
    }
  }, [])


  React.useEffect(() => {

    if (transcriptPath) {
      fetch(transcriptPath).then(r => r.text().then(setInnerRaw))
    }
  }, [transcriptPath])

  const onSave = React.useCallback((content: string) => {
    updateTranscript({jobId, content, onSuccess: () => message.success("Saved"), onError: () => message.error("Save failed")})
  }, [jobId])

  return(
    <Spin spinning={isLoading}>
      <AppLayout hideFooter={true} hideHeader={true}>
          {!isLoading && innerRaw &&
            <VideoPageInner
              name={""}
              audioPath={audioPath}
              innerRaw={innerRaw}
              start={undefined}
              onSave={onSave}
            />
          }
      </AppLayout>
  </Spin>
  )
}

export default withAuthenticator(TranscriptPage)
