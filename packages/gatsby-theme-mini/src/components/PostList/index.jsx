import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import PostCard from '../PostCard'

export default function PostList(props) {
  const { posts } = props
  const chunks = _.chunk(posts, 3)
  const columns = _.map(_.zip(...chunks), (item) => _.compact(item))

  return (
    <div className="flex flex-wrap">
      {columns.map((column, index) => (
        <div
          className="flex flex-col w-full md:w-1/2 lg:w-1/3 px-3 md:px-4 space-y-6 md:space-y-8"
          key={index}
        >
          {column.map((item) => (
            <PostCard key={item.id} data={item} />
          ))}
        </div>
      ))}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.array,
}

PostList.defaultProps = {
  posts: [],
}
