import React from 'react'
import PropTypes from 'prop-types'
import { ArrowRight } from 'react-feather'
import { Link } from 'gatsby'

import Author from '../Author'

export default function PostCard(props) {
  const { data, card, clamp } = props

  return (
    <div className={card ? 'bg-gray-50 dark:bg-gray-800 rounded-md' : ''}>
      <Link to={data.fields.permalink}>
        <div className="h-52 bg-gray-100 dark:bg-gray-800 rounded-t-md overflow-hidden relative">
          <img
            className="block w-full h-full object-cover rounded-t-md"
            src={data.frontmatter.cover}
            alt=""
          />
          <div className="absolute left-0 top-0 flex items-center justify-center w-full h-full rounded-t-md cursor-pointer opacity-0 hover:opacity-100 bg-gradient-to-r from-indigo-600/80 to-blue-600/80 hover:backdrop-blur transition-all">
            <div className="flex items-center text-white">
              <span className="mr-2">立即阅读</span>
              <span>
                <ArrowRight />
              </span>
            </div>
          </div>
        </div>
        <div className={`${card ? 'px-6' : 'px-2'} py-4`}>
          <h4 className="mb-3 py-1 text-xl truncate dark:text-gray-100">
            {data.frontmatter.title}
          </h4>
          <p
            className={`${
              clamp ? 'h-10 line-clamp-2' : ''
            } mt-2 mb-3 text-sm text-gray-500`}
          >
            {data.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <Author author={data.frontmatter.author} />
            <p className="text-sm text-gray-400">{data.frontmatter.date}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

PostCard.propTypes = {
  data: PropTypes.object.isRequired,
  clamp: PropTypes.bool,
  card: PropTypes.bool,
}

PostCard.defaultProps = {
  card: true,
  clamp: false,
}
