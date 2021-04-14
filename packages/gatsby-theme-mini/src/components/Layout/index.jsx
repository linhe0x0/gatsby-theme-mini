import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import Navbar from '../Navbar'
import Footer from '../Footer'
import Analytics from '../Analytics'

export default function Layout(props) {
  const { children } = props
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        buildTime

        siteMetadata {
          name

          SEOTitle
          keyword
          description
          thumbnail
          social {
            name
            url
          }

          favicon

          analytics {
            google
          }
        }
      }
    }
  `)
  const { siteMetadata } = data.site

  return (
    <div>
      <Helmet>
        <meta name="keyword" content={siteMetadata.keyword} />
        <meta name="description" content={siteMetadata.description} />
        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content={siteMetadata.SEOTitle} />
        <meta itemProp="description" content={siteMetadata.description} />
        <meta itemProp="image" content={siteMetadata.thumbnail} />
        {/* Facebook Meta Tags */}
        <meta property="og:url" content={siteMetadata.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteMetadata.SEOTitle} />
        <meta property="og:description" content={siteMetadata.description} />
        <meta property="og:image" content={siteMetadata.thumbnail} />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteMetadata.SEOTitle} />
        <meta name="twitter:description" content={siteMetadata.description} />
        <meta name="twitter:image" content={siteMetadata.thumbnail} />
        <link rel="shortcut icon" href={siteMetadata.favicon} />
        <title>{siteMetadata.SEOTitle}</title>
      </Helmet>
      <Navbar name={siteMetadata.name} social={siteMetadata.social} />
      {children}
      <Footer />
      {siteMetadata.analytics.google ? (
        <Analytics google={siteMetadata.analytics.google} />
      ) : null}
    </div>
  )
}
