import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Moon, Sun } from 'react-feather'

export default function Navbar(props) {
  const { name } = props
  const [isPinned, setIsPinned] = useState(false)

  useEffect(() => {
    const fn = _.debounce(() => {
      const scrollTop = document.documentElement.scrollTop

      setIsPinned(scrollTop > 10)
    }, 100)

    window.addEventListener('scroll', fn)

    return () => {
      window.removeEventListener('scroll', fn)
    }
  }, [])

  return (
    <nav
      className={`fixed z-20 w-full transition-all duration-500 ease-in-out ${
        isPinned ? 'bg-white dark:bg-gray-900 shadow-md py-3' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between">
          <div className="flex-none text-gray-900 dark:text-white font-bold">
            <Link to="/">{name}</Link>
          </div>
          <div className="flex divide-x">
            <ul className="flex space-x-2">
              <li className="transition rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                <Link
                  className="block px-6 py-2 font-bold text-gray-900 dark:text-white"
                  to="/"
                >
                  HOME
                </Link>
              </li>
              <li className="transition rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                <Link
                  className="block px-6 py-2 font-bold text-gray-900 dark:text-white"
                  to="/tags"
                >
                  TAG
                </Link>
              </li>
            </ul>
            <div className="ml-2">
              <div className="transition mx-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                <ThemeToggler>
                  {({ theme, toggleTheme }) => (
                    <span
                      className="block px-3 py-2 dark:text-gray-100 cursor-pointer"
                      onClick={() =>
                        toggleTheme(theme === 'light' ? 'dark' : 'light')
                      }
                    >
                      {theme === 'dark' ? (
                        <Sun size={22} />
                      ) : (
                        <Moon size={22} />
                      )}
                    </span>
                  )}
                </ThemeToggler>
              </div>
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
