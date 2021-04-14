import React from 'react'
import { Link } from 'gatsby'

export default function Tag(props) {
  const { children } = props

  return (
    <Link to={`/tags#tag-${children.toString()}`}>
      <span className="block px-2 py-1 rounded-md text-sm bg-yellow-100 text-yellow-700">
        {children}
      </span>
    </Link>
  )
}
