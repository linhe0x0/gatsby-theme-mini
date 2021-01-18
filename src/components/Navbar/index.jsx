import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Icon from '../Icon'

export default function Navbar(props) {
  const { name, social } = props

  return (
    <nav className="fixed z-20 w-full p-4">
      <div className="container mx-auto max-w-screen-lg">
        <div className="flex items-center">
          <div className="flex-none w-32 text-gray-900 font-bold">
            <Link to="/">{name}</Link>
          </div>
          <ul className="flex-auto flex justify-center space-x-2">
            <li>
              <Link className="block px-6 py-2 font-bold text-gray-900" to="/">
                HOME
              </Link>
            </li>
            <li>
              <Link
                className="block px-6 py-2 font-bold text-gray-900"
                to="/tags"
              >
                TAG
              </Link>
            </li>
          </ul>
          <div className="flex-none">
            <div className="w-32 flex space-x-3 justify-end">
              {social.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon type={item.name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  name: PropTypes.string,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
}

Navbar.defaultProps = {
  name: '',
  social: [],
}
