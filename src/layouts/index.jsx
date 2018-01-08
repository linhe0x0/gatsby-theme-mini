import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Analytics from '../components/Analytics'

const Layout = (props) => {
  const { navbar, aboutPage, friends, externalItemOfFooter, contact, analytics } = props.data.site.siteMetadata

  return (
    <div>
      <Navbar
        {...navbar}
        showAboutPage={aboutPage.show}
      />
      {props.children()}
      <Footer
        friends={friends}
        externalItemOfFooter={externalItemOfFooter}
        contact={contact}
      />
      <Analytics
        google={analytics.google}
      />
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
