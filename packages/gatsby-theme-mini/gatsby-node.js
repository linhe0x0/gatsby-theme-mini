const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const _ = require('lodash')

function getPermalink(date, slug) {
  const prefix = '/posts'
  const dateString = date ? `/${_.join(_.split(date, '-'), '/')}` : ''

  return `${prefix}${dateString}${slug}`
}

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

  const permalink = getPermalink(node.frontmatter.date, slug)

  createNodeField({
    node,
    name: 'permalink',
    value: permalink,
  })
}

const createPaginationPage = (data, createPage) => {
  const { totalCount, edges } = data
  const perPage = 9
  const pageCount = Math.ceil(totalCount / perPage)

  if (pageCount > 1) {
    for (let i = 1; i <= pageCount; i++) {
      const edgeList = _.slice(edges, 0, i * perPage)
      const nodes = _.map(edgeList, 'node')
      const next = _.get(_.last(edgeList), 'next')

      createPage({
        path: `/pages/${i}`,
        component: path.resolve(__dirname, 'src/pages/index.jsx'),
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

const createPostPage = (allMarkdownRemark, createPage) => {
  _.forEach(allMarkdownRemark.edges, (item) => {
    const { previous, node, next } = item
    const { title, cover, date } = node.frontmatter
    const { slug } = node.fields

    const permalink = getPermalink(date, slug)

    const others = _.filter(
      allMarkdownRemark.edges,
      (edge) => edge.node.id !== item.node.id
    )
    const random = _.map(_.sampleSize(others, 3), 'node')

    createPage({
      path: permalink,
      component: path.resolve(__dirname, 'src/templates/post.jsx'),
      context: {
        title,
        cover,
        slug,
        permalink,
        excerpt: node.excerpt,
        previous,
        next,
        random,
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
                permalink
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
                permalink
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
                permalink
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
