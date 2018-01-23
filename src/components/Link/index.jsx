import React from 'react'
import GatsbyLink from 'gatsby-link'

const Link = props => {
  if (props.to) {
    return <GatsbyLink {...props}>{props.children}</GatsbyLink>
  }

  return (
    <a {...props} href="javascript:;">
      {props.children}
    </a>
  )
}

export default Link
