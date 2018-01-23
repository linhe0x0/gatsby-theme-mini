import React from 'react'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Link from '../components/Link'
import TagCloud from '../components/TagCloud'
import PostBlock from '../components/PostBlock'

const TagPage = ({ data }) => {
  if (!data.allMarkdownRemark) return null

  const mappedTags = {}

  data.allMarkdownRemark.edges.forEach(item => {
    const { tags } = item.node.frontmatter

    if (!tags) return

    tags.forEach(tag => {
      if (!mappedTags[tag]) {
        mappedTags[tag] = []
      }

      mappedTags[tag].push(item)
    })
  })

  const PostBlockList = Object.keys(mappedTags).map((item, index) => {
    return (
      <PostBlock
        key={`${item}-${index}`}
        title={item}
        edges={mappedTags[item]}
      />
    )
  })

  const { siteMetadata } = data.site

  return (
    <div>
      <Helmet>
        <title>{`Tags - ${siteMetadata.SEOTitle}`}</title>
        <link
          rel="stylesheet"
          href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Helmet>
      <Header
        title="Tags"
        description={siteMetadata.bio}
        bg={siteMetadata.bgOfHomeHeader}
        size="small"
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8">
            <TagCloud dataSource={Object.keys(mappedTags)} />
            {PostBlockList}
          </div>
        </div>
      </div>
      <br />
    </div>
  )
}

export default TagPage

export const query = graphql`
  query TagsQuery {
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
        SEOTitle
      }
    }
  }
`
