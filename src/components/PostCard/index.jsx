import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Icon from '../Icon'
import TagList from '../TagList'

export default function PostCard(props) {
  const { id, title, tags, cover, date, excerpt, path } = props

  return (
    <figure id={id} className="md:flex rounded shadow bg-white select-none">
      <Link className="flex-none block" to={path}>
        <div className="w-full md:w-72 h-full bg-yellow-300 rounded-t-md md:rounded-t-none md:rounded-l-md overflow-hidden">
          {cover ? (
            <img
              className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-110"
              src={cover}
              alt={cover}
            />
          ) : null}
        </div>
      </Link>
      <div className="relative flex-auto pt-5 pb-4 mx-4 md:mx-8">
        <div className="flex items-center	justify-between flex-wrap">
          <TagList tags={tags} />
          <figcaption className="text-sm my-1">
            <p className="text-gray-600 text-right">{date}</p>
          </figcaption>
        </div>
        <Link className="block pb-12" to={path}>
          <h3 className="my-5 text-xl md:text-2xl">{title}</h3>
          <p className="mt-2 h-12 overflow-hidden text-base text-gray-600">
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
