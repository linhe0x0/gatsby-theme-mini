import React from 'react'
import PropTypes from 'prop-types'

import Tag from '../Tag'

export default function TagList(props) {
  const { tags } = props

  return (
    <ul className="flex flex-wrap -mx-1">
      {tags.map((item) => (
        <li key={item} className="m-1">
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
