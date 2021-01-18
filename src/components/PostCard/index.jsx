import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Icon from '../Icon'
import TagList from '../TagList'

export default function PostCard(props) {
  const { id, title, tags, cover, date, excerpt, path } = props

  return (
    <figure
      id={id}
      className="flex h-56 rounded-md bg-gradient-to-r from-blue-50 to-white select-none"
    >
      <Link className="flex-none block" to={path}>
        <div className="w-72 h-full bg-gradient-to-l from-blue-50 to-white rounded-l-md overflow-hidden">
          {cover ? (
            <img
              className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-110"
              src={cover}
              alt={cover}
            />
          ) : null}
        </div>
      </Link>
      <div className="relative flex-auto py-4 mx-8">
        <figcaption className="text-sm">
          <p className="text-gray-600 text-right">{date}</p>
        </figcaption>
        <TagList tags={tags} />
        <Link className="block" to={path}>
          <h3 className="my-4 text-2xl">{title}</h3>
          <p className="mt-2 h-12 overflow-hidden text-base text-gray-800">
            {excerpt}
          </p>
        </Link>
        <Link className="absolute w-full bottom-4 right-0 " to={path}>
          <div className="flex justify-end">
            <Icon type="right" />
          </div>
        </Link>
      </div>
    </figure>
  )
}

PostCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  cover: PropTypes.string,
  date: PropTypes.string,
  excerpt: PropTypes.string,
  path: PropTypes.string,
}

PostCard.defaultProps = {
  id: '',
  title: '',
  tags: '',
  cover: '',
  date: '',
  excerpt: '',
  path: '',
}
