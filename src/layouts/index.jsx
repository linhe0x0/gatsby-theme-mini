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
        keyword
        description
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
