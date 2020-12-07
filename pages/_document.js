import Document, { Html, Title, Head, Main, NextScript } from 'next/document';
import {MY_SEO} from "../config"
// import liteYt from "../node_modules/lite-youtube-embed/src/lite-yt-embed.js"

export default class MyDocument extends Document {
  

  render() {
    return (
      <Html>
        <Head title="Deep Chats">
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
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/site.webmanifest"></link>

          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          {/* google ads */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-956441070"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-956441070');`,}}
          />
          {/* google analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-5PNQFXES5C"></script>
          <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', 'G-D4669286HK');
                  `
              }}
            />
          </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
