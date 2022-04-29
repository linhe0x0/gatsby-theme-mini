import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

export default function Author(props) {
  const { author } = props

  const data = useStaticQuery(graphql`
    query AuthorQuery {
      site {
        siteMetadata {
          authors {
            name
            avatar
          }
        }
      }
    }
  `)

  if (!author) {
    return <div></div>
  }

  const authors = author.split(',').map((item) => item.trim())
  const avatars = authors.map((item) => {
    const target = data.site.siteMetadata.authors.find(
      (author) => author.name === item
    )

    return target ? target.avatar : null
  })

  return (
    <div className="flex items-center text-sm">
      {avatars.map((item, index) => (
        <img
          key={item || index}
          className={`shrink-0 block w-8 h-8 rounded-full bg-gray-200 ${index ? '-ml-4': ''}`}
          src={item}
          alt={authors[index]}
        />
      ))}
      <h5 className="ml-2 font-bold text-gray-800 dark:text-gray-400">{author}</h5>
    </div>
  )
}

Author.propTypes = {
  author: PropTypes.string,
}

Author.defaultProps = {
  author: '',
}
