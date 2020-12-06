import { Auth } from "aws-amplify"
import { AWSError, Lambda } from "aws-sdk"
import moment from "moment"
import { StagingJob, TranscribeJob, UserInfo } from "../../types/types"
import axios from "axios"

interface LambdaResponse {
  statusCode: number
  body: any
  headers: object
}

const RestUrls = {
  getPublicTranscript: "https://v2cdh250x5.execute-api.us-east-1.amazonaws.com/dev/transcript",
}

const Urls = {
  getUser: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-getUser",
  getStaging: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-getStaging",
  getStagingAudio: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-getStagingAudio",
  listStaging: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-listStaging",
  deleteStaging: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-deleteStaging",
  uploadYoutube: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-uploadYoutube",
  transcribe: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-transcribe",
  getTranscript: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-getTranscript",
  listTranscribe: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-listTranscribe",
  updateTranscript: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-updateTranscript",
  getUploadLink: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-getUploadLink",
  stripeConfig: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-stripeConfig",
  stripeCreateCheckoutSession: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-stripeCreateCheckoutSession",
  stripeGetCheckoutSession: "arn:aws:lambda:us-east-1:404289073511:function:youtube-dl-lambda-dev-stripeGetCheckoutSession",
}

type ErrorHandler = {onError: (e: AWSError) => void}

export interface StripeConfig {
  publicKey: string
  unitAmount: number
  currency: string
}

export interface UploadLink {
  url: string,
  fields: {
    [field: string]: string
  }
}


export const getUser = (): Promise<UserInfo> =>
  new Promise((resolve, reject) => callLambda(
    Urls.getUser,
    {},
    (e, s) => e ? reject(e) : resolve(s)
  ))

export const getUploadLink = async ( args: {filename: string }): Promise<UploadLink> => 
  new Promise((resolve, reject) => callLambda(
      Urls.getUploadLink,
      args,
      (e, s) => e ? reject(e) : resolve(s)
    ))


export const updateTranscript = (args: {jobId: string, content?: string, public?: boolean}): Promise<TranscribeJob> =>
  new Promise((resolve, reject) => callLambda(
    Urls.updateTranscript,
    args,
    (e, s) => e ? reject(e) : resolve()
  ))

export const getStaging = (args: {id: string}): Promise<StagingJob> =>
  new Promise((resolve, reject) => callLambda(
    Urls.getStaging,
    args,
    (e, s) => e ? reject(e) : resolve(s)
  ))

  export const listStaging = (): Promise<StagingJob[]> =>
  new Promise((resolve, reject) => callLambda(
    Urls.listStaging,
    {},
    (e, s) => {
      if (e) {
        return reject(e)
      }
      const out = s.map(n => ({...n, uploaded: moment(n.uploaded * 1000)}))
      resolve(out)
    }
  ))

export const transcribe = (args: {id: string, start: number, duration: number, language?: string, settings: { MaxSpeakerLabels: number }} ): Promise<void> =>
  new Promise((resolve, reject) => callLambda(
    Urls.transcribe,
    args,
    (e, s) => e ? reject(e) : resolve()
  ))

export const getTranscript = (args: {jobId: string} ): Promise<{audioPath: string, transcriptPath: string}> =>
  new Promise((resolve, reject) => callLambda(
    Urls.getTranscript,
    args,
    (e, s) => e ? reject(e) : resolve(s)
  ))

export const getPublicTranscript = (args: {jobId: string} ): Promise<{audioPath: string, transcriptPath: string}> =>
  axios.post(RestUrls.getPublicTranscript, JSON.stringify(args)).then(res => res.data)


export const listTranscribe = (): Promise<TranscribeJob[]> =>
  new Promise((resolve, reject) => callLambda(
    Urls.listTranscribe,
    {},
    (e, s) => {
      if (e !== undefined){
        return reject(e)
      }
      const out = s.map(p => ({...p, created: moment(p.created * 1000)}))
      resolve(out as TranscribeJob[])
    }
  ))

export const getStagingAudio = (args: {id: string}): Promise<string> =>
  new Promise((resolve, reject) => callLambda(
    Urls.getStagingAudio,
    args,
    (e, s) => e ? reject(e): resolve((s as string).replaceAll('"', ''))
  ))

export const uploadYoutube = (args: {videoId: string}): Promise<string> =>
  new Promise((resolve, reject) => callLambda(
    Urls.uploadYoutube,
    args,
    (e, s) => e ? reject(e) : resolve(s as string)
  ))

export const deleteStaging = (args: { id: string }): Promise<void> =>
  new Promise((resolve, reject) => callLambda(
    Urls.deleteStaging,
    args,
    (e, s) => e ? reject(e) : resolve()
  ))



  // stripe

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

const callLambda = async (
  functionName: string, data: object, callback: (e: AWSError, r: any) => void) => {
  const token = await Auth.currentSession().then(res=>{
    const accessToken = res.getAccessToken()
    const jwt = accessToken.getJwtToken()
    return jwt
  }).catch(() => undefined)

  Auth.currentCredentials()
    .then(credentials => {
      const lambda = new Lambda({
        credentials: Auth.essentialCredentials(credentials),
        region: "us-east-1"
      })
      return lambda.invoke({
        FunctionName: functionName,
        Payload: JSON.stringify({ ...data, token }),
      }, (a, r) => {
        const response = r && r.Payload ? JSON.parse(r.Payload as string) as LambdaResponse : undefined
        const err = response && response.statusCode !== 200 ? response.body : undefined
        const res = response && response.statusCode === 200 ? response.body : undefined
        callback(err, res)
      } )
    })
}
