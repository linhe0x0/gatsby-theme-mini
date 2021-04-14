import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { ArrowRightCircle } from 'react-feather'
import _ from 'lodash'

import { getPermalink } from '../../helpers/permalink'

export default function PostWall(props) {
  const { posts } = props
  const first = _.first(posts)
  const others = _.tail(posts)

  return (
    <div className="dark:bg-gray-900">
      <div className="container mx-auto px-6 py-6 md:py-20">
        <div className="lg:flex">
          <div className="flex-none mb-4 lg:mb-0 lg:w-2/3">
            {first ? (
              <Link className="block relative" to={getPermalink(first)}>
                <figure className="lg:mr-10 lg:transform lg:rotate-1">
                  <div className="h-48 md:h-96 bg-gray-100 dark:bg-gray-800 rounded-t-md overflow-hidden">
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
                      <p className="text-gray-600 dark:text-gray-500 text-right">
                        {first.frontmatter.date}
                      </p>
                    </figcaption>
                    <h3 className="my-2 text-2xl dark:text-gray-100">
                      {first.frontmatter.title}
                    </h3>
                    <p className="h-12 md:h-12 overflow-hidden mt-2 mb-12 text-base text-gray-600 dark:text-gray-300">
                      {first.excerpt}
                      {first.excerpt}
                      {first.excerpt}
                      {first.excerpt}
                    </p>
                    <div className="absolute bottom-4 right-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                      <ArrowRightCircle />
                    </div>
                  </div>
                </figure>
              </Link>
            ) : null}
          </div>
          <div className="flex-none lg:w-1/3 flex flex-col space-y-10">
            {others.map((item) => (
              <Link key={item.id} to={getPermalink(item)}>
                <figure className="relative">
                  <div className="absolute w-full h-full rounded-md transform -rotate-1 bg-gradient-to-br from-gray-100 dark:from-gray-800 to-yellow-200 dark:to-yellow-400" />
                  <div className="absolute w-full h-full rounded-md bg-gray-50 dark:bg-gray-800" />
                  <div className="flex h-40">
                    <div className="relative flex-auto py-4 mx-6">
                      <h3 className="my-2 text-xl max-h-28 overflow-hidden dark:text-gray-100">
                        {item.frontmatter.title}
                      </h3>
                      <div className="absolute bottom-4 left-0">
                        <span className="text-sm text-gray-600 dark:text-gray-500">
                          {item.frontmatter.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex-none	w-32 h-full bg-gray-100 dark:bg-gray-800 rounded-r-md overflow-hidden">
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
    </div>
  )
}

PostWall.propTypes = {
  posts: PropTypes.array,
}

PostWall.defaultProps = {
  posts: [],
}
