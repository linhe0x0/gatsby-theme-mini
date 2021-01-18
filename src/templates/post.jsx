import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import TagList from '../components/TagList'
import Icon from '../components/Icon'
import { getPermalink } from '../helpers/permalink'

import '../styles/highlight.css'
import '../styles/markdown.css'

export const query = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        name
        thumbnail
      }
      host
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        tags
        cover
        date
      }
      excerpt
      html
    }
  }
`

export default function PostTemplate(props) {
  const { data, pageContext } = props
  const { siteMetadata, host } = data.site
  const post = data.markdownRemark
  const tags = post.frontmatter.tags || []

  const inlineStyleOfPostHeading = {}

  if (post.frontmatter.cover) {
    inlineStyleOfPostHeading.backgroundImage = `url(${post.frontmatter.cover})`
  }

  const pageTitle = `${post.frontmatter.title} - 由作者${siteMetadata.name}发布于 ${post.frontmatter.date}`

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <link
          rel="stylesheet"
          href="https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css"
        />
        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content={pageTitle} />
        <meta itemProp="description" content={pageContext.excerpt} />
        <meta
          itemProp="image"
          content={post.frontmatter.cover || siteMetadata.thumbnail}
        />
        {/* Facebook Meta Tags */}
        <meta
          property="og:url"
          content={`${host}/articles${pageContext.slug}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageContext.excerpt} />
        <meta
          property="og:image"
          content={post.frontmatter.cover || siteMetadata.thumbnail}
        />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageContext.excerpt} />
        <meta
          name="twitter:image"
          content={post.frontmatter.cover || siteMetadata.thumbnail}
        />
      </Helmet>
      <div className="py-36 bg-gray-50" style={inlineStyleOfPostHeading}>
        <div className="container mx-auto">
          <TagList tags={tags} />
          <h1 className="py-6 text-5xl font-extrabold text-gray-900">
            {post.frontmatter.title}
          </h1>
          <div className="flex items-center">
            <div className="mr-4 text-xl text-gray-800">
              {siteMetadata.name}
            </div>
            <div className="text-base text-gray-500">
              {post.frontmatter.date}
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-screen-lg mx-auto py-20">
        <article
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
      <div className="pt-24 pb-32 bg-gray-50">
        <div className="flex overflow-hidden -my-8">
          <ul className="flex items-center w-full py-8">
            <li className="px-3 flex-none w-1/3 transform scale-90 rotate-2 hover:rotate-0">
              {pageContext.previous ? (
                <Link to={getPermalink(pageContext.previous)}>
                  <figure className="shadow-lg rounded-xl flex-none">
                    <blockquote className="rounded-t-xl bg-white px-10 py-10 text-xl font-semibold text-gray-900">
                      <svg
                        width="45"
                        height="36"
                        className="mb-5 fill-current text-green-400"
                      >
                        <path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path>
                      </svg>
                      <p className="h-20 overflow-hidden text-lg text-gray-600 font-normal">
                        {pageContext.previous.excerpt}
                      </p>
                    </blockquote>
                    <figcaption className="flex items-center space-x-4 px-10 py-6 rounded-b-xl text-white bg-gradient-to-br from-green-400 to-blue-400">
                      <div className="flex-auto text-2xl truncate">
                        {pageContext.previous.frontmatter.title}
                      </div>
                      <div className="flex-none text-white">
                        <Icon type="right" />
                      </div>
                    </figcaption>
                  </figure>
                </Link>
              ) : null}
            </li>
            <li className="px-3 flex-none w-1/3 transform -rotate-1">
              <figure className="shadow-lg rounded-xl flex-none">
                <blockquote className="rounded-t-xl bg-white px-10 py-10 text-xl font-semibold text-gray-900">
                  <svg
                    width="45"
                    height="36"
                    className="mb-5 fill-current text-blue-400"
                  >
                    <path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path>
                  </svg>
                  <p className="h-20 overflow-hidden text-lg text-gray-600 font-normal">
                    {post.excerpt}
                  </p>
                </blockquote>
                <figcaption className="flex items-center space-x-4 px-10 py-6 rounded-b-xl text-white bg-gradient-to-br from-blue-400 to-purple-400">
                  <div className="flex-auto text-2xl truncate">
                    {post.frontmatter.title}
                  </div>
                  <div className="flex-none text-white">
                    <Icon type="right" />
                  </div>
                </figcaption>
              </figure>
            </li>
            <li className="px-3 flex-none w-1/3 transform scale-90 rotate-1 hover:rotate-0">
              {pageContext.next ? (
                <Link to={getPermalink(pageContext.next)}>
                  <figure className="shadow-lg rounded-xl flex-none">
                    <blockquote className="rounded-t-xl bg-white px-10 py-10 text-xl font-semibold text-gray-900">
                      <svg
                        width="45"
                        height="36"
                        className="mb-5 fill-current text-purple-400"
                      >
                        <path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path>
                      </svg>
                      <p className="h-20 overflow-hidden text-lg text-gray-600 font-normal">
                        {pageContext.next.excerpt}
                      </p>
                    </blockquote>
                    <figcaption className="flex items-center space-x-4 px-10 py-6 rounded-b-xl text-white bg-gradient-to-br from-purple-400 to-pink-500">
                      <div className="flex-auto text-2xl truncate">
                        {pageContext.next.frontmatter.title}
                      </div>
                      <div className="flex-none text-white">
                        <Icon type="right" />
                      </div>
                    </figcaption>
                  </figure>
                </Link>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
