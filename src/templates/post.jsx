import React from 'react'
import Helmet from 'react-helmet'
import classnames from 'classnames'
import Tag from '../components/Tag'
import Link from '../components/Link'

import styles from '../styles/post.module.css'
import '../styles/highlight.css'
import '../styles/markdown.css'

class Share extends React.Component {
  componentDidMount() {
    const headElement = document.querySelector('head')
    const linkElement = document.createElement('link')

    linkElement.rel = 'stylesheet'
    linkElement.href =
      'https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/css/share.min.css'

    headElement.appendChild(linkElement)

    const scriptElement = document.createElement('script')

    scriptElement.src =
      'https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js'

    headElement.appendChild(scriptElement)
  }

  render() {
    return <div className="social-share" data-disabled="diandian" />
  }
}

const Pager = ({ prev, next }) => {
  const prevBtnClass = classnames({
    [styles.pager__item]: true,
    [styles['pager__item--prev']]: true,
    [styles['pager__item--disabled']]: !prev,
  })

  const nextBtnClass = classnames({
    [styles.pager__item]: true,
    [styles['pager__item--next']]: true,
    [styles['pager__item--disabled']]: !next,
  })

  return (
    <ul
      className={`${
        styles.pager
      } row justify-content-between text-center list-inline`}
    >
      <li className="col list-inline-item">
        <Link
          className={prevBtnClass}
          to={prev ? `/articles${prev.fields.slug}` : null}
          title={prev ? prev.frontmatter.title : '已经是第一篇啦 ^_^'}
        >
          <div className={`${styles.pager__title}`}>Previous</div>
          <p className={`${styles.pager__tips}`}>
            {prev ? prev.frontmatter.title : '已经是第一篇啦 ^_^ '}
          </p>
        </Link>
      </li>
      <li className="col list-inline-item">
        <Link
          className={nextBtnClass}
          to={next ? `/articles${next.fields.slug}` : null}
          title={next ? next.frontmatter.title : '已经是最后一篇啦 ^_^'}
        >
          <div className={`${styles.pager__title}`}>Next</div>
          <p className={`${styles.pager__tips}`}>
            {next ? next.frontmatter.title : '已经是最后一篇啦 ^_^'}
          </p>
        </Link>
      </li>
    </ul>
  )
}

const PostTemplate = ({ data, pathContext }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site

  const tags = post.frontmatter.tags || []

  const author = post.frontmatter.author || siteMetadata.defaultAuthor

  const inlineStyleOfPostHeading = {}

  if (post.frontmatter.cover) {
    inlineStyleOfPostHeading['backgroundImage'] = `url(${
      post.frontmatter.cover
    })`
  }

  return (
    <div>
      <Helmet>
        <html lang={siteMetadata.language} />
        <title>
          {post.frontmatter.title} - 由作者{author}发布于{' '}
          {post.frontmatter.date}
        </title>
        <meta name="keyword" content={siteMetadata.keyword} />
        <meta name="description" content={siteMetadata.description} />
        <link
          rel="stylesheet"
          href="https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css"
        />
      </Helmet>
      <div className={styles['post-heading']} style={inlineStyleOfPostHeading}>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-10">
              <div className="tags ghost-tags">
                {tags.map(tag => (
                  <Tag key={tag} to={`/tags#${tag}`} theme="white" full>
                    {tag}
                  </Tag>
                ))}
              </div>
              <h1 className={styles['post-heading__title']}>
                {post.frontmatter.title}
              </h1>
              <p className={styles['post-heading__meta']}>
                {author} · {post.frontmatter.date}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-10">
            <article
              className={`markdown-body ${siteMetadata.language}`}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            {siteMetadata.donation.status && (
              <div className={styles.donation}>
                <h3 className="mb-3">您的鼓励是作者写作最大的动力</h3>
                <p>
                  如果您认为本网站的文章质量不错，读后觉得收获很大，不妨请我喝杯咖啡，让我有动力继续写出高质量的文章。
                </p>
                {siteMetadata.donation.channel.alipay && (
                  <a
                    href={siteMetadata.donation.channel.alipay}
                    className="btn btn-primary mr-2"
                    target="_blank"
                  >
                    支付宝打赏
                  </a>
                )}
                {siteMetadata.donation.channel.wechat && (
                  <a
                    href={siteMetadata.donation.channel.wechat}
                    className="btn btn-success"
                    target="_blank"
                  >
                    微信打赏
                  </a>
                )}
              </div>
            )}
            {siteMetadata.share && <Share />}
            <hr />
            <Pager prev={pathContext.prev} next={pathContext.next} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostTemplate

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        category
        tags
        cover
      }
    }
    site {
      siteMetadata {
        defaultAuthor
        language
        SEOTitle
        keyword
        description
        donation {
          status
          channel {
            alipay
            wechat
          }
        }
        share
      }
    }
  }
`
