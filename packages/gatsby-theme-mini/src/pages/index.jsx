import React from 'react'
import { graphql, Link } from 'gatsby'
import _ from 'lodash'

import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import PostList from '../components/PostList'

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        name
        bio
        cover

        SEOTitle
      }
    }

    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 14
    ) {
      pageInfo {
        totalCount
        pageCount
        perPage
        hasPreviousPage
        hasNextPage
        currentPage
      }

      nodes {
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
    }
  }
`

export default function HomePage(props) {
  const { data, pageContext } = props
  const { siteMetadata } = data.site
  const { pageInfo } = data.allMarkdownRemark
  const nodes = pageContext.nodes || data.allMarkdownRemark.nodes
  const hasNextPage = pageContext.nodes
    ? pageContext.hasNextPage
    : pageInfo.hasNextPage
  const currentPage = pageContext.nodes
    ? pageContext.currentPage
    : pageInfo.currentPage

  return (
    <Layout>
      <PageHeader
        title={siteMetadata.name}
        description={siteMetadata.bio}
        cover={siteMetadata.cover}
      />
      <div className="px-6 py-12 lg:py-20 bg-yellow-50 dark:bg-gray-800 bg-opacity-50">
        <div className="container mx-auto">
          <PostList posts={nodes} />
          {hasNextPage ? (
            <div className="mt-8 flex justify-center">
              <Link
                className="py-2 px-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                to={`/pages/${currentPage + 1}#page-${currentPage + 1}`}
              >
                <svg
                  className="animate-bounce w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  )
}
