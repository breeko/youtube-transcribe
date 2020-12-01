import { Auth } from "aws-amplify"
import { Lambda, AWSError } from "aws-sdk"
import moment from "moment"
import { TranscribeJob, UploadedMetadata, UserInfo } from "../../types/types"

interface LambdaResponse {
  status: number
  body: any
  headers: object
}

const Urls = {
  getUser: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-getUser",
  uploadYoutube: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-uploadYoutube",
  getMetadatas: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-getMetadatas",
  getStagedAudio: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-getStagingAudio",
  deleteStagingAudio: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-deleteStagingAudio",
  getTranscribeJobs: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-transcribeInfo",
  transcribe: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-transcribe",
  stripeConfig: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-stripeConfig",
  stripeCreateCheckoutSession: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-stripeCreateCheckoutSession",
  stripeGetCheckoutSession: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-stripeGetCheckoutSession",
  getJob: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-getJob",
  updateTranscript: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-updateTranscript",
}

type ErrorHandler = {onError: (e: AWSError) => void}

export interface StripeConfig {
  publicKey: string
  unitAmount: number
  currency: string
}

export const fetchStripeConfig = ( args: {onSuccess:  (c: StripeConfig) => void } & ErrorHandler) => {
  callLambda(
    Urls.stripeConfig,
    {},
    (e, s) => e ? args.onError(e) : args.onSuccess(s)
  )
}

export const createStripeCheckoutSesssion = ( args: {quantity: number, onSuccess: (sessionId: string) => void } & ErrorHandler) => {
  callLambda(
    Urls.stripeCreateCheckoutSession,
    { quantity: args.quantity },
    (e, s) => e ? args.onError(e) : args.onSuccess(s.sessionId)
  )
}
export const getStripeCheckoutSesssion = ( args: {sessionId: string, onSuccess: (res: object) => void } & ErrorHandler) => {
  callLambda(
    Urls.stripeGetCheckoutSession,
    { sessionId: args.sessionId },
    (e, s) => e ? args.onError(e) : args.onSuccess(s.sessionId)
  )
}

export const updateTranscript = (args: {jobId: string, content: string, onSuccess: () => void} & ErrorHandler) =>
  callLambda(
    Urls.updateTranscript,
    args,
    (e, s) => e ? args.onError(e) : args.onSuccess()
  )

export const getJob = (args: {jobId: string, onSuccess: (args: {transcriptPath: string, audioPath: string}) => void} & ErrorHandler) =>
  callLambda(
    Urls.getJob,
    args,
    (e, s) => e ? args.onError(e) : args.onSuccess(s)
  )

export const transcribe = (args: {videoId: string, start: number, duration: number, settings: {MaxSpeakerLabels: number}, onSuccess: () => void} & ErrorHandler) =>
  callLambda(
    Urls.transcribe,
    args,
    (e, s) => e ? args.onError(e) : args.onSuccess()
  )

export const getTranscribeJobs = (args: {onSuccess: (u: TranscribeJob[]) => void} & ErrorHandler) =>
  callLambda(
    Urls.getTranscribeJobs,
    {},
    (e, s) => {
      if (e !== undefined){
        return args.onError(e)
      }
      const out = s.map(p => ({...p, created: moment(p.created * 1000)}))
      args.onSuccess(out as TranscribeJob[])
    }
  )

export const getCognitoUser = (args: {onSuccess: (u: UserInfo) => void} & ErrorHandler) =>
  callLambda(
    Urls.getUser,
    {},
    (e, s) => e ? args.onError(e) : args.onSuccess(s)
  )

export const getStagingAudio = (args: {videoId: string, onSuccess: (r: string) => void} & ErrorHandler) => {
  callLambda(
    Urls.getStagedAudio,
    { videoId: args.videoId },
    (e, s) => e ? args.onError(e): args.onSuccess((s as string).replaceAll('"', ''))
  )
}

export const uploadYoutube = (args: {videoId: string, onSuccess: (videoId: string) => void} & ErrorHandler) =>
  callLambda(
    Urls.uploadYoutube,
    { videoId: args.videoId },
    (e, s) => e ? args.onError(e) : args.onSuccess(s as string)
  )

export const deleteStagingAudio = (args: {videoId: string, onSuccess: () => void} & ErrorHandler) =>
  callLambda(
    Urls.deleteStagingAudio,
    { videoId: args.videoId },
    (e, s) => e ? args.onError(e) : args.onSuccess()
  )


export const getMetadatas = (args: {onSuccess: (r: UploadedMetadata[]) => void} & ErrorHandler) =>
  callLambda(
    Urls.getMetadatas,
    { },
    (e, r) => {
      if (e) {
        return args.onError(e)
      }
      const metas = r as any[]
      const parsedMetas: UploadedMetadata[] = []
      metas.forEach(m => {
        const parsed = {...m}
        parsed.seconds = Number.parseFloat(m?.seconds)
        parsed.uploaded = moment(Number.parseFloat(m?.uploaded) * 1000)
        parsedMetas.push(parsed)
      })
      args.onSuccess(parsedMetas)
    }
  )


const callLambda = async (
  functionName: string, data: object, callback: (e: AWSError, r: any) => void) => {
  const token = await Auth.currentSession().then(res=>{
    const accessToken = res.getAccessToken()
    const jwt = accessToken.getJwtToken()
    return jwt
  })
  Auth.currentCredentials()
    .then(credentials => {
      const lambda = new Lambda({
        credentials: Auth.essentialCredentials(credentials),
        region: "us-east-1"
      })
      return lambda.invoke({
        FunctionName: functionName,
        Payload: JSON.stringify({ ...data, token }),
      }, (_, r) => {
        const response = r && r.Payload ? JSON.parse(r.Payload as string) as LambdaResponse : undefined
        const err = response.status !== 200 ? response.body : undefined
        const res = response.status === 200 ? response.body : undefined
        callback(err, res)
      } )
    })
}
