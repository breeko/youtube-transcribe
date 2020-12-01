import React from "react"
import { AppProps } from "next/app"

import "../styles/antd.less"
import "../styles/custom-styles.less"
import awsconfig from '../src/aws-exports'
import Amplify from "aws-amplify"
import Head from 'next/head'

const MyApp = ({ Component, pageProps }: AppProps) => {
  Amplify.configure({...awsconfig, ssr: true})

  return   <>
    <Head>
      <title>Deep Chats</title>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp;
