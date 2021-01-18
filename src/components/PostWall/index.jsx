import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import _ from 'lodash'

import Icon from '../Icon'
import { getPermalink } from '../../helpers/permalink'

export default function PostWall(props) {
  const { posts } = props
  const first = _.first(posts)
  const others = _.tail(posts)

  return (
    <div className="container mx-auto p-20">
      <div className="flex">
        <div className="flex-none w-2/3">
          {first ? (
            <Link className="block relative" to={getPermalink(first)}>
              <figure className="mr-10 transform rotate-1">
                <div className="h-96 bg-gray-100 rounded-md overflow-hidden">
                  {first.frontmatter.cover ? (
                    <img
                      className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-110"
                      src={first.frontmatter.cover}
                      alt=""
                    />
                  ) : null}
                </div>
                <div className="relative flex-auto py-4 mx-4">
                  <figcaption className="text-sm">
                    <p className="text-gray-600 text-right">
                      {first.frontmatter.date}
                    </p>
                  </figcaption>
                  <h3 className="my-2 text-2xl">{first.frontmatter.title}</h3>
                  <p className="h-28 overflow-hidden mt-2 text-base text-gray-800">
                    {first.excerpt}
                  </p>
                  <div className="absolute bottom-4 right-0">
                    <Icon type="right" />
                  </div>
                </div>
              </figure>
            </Link>
          ) : null}
        </div>
        <div className="flex-none w-1/3 flex flex-col space-y-10">
          {others.map(item => (
            <Link key={item.id} to={getPermalink(item)}>
              <figure className="relative">
                <div className="absolute w-full h-full rounded-md transform -rotate-1 bg-gradient-to-br from-blue-50 to-blue-200 "></div>
                <div className="absolute w-full h-full rounded-md bg-gradient-to-r from-blue-50 to-white"></div>
                <div className="flex h-42">
                  <div className="relative flex-auto py-4 mx-6">
                    <h3 className="my-1 text-xl max-h-28 overflow-hidden">
                      {item.frontmatter.title}
                    </h3>
                    <div className="absolute bottom-4 left-0">
                      <span className="text-sm text-gray-600">
                        {item.frontmatter.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex-none	w-32 h-44 bg-gray-100 rounded-r-md overflow-hidden">
                    {item.frontmatter.cover ? (
                      <img
                        className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-110"
                        src={item.frontmatter.cover}
                        alt=""
                      />
                    ) : null}
                  </div>
                </div>
              </figure>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

PostWall.propTypes = {
  posts: PropTypes.array,
}

PostWall.defaultProps = {
  posts: [],
}
