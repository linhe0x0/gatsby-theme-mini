import React from 'react'
import PropTypes from 'prop-types'
import { ArrowRight } from 'react-feather'
import { Link } from 'gatsby'

import Author from '../Author'

export default function PostCard(props) {
  const { data } = props

  return (
    <div className="w-80 mx-4">
      <Link to={data.fields.permalink}>
        <div className="h-52 mb-4 bg-gray-200 dark:bg-gray-800 rounded-md relative">
          <img
            className="block h-full object-cover"
            src={data.frontmatter.cover}
            alt=""
          />
          <div className="absolute left-0 top-0 flex items-center justify-center w-full h-full rounded-md cursor-pointer opacity-0 hover:opacity-100 bg-gradient-to-r from-indigo-600/80 to-blue-600/80 hover:backdrop-blur transition-all">
            <div className="flex items-center text-white">
              <span className="mr-2">立即阅读</span>
              <span>
                <ArrowRight />
              </span>
            </div>
          </div>
        </div>
        <h4 className="my-2 text-xl truncate">{data.frontmatter.title}</h4>
        <p className="h-10 2mt-2 mb-3 text-sm text-gray-500 line-clamp-2">
          {data.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <Author author={data.frontmatter.author} />
          <p className="text-sm text-gray-400">{data.frontmatter.date}</p>
        </div>
      </Link>
    </div>
  )
}

PostCard.propTypes = {
  data: PropTypes.object.isRequired,
}
