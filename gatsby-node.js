const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type !== 'MarkdownRemark') return

  const slug = createFilePath({ node, getNode })

  createNodeField({
    node,
    name: 'slug',
    value: slug,
  })
}

const createPaginationPage = ({ edges, totalCount }, createPage) => {
  const per_page = 10
  const totalPage = Math.ceil(totalCount / per_page)

  if (totalPage > 1) {
    for (let i = 1; i <= totalPage; i++) {
      const start = (i - 1) * per_page
      const end = Math.min(i * per_page, totalCount)

      const posts = edges.slice(start, end)

      createPage({
        path: `/pages/${i}`,
        component: path.resolve('./src/pages/index.jsx'),
        context: {
          page: i,
          totalPage: totalPage,
          posts,
        },
      })
    }
  }
}

const createPostPage = ({ edges }, createPage) => {
  edges.forEach(({ node }, index) => {
    const prev = index === 0 ? false : edges[index - 1].node
    const next = index === edges.length - 1 ? false : edges[index + 1].node

    createPage({
      path: `/articles${node.fields.slug}`,
      component: path.resolve('./src/templates/post.jsx'),
      context: {
        slug: node.fields.slug,
        title: node.frontmatter.title,
        excerpt: node.excerpt,
        prev,
        next,
      },
    })
  })
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          totalCount
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                category
                tags
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
    `).then(result => {
      createPaginationPage(result.data.allMarkdownRemark, createPage)
      createPostPage(result.data.allMarkdownRemark, createPage)

      resolve()
    })
  })
}
