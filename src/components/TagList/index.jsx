import React from 'react'
import PropTypes from 'prop-types'

import Tag from '../Tag'

export default function TagList(props) {
  const { tags } = props

  return (
    <ul className="flex space-x-2">
      {tags.map(item => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  )
}

TagList.propTypes = {
  tags: PropTypes.array,
}

TagList.defaultProps = {
  tags: [],
}
