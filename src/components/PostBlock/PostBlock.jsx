import React from 'react'
import GatsbyLink from 'gatsby-link'
import PostPreview from '../PostPreview'

import './PostBlock.css'

const PostBlock = ({ title, edges }) => {
  const Posts = []

  edges.forEach((item, index) => {
    Posts.push(
      <PostPreview
        key={`${item}-${index}`}
        title={item.node.frontmatter.title}
        date={item.node.frontmatter.date}
        excerpt={item.node.excerpt}
        path={`/articles${item.node.fields.slug}`}
        size="small"
        succinct
      />
    )
  })

  return (
    <div id={title} className="post-block">
      <div className="post-block__heading">
        <span className="fa fa-tag post-block__listing-seperator"><span className="post-block__title">{title}</span></span>
      </div>
      <div className="post-block__body">
        {Posts}
      </div>
    </div>
  )
}

export default PostBlock
