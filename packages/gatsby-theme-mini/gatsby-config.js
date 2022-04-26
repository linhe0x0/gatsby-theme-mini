const siteMetadata = require('./site-metadata')

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
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#2563eb',
      },
    },
  ],
}
