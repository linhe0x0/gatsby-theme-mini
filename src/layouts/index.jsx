import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Analytics from '../components/Analytics'

const Layout = props => {
  const { siteMetadata } = props.data.site
  const {
    navbar,
    aboutPage,
    friends,
    externalItemOfFooter,
    contact,
    analytics,
  } = siteMetadata

  return (
    <div>
      <Helmet>
        <html lang={siteMetadata.language} />
        <meta name="keyword" content={siteMetadata.keyword} />
        <meta name="description" content={siteMetadata.description} />
        {/* Google / Search Engine Tags */}
        <meta itemprop="name" content={siteMetadata.SEOTitle} />
        <meta itemprop="description" content={siteMetadata.description} />
        <meta itemprop="image" content={siteMetadata.thumbnail} />

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
      </Helmet>
      <Navbar {...navbar} showAboutPage={aboutPage.show} />
      {props.children()}
      <Footer
        friends={friends}
        externalItemOfFooter={externalItemOfFooter}
        contact={contact}
      />
      <Analytics google={analytics.google} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object.isRequired,
}

export default Layout

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        language
        SEOTitle
        keyword
        description
        url
        thumbnail
        navbar {
          showDefaultItems
          brand
          external {
            name
            to
          }
        }
        aboutPage {
          show
        }
        friends {
          name
          to
        }
        externalItemOfFooter {
          title
          list {
            name
            to
          }
        }
        contact {
          name
          value
        }
        analytics {
          google
        }
      }
    }
  }
`
