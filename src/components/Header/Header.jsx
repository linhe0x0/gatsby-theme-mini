import React from 'react'
import PropTypes from 'prop-types'

import './Header.css'

const Header = ({ size, title, description, bg }) => {
  const inlineStyle = {}

  if (bg) {
    inlineStyle.backgroundImage = `url(${bg})`
  }

  return (
    <header
      className={`intro-header ${size ? 'intro-header--' + size : ''}`}
      style={inlineStyle}
    >
      <div className="container">
        <div className="text-center">
          <h1 className="intro-header__site-heading">{title}</h1>
          <h3 className="intro-header__subheading">{description}</h3>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  size: PropTypes.string,
  bg: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

Header.defaultProps = {
  size: '',
  bg: '',
}

export default Header
