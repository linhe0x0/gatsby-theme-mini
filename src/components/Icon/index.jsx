import React from 'react'
import PropTypes from 'prop-types'

import arrowRightCircle from './icons/arrow-right-circle.svg'
import github from './icons/github.svg'
import twitter from './icons/twitter.svg'

const icons = {
  right: arrowRightCircle,
  github,
  twitter,
}

export default function Icon(props) {
  const { type } = props

  return (
    <img
      className="cursor-pointer transition duration-500 ease-in-out transform hover:scale-125"
      src={icons[type]}
      alt={type}
    />
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
}
