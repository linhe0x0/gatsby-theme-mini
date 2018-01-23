import React from 'react'
import Helmet from 'react-helmet'
import ReactMarkdown from 'react-markdown'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const AboutPage = ({ data }) => {
  const { siteMetadata } = data.site
  const { allMarkdownRemark } = data

  if (!allMarkdownRemark) return null

  const userInformation = {
    name: siteMetadata.name,
    bio: siteMetadata.bio,
    avatar: siteMetadata.avatar,
  }

  const mappedTags = {}

  allMarkdownRemark.edges.forEach(item => {
    const { tags } = item.node.frontmatter

    if (!tags) return

    tags.forEach(tag => {
      if (!mappedTags[tag]) {
        mappedTags[tag] = 0
      }

      mappedTags[tag] += 1
    })
  })

  const featuredTags = Object.keys(mappedTags).filter(
    item => mappedTags[item] >= siteMetadata.limitOfFeaturedTags
  )

  return (
    <div>
      <Helmet>
        <html lang={siteMetadata.language} />
        <title>{`About - ${siteMetadata.SEOTitle}`}</title>
        <meta name="keyword" content={siteMetadata.keyword} />
        <meta name="description" content={siteMetadata.description} />
        <link
          rel="stylesheet"
          href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Helmet>
      <Header
        title={siteMetadata.name}
        description={siteMetadata.bio}
        bg={siteMetadata.bgOfHomeHeader}
      />
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <ReactMarkdown source={siteMetadata.aboutPage.content} />
            </div>
            <div className="col-md-3">
              <Sidebar
                featuredTags={featuredTags}
                userInformation={userInformation}
                snsLink={siteMetadata.snsLink}
                friends={siteMetadata.friends}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

export const query = graphql`
  query AboutQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
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
        limitOfFeaturedTags
        aboutPage {
          content
        }
        snsLink {
          icon
          text
          to
        }
        friends {
          name
          to
        }
      }
    }
  }
`
