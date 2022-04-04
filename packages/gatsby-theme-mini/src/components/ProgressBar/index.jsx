import React from 'react'
import PropTypes from 'prop-types'

export default function ProgressBar(props) {
  const { value } = props

  return (
    <div className="w-full h-1 bg-blue-100">
      <div style={{ width: `${value}%` }} className="h-full bg-blue-600" />
    </div>
  )
}

ProgressBar.propTypes = {
  value: PropTypes.number,
}

ProgressBar.defaultProps = {
  value: 0,
}
