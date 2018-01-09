const config = require('config')

const siteMetadata = config.util.loadFileConfigs()

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'post',
        path: `${__dirname}/contents`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-highlights',
            options: {
                scopePrefix: 'syntax--',
                codeWrap: {
                  className: 'highlight'
                },
              },
          },
        ],
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#366df0',
      }
    }
  ]
}
