import React from "react";
import App from "next/app";

import "../styles/antd.less";
import "../styles/custom-styles.less";


class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default MyApp;
