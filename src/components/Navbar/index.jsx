import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { Sun, Moon, GitHub, Twitter } from 'react-feather'
import _ from 'lodash'

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
        pined ? 'bg-white dark:bg-gray-900 shadow-md py-3' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-8">
        <div className="flex items-center">
          <div className="flex-none w-32 text-gray-900 dark:text-white font-bold">
            <Link to="/">{name}</Link>
          </div>
          <ul className="flex-auto flex justify-center space-x-2">
            <li>
              <Link
                className="block px-6 py-2 font-bold text-gray-900 dark:text-white"
                to="/"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                className="block px-6 py-2 font-bold text-gray-900 dark:text-white"
                to="/tags"
              >
                TAG
              </Link>
            </li>
          </ul>
          <div className="flex-none">
            <div className="flex space-x-3 justify-end">
              {social.map((item, index) => (
                <a
                  key={item.url || index}
                  className="dark:text-gray-100"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.name.toLowerCase() === 'github' ? (
                    <GitHub size={20} />
                  ) : null}
                  {item.name.toLowerCase() === 'twitter' ? (
                    <Twitter size={20} />
                  ) : null}
                </a>
              ))}
              <ThemeToggler>
                {({ theme, toggleTheme }) => (
                  <span
                    className="dark:text-gray-100 cursor-pointer"
                    onClick={() =>
                      toggleTheme(theme === 'light' ? 'dark' : 'light')
                    }
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </span>
                )}
              </ThemeToggler>
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
