import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import classnames from 'classnames'
import throttle from 'lodash/throttle'

import './Navbar.css'

let prevScrollTop = 0

class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      direction: '',
      isOnTop: true,
    }

    this.handlePageScroll = this.handlePageScroll.bind(this)
  }

  getScrollTop() {
    return window.document.body.scrollTop || window.document.documentElement.scrollTop
  }

  handlePageScroll() {
    const currentScrollTop = this.getScrollTop()
    const direction = currentScrollTop > prevScrollTop ? 'up' : 'down'
    const isOnTop = currentScrollTop < 10

    if (direction !== this.state.direction) {
      this.setState({
        direction,
      })
    }

    if (isOnTop !== this.state.isOnTop) {
      this.setState({
        isOnTop,
      })
    }

    prevScrollTop = currentScrollTop
  }

  componentDidMount() {
    prevScrollTop = this.getScrollTop()

    document.body.onscroll = throttle(this.handlePageScroll, 300)
  }

  componentWillUnmount() {
    document.body.onscroll = null
  }

  render() {
    const { brand, showDefaultItems, external, showAboutPage } = this.props
    const { direction, isOnTop } = this.state
    const navbarClass = classnames({
      'navbar--is-visible': !isOnTop && direction === 'down',
      'navbar--is-on-top': isOnTop,
    })

    const navItems = []

    if (showDefaultItems) {
      navItems.push(
        (
          <li key="navbar__item-categories" className="nav-item">
            <Link className="nav-link" to="/categories/">categories</Link>
          </li>
        ),
        (
          <li key="navbar__item-tags" className="nav-item">
            <Link className="nav-link" to="/tags/">Tags</Link>
          </li>
        )
      )
    }

    if (showAboutPage) {
      navItems.push(
        <li key="navbar__item-about" className="nav-item">
          <Link className="nav-link" to="/about">about</Link>
        </li>
      )
    }

    if (external.length) {
      external.forEach((item, index) => {
        if (item.to.startsWith('http')) {
          navItems.push(
            <li key={`navbar__item-${item}-${index}`} className="nav-item">
              <a className="nav-link" href={item.to} target="_blank">{item.name}</a>
            </li>
          )
        } else {
          navItems.push(
            <li key={`navbar__item-${item}-${index}`} className="nav-item">
              <Link className="nav-link" to={item.to}>{item.name}</Link>
            </li>
          )
        }
      })
    }

    return (
      <nav className={`navbar navbar-expand-sm fixed-top navbar-custom ${navbarClass}`}>
        <div className="container">
          <div className="collapse navbar-collapse justify-content-between">
            <Link className="navbar-brand" to="/">{brand}</Link>
            <ul className="nav navbar-nav navbar-right text-uppercase">
              { navItems }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  brand: PropTypes.string.isRequired,
  showDefaultItems: PropTypes.bool,
  external: PropTypes.array.isRequired,
  showAboutPage: PropTypes.bool,
}

Navbar.defaultProps = {
  showDefaultItems: true,
  showAboutPage: true,
}

export default Navbar
