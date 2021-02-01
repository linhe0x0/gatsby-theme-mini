const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const _ = require('lodash')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type !== 'MarkdownRemark') {
    return
  }

  const slug = createFilePath({ node, getNode })

  createNodeField({
    node,
    name: 'slug',
    value: slug,
  })
}

const createPaginationPage = (data, createPage) => {
  const { totalCount, edges } = data
  const perPage = 10
  const pinedCount = 4
  const pageCount = Math.ceil((totalCount - pinedCount) / perPage)

  if (pageCount > 1) {
    for (let i = 1; i <= pageCount; i++) {
      const edgeList = _.slice(edges, 0, pinedCount + i * perPage)
      const nodes = _.map(edgeList, 'node')
      const next = _.get(_.last(edgeList), 'next')

      createPage({
        path: `/pages/${i}`,
        component: path.resolve('./src/pages/index.jsx'),
        context: {
          pageCount,
          perPage,
          currentPage: i,
          hasPreviousPage: i > 1,
          hasNextPage: i < pageCount,
          nodes,
          next,
        },
      })
    }
  }
}

const createPostPage = (data, createPage) => {
  _.forEach(data.edges, (item) => {
    const { previous, node, next } = item
    const { title, cover, date } = node.frontmatter
    const { slug } = node.fields
    const dateString = date ? `/${_.join(_.split(date, '-'), '/')}` : ''

    createPage({
      path: `/articles${dateString}${slug}`,
      component: path.resolve('./src/templates/post.jsx'),
      context: {
        title,
        cover,
        slug,
        excerpt: node.excerpt,
        previous,
        next,
      },
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve) => {
    graphql(`
      {
        allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
          totalCount

          edges {
            previous {
              id
              frontmatter {
                title
                cover
                date
              }
              excerpt
              fields {
                slug
              }
            }

            node {
              id
              frontmatter {
                title
                tags
                cover
                date
              }
              excerpt
              fields {
                slug
              }
              timeToRead
            }

            next {
              id
              frontmatter {
                title
                cover
                date
              }
              excerpt
              fields {
                slug
              }
            }
          }
        }
      }
    `).then((result) => {
      const { allMarkdownRemark } = result.data

      createPaginationPage(allMarkdownRemark, createPage)
      createPostPage(allMarkdownRemark, createPage)

      resolve()
    })
  })
}
