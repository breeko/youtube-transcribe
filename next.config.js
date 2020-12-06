const withSass = require("@zeit/next-sass")
const withLess = require("@zeit/next-less")
const withCSS = require("@zeit/next-css")

const isProd = process.env.NODE_ENV === "production"

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {}
}

module.exports = withCSS({
  cssModules: true,
  
  images: {
    domains: ['i.ibb.co'],
  },
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  ...withLess(
    withSass({
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
      webpack: (config, { isServer }) => {
        if (!isServer) {
          config.node = {
            fs: "empty",
            net: "empty",
            tls: "empty",
            child_process: "empty",
          }
        }
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
          {
            test: /\.html$/i,
            loader: 'html-loader',
          }
        )
        
        return config
      },
    })
  ),
})
