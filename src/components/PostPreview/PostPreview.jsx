import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Link from '../Link'

import './PostPreview.css'

const PostPreview = props => {
  const postPreviewClass = classnames({
    post: true,
    [`post--${props.size}`]: props.size,
    'post--succinct': props.succinct,
  })

  return (
    <div className={postPreviewClass}>
      <Link className="post__link" to={props.path}>
        <h2 className="post__title">{props.title}</h2>
        <div className="post__content-preview">{props.excerpt}</div>
        <p className="post__meta">
          {props.author} · {props.date}
        </p>
      </Link>
    </div>
  )
}

PostPreview.propTypes = {
  size: PropTypes.string,
  succinct: PropTypes.bool,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  author: PropTypes.string,
  date: PropTypes.string,
  path: PropTypes.string.isRequired,
}

PostPreview.defaultProps = {
  size: '',
  succinct: false,
  author: '',
  date: '',
}

export default PostPreview
