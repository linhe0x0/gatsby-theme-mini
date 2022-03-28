process.env.SUPPRESS_NO_CONFIG_WARNING = true

const config = require('config')
const path = require('path')
const _ = require('lodash')

const defaultSiteMetadata = config.util.loadFileConfigs(
  path.resolve(__dirname, 'config')
)
const userSiteMetadata = config.util.loadFileConfigs()

const siteMetadata = _.defaults(userSiteMetadata, defaultSiteMetadata)

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-dark-mode',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'post',
        path: `posts/`,
        ignore: [`!(md)`],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#366df0',
      },
    },
  ],
}
