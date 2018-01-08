import React from 'react'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Link from '../components/Link'
import TagCloud from '../components/TagCloud'
import PostBlock from '../components/PostBlock'

const CategoryPage = ({ data }) => {
  if (!data.allMarkdownRemark) return null

  const mappedCategories = {}

  data.allMarkdownRemark.edges.forEach((item) => {
    const { category } = item.node.frontmatter

    if (!category) return

    if (!mappedCategories[category]) {
      mappedCategories[category] = []
    }

    mappedCategories[category].push(item)
  })

  const PostBlockList = Object.keys(mappedCategories).map((item, index) => {
    return (
      <PostBlock
        key={`${item}-${index}`}
        title={item}
        edges={mappedCategories[item]}
      />
    )
  })

  const { siteMetadata } = data.site

  return (
    <div>
      <Helmet>
        <html lang={siteMetadata.language} />
        <title>{`Categories - ${siteMetadata.SEOTitle}`}</title>
        <meta name="keyword" content={siteMetadata.keyword} />
        <meta name="description" content={siteMetadata.description} />
        <link rel="stylesheet" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Helmet>
      <Header
        title="Categories"
        description={siteMetadata.bio}
        bg={siteMetadata.bgOfHomeHeader}
        size="small"
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8">
            <TagCloud dataSource={Object.keys(mappedCategories)} />
            {PostBlockList}
          </div>
        </div>
      </div>
      <br />
    </div>
  )
}

export default CategoryPage

export const query = graphql`
  query CategoriesQuery {
    allMarkdownRemark {
      edges {
        node {
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
    site {
      siteMetadata {
  			name
        bio
        avatar
        bgOfHomeHeader
        language
        SEOTitle
        keyword
        description
      }
    }
  }
`;
