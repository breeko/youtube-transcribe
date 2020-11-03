import Document, { Html, Title, Head, Main, NextScript } from 'next/document';
import {MY_SEO} from "../config"
// import liteYt from "../node_modules/lite-youtube-embed/src/lite-yt-embed.js"

export default class MyDocument extends Document {
  

  render() {
    return (
      <Html>
        <Head title="Youtube Transcribe">
          <meta
            key="description"
            name="description"
            content={MY_SEO.description}
          />
          <meta
            key="og:type"
            name="og:type"
            content={MY_SEO.openGraph.type}
          />
          <meta
            key="og:title"
            name="og:title"
            content={MY_SEO.openGraph.title}
          />
          <meta
            key="og:description"
            name="og:description"
            content={MY_SEO.openGraph.description}
          />
          <meta
            key="og:url"
            name="og:url"
            content={MY_SEO.openGraph.url}
          />
          <meta
            key="og:image"
            name="og:image"
            content={MY_SEO.openGraph.image}
          />
          <link rel="stylesheet" href="./lite-yt-embed.css" />
          <script src="/lite-yt-embed.js"></script>
          </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
