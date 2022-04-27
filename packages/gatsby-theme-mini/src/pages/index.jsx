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
      limit: 9
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
      <div className="relative pt-20 pb-32 dark:bg-gray-900 bg-opacity-50">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">
          <PostList posts={nodes} />
        </div>
        {hasNextPage ? (
          <div className="-mt-12 flex justify-center">
            <div className="absolute b-0 h-32 pt-96 box-content inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pointer-events-none dark:from-gray-900"></div>
            <Link
              className="py-2 px-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              to={`/pages/${currentPage + 1}#page-${currentPage + 1}`}
            >
              <button className="relative bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-sm text-white font-bold h-12 px-8 rounded-lg flex items-center dark:bg-gray-700 dark:hover:bg-gray-600 pointer-events-auto">
                查看更多
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    </Layout>
  )
}
