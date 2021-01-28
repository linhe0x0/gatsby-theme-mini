import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Icon from '../Icon'
import TagList from '../TagList'

export default function PostCard(props) {
  const { id, title, tags, cover, date, excerpt, path } = props

  return (
    <figure id={id} className="flex h-60 rounded shadow bg-white select-none">
      <Link className="flex-none block" to={path}>
        <div className="w-72 h-full bg-gray-50 rounded-l-md overflow-hidden">
          {cover ? (
            <img
              className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-110"
              src={cover}
              alt={cover}
            />
          ) : null}
        </div>
      </Link>
      <div className="relative flex-auto pt-6 pb-4 mx-8">
        <div className="flex items-center	justify-between">
          <TagList tags={tags} />
          <figcaption className="text-sm">
            <p className="text-gray-600 text-right">{date}</p>
          </figcaption>
        </div>
        <Link className="block" to={path}>
          <h3 className="my-5 text-2xl">{title}</h3>
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
