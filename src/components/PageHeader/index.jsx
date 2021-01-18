import React from 'react'
import PropTypes from 'prop-types'

export default function PageHeader(props) {
  const { title, description, cover } = props

  return (
    <div className="header relative bg-gray-50">
      {cover ? (
        <div className="absolute left-0 top-0 w-full h-full">
          <img className="w-full h-full object-cover" src={cover} alt={cover} />
        </div>
      ) : null}
      <div className="relative container mx-auto py-56 text-center text-gray-900">
        <h1 className="text-6xl py-8">{title}</h1>
        <h2 className="text-3xl font-normal">{description}</h2>
      </div>
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  cover: PropTypes.string,
}

PageHeader.defaultProps = {
  title: '',
  description: '',
  cover: '',
}
