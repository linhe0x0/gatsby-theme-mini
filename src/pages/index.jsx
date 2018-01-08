import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Link from '../components/Link'
import Header from '../components/Header'
import PostPreview from '../components/PostPreview'
import Sidebar from '../components/Sidebar'

const Pagination = ({ page, totalPage}) => {
  const hasPrevPage = (page > 1)
  const hasNextPage = (page < totalPage)

  if (!hasPrevPage && !hasNextPage) return null

  const prevBtnClass = classnames({
    'page-item': true,
    disabled: !hasPrevPage,
  })

  const nextBtnClass = classnames({
    'page-item': true,
    disabled: !hasNextPage,
  })

  return (
    <nav className="mt-4">
      <ul className="pagination justify-content-end">
        <li className={prevBtnClass}>
          <Link
            className="page-link"
            to={ hasPrevPage ? `/pages/${page - 1}` : null }
            style={{color: "#a3a3a3"}}
          >
            Previous
          </Link>
        </li>
        <li className={nextBtnClass}>
          <Link
            className="page-link"
            to={ hasNextPage ? `/pages/${page + 1}` : null }
            style={{color: "#a3a3a3"}}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  )
}

const IndexPage = (props) => {
  const { allMarkdownRemark } = props.data

  if (!allMarkdownRemark) return null

  const { siteMetadata } = props.data.site
  const edges = props.pathContext.posts || allMarkdownRemark.edges.slice(0, 10)

  const Posts = edges.map((item, index) => (
    <PostPreview
      key={`${item}-${index}`}
      title={item.node.frontmatter.title}
      author={siteMetadata.defaultAuthor}
      date={item.node.frontmatter.date}
      excerpt={item.node.excerpt}
      path={`/articles${item.node.fields.slug}`}
    />
  ))

  const mappedTags = {}

  allMarkdownRemark.edges.forEach((item) => {
    const { tags } = item.node.frontmatter

    if (!tags) return

    tags.forEach((tag) => {
      if (!mappedTags[tag]) {
        mappedTags[tag] = 0
      }

      mappedTags[tag] += 1
    })
  })

  const featuredTags = Object.keys(mappedTags).filter(item => mappedTags[item] >= siteMetadata.limitOfFeaturedTags)

  const totalPage = props.pathContext.totalPage || Math.ceil(allMarkdownRemark.totalCount / 10)
  const userInformation = {
    name: siteMetadata.name,
    bio: siteMetadata.bio,
    avatar: siteMetadata.avatar,
  }

  return (
    <div>
      <Helmet>
        <html lang={siteMetadata.language} />
        <title>{siteMetadata.SEOTitle}</title>
        <meta name="keyword" content={siteMetadata.keyword} />
        <meta name="description" content={siteMetadata.description} />
        <link rel="stylesheet" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" />
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
              {Posts}
              {
                <Pagination
                  page={props.pathContext.page || 1}
                  totalPage={totalPage}
                />
              }
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

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
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
        defaultAuthor
        bgOfHomeHeader
        language
        SEOTitle
        keyword
        description
        limitOfFeaturedTags
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
