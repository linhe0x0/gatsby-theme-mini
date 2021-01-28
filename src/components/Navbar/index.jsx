import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import _ from 'lodash'

import Icon from '../Icon'

export default function Navbar(props) {
  const { name, social } = props
  const [pined, setPined] = useState(false)

  useEffect(() => {
    const fn = _.debounce(() => {
      const scrollTop = document.documentElement.scrollTop

      setPined(scrollTop > 10)
    }, 100)

    window.addEventListener('scroll', fn)

    return () => {
      window.removeEventListener('scroll', fn)
    }
  }, [])

  return (
    <nav
      className={`fixed z-20 w-full transition-all duration-500 ease-in-out ${
        pined ? 'bg-white shadow-md py-3' : 'py-6'
      }`}
    >
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
              {social.map((item, index) => (
                <a
                  key={item.url || index}
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
