import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import classnames from 'classnames'

import './Tag.css'

const Tag = props => {
  let children

  if (props.to) {
    children = (
      <Link className="tag__link" to={props.to}>
        {props.children}
      </Link>
    )
  } else {
    children = (
      <a className="tag__link" href="javascript:;">
        {props.children}
      </a>
    )
  }

  const tagClass = classnames({
    tag: true,
    'tag--full': props.full,
    'tag--white': props.theme === 'white',
    'tag--custom-color': props['custom-color'],
  })

  return (
    <div
      className={tagClass}
      style={{
        backgroundColor: props['custom-color'],
        borderColor: props['custom-color'],
      }}
    >
      {children}
    </div>
  )
}

Tag.propTypes = {
  to: PropTypes.string,
  children: PropTypes.string,
}

export default Tag
