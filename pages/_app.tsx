import React from "react";
import { AppProps } from "next/app";

import "../styles/antd.less";
import "../styles/custom-styles.less";
import awsconfig from '../src/aws-exports';
import Amplify from "aws-amplify";

const MyApp = ({ Component, pageProps }: AppProps) => {
  Amplify.configure({...awsconfig})

  return <Component {...pageProps} />;
}

export default MyApp;
