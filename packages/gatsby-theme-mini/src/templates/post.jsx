import React, { useState, useEffect, useRef } from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import { ArrowLeft, Clock } from 'react-feather'
import _ from 'lodash'

import Layout from '../components/Layout'
import TagList from '../components/TagList'
import ProgressBar from '../components/ProgressBar'
import PostCard from '../components/PostCard'
import Anchor from '../components/Anchor'
import Author from '../components/Author'

export const query = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        name
        thumbnail
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        tags
        cover
        date
        author
      }
      excerpt
      html
      timeToRead
      headings {
        value
        depth
      }
    }
  }
`

export default function PostTemplate(props) {
  const { data, pageContext } = props
  const { siteMetadata } = data.site

  const post = data.markdownRemark
  const tags = post.frontmatter.tags || []

  const inlineStyleOfPostHeading = {}

  if (post.frontmatter.cover) {
    inlineStyleOfPostHeading.backgroundImage = `url(${post.frontmatter.cover})`
  }

  const pageTitle = `${post.frontmatter.title} - 由作者${siteMetadata.name}发布于 ${post.frontmatter.date}`

  const [pageLink, setPageLink] = useState()

  useEffect(() => {
    setPageLink(window.location.href)
  }, [])

  const markdownContainer = useRef(null)
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const height = markdownContainer.current.offsetHeight
    const top = markdownContainer.current.offsetTop
    const min = top
    const max = height + top - window.innerHeight

    const handleScroll = () => {
      const t = document.documentElement.scrollTop

      if (t < min) {
        setReadingProgress(0)
      } else if (t > max) {
        setReadingProgress(100)
      } else {
        setReadingProgress(Math.round(((t - min) / (max - min)) * 100))
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const maxDepth = _.minBy(post.headings, 'depth')?.depth
  const headings = _.map(
    _.filter(post.headings, { depth: maxDepth }),
    (item) => {
      return _.kebabCase(item.value)
    }
  )
  const markdownBody = useRef(null)

  useEffect(() => {
    if (!maxDepth) {
      return
    }

    const hs = Array.from(
      markdownBody.current.querySelectorAll(`h${maxDepth}`)
    ).reverse()

    const handleScroll = _.debounce(() => {
      const target = _.find(hs, (h) => {
        return document.documentElement.scrollTop >= h.offsetTop - 100
      })

      if (!target) {
        window.location.hash = ''
        return
      }

      const anchor = target.querySelector('.anchor')

      if (!anchor) {
        return
      }

      const to = decodeURIComponent(anchor.getAttribute('href'))

      window.location.hash = to
    }, 500)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [maxDepth])

  const [activeAnchor, setActiveAnchor] = useState('')

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)

      if (!hash) {
        setActiveAnchor('')
        return
      }

      const target = decodeURIComponent(hash)

      setActiveAnchor(target)
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const others = pageContext.random || []

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content={pageTitle} />
        <meta itemProp="description" content={pageContext.excerpt} />
        <meta
          itemProp="image"
          content={post.frontmatter.cover || siteMetadata.thumbnail}
        />
        {/* Facebook Meta Tags */}
        <meta property="og:url" content={pageLink} />
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
      <div
        className="px-4 md:px-0 bg-gray-50 dark:bg-gray-900 bg-cover"
        style={inlineStyleOfPostHeading}
      >
        <div className="relative">
          <div className="container relative z-10 mx-auto py-44">
            <TagList tags={tags} />
            <h1 className="py-6 text-5xl font-extrabold text-gray-900 dark:text-gray-100">
              {post.frontmatter.title}
            </h1>
            <div className="flex items-center">
              <div className="mr-4">
                <Author author={post.frontmatter.author} />
              </div>
              <div className="text-base text-gray-700 dark:text-gray-500">
                {post.frontmatter.date}
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-0 w-2/3 h-full bg-gradient-to-r from-gray-500 dark:from-gray-900"></div>
        </div>
      </div>
      <div className="dark:bg-gray-900 dark:text-gray-100">
        <div
          className="mx-10 lg:container lg:mx-auto py-10 md:py-20"
          ref={markdownContainer}
        >
          <div className="md:flex">
            <div className="w-full md:w-1/4 mb-16 md:mb-0 mr-4 md:mr-6 lg:pr-16">
              <Anchor offsetTop={100}>
                <div className="divide-y">
                  <div>
                    <div className="flex items-center mb-8 text-blue-600">
                      <ArrowLeft />
                      <Link className="ml-2 font-bold" to="/">
                        返回首页
                      </Link>
                    </div>
                    <ProgressBar value={readingProgress} />
                    {post.timeToRead ? (
                      <div className="flex items-center justify-center py-8 text-sm text-gray-700 dark:text-gray-500">
                        <Clock size={18} />
                        <span className="block mx-2">
                          阅读大约 {post.timeToRead} 分钟
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <ul className="pt-8 pl-2">
                    {headings.map((item, index) => (
                      <li key={item}>
                        <a
                          className={`flex items-center my-3 text-gray-600 dark:text-gray-400 cursor-pointer text-sm ${
                            item === activeAnchor ? 'text-blue-600' : ''
                          }`}
                          href={`#${item}`}
                        >
                          <span
                            className={`block w-1.5 h-1.5 mr-3 bg-blue-600 rounded-full ${
                              item === activeAnchor
                                ? 'opacity-100'
                                : 'opacity-0'
                            } `}
                          ></span>
                          <span>
                            {index + 1}. {item}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Anchor>
            </div>
            <div className="w-3/4">
              <article
                ref={markdownBody}
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </div>
        </div>
        <div className="relative pt-20 pb-28 bg-white dark:bg-gray-900">
          <div className="mb-12 text-3xl text-center">其他文章</div>
          <ul className="md:flex mx-10 lg:mx-32 xl:mx-48 2xl:mx-60 justify-center md:space-x-6 xl:space-x-8 space-y-6 md:space-y-0">
            {others.map((item) => (
              <li key={item.id} className="md:w-1/3">
                <PostCard data={item} card={false} clamp />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}
