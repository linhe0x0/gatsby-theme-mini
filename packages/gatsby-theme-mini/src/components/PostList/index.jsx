import React from 'react'
import PropTypes from 'prop-types'

import PostCard from '../PostCard'
import { getPermalink } from '../../helpers/permalink'

export default function PostList(props) {
  const { posts } = props

  return (
    <div className="flex flex-col space-y-10">
      {posts.map((item) => (
        <PostCard
          key={item.id}
          id={item.id}
          title={item.frontmatter.title}
          tags={item.frontmatter.tags || []}
          cover={item.frontmatter.cover}
          date={item.frontmatter.date}
          excerpt={item.excerpt}
          path={getPermalink(item)}
        />
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
