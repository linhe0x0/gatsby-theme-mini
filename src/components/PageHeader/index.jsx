import React from 'react'
import PropTypes from 'prop-types'

export default function PageHeader(props) {
  const { title, description, cover, mini } = props

  return (
    <div className="header relative bg-gray-50">
      {cover ? (
        <div className="absolute left-0 top-0 w-full h-full">
          <img className="w-full h-full object-cover" src={cover} alt={cover} />
        </div>
      ) : null}
      <div
        className={`relative container mx-auto text-center text-gray-900 ${
          mini ? 'py-32' : 'py-56'
        }`}
      >
        <h1 className={`py-8 ${mini ? 'text-4xl' : 'text-6xl'}`}>{title}</h1>
        <h2 className={`font-normal ${mini ? 'text-xl' : 'text-3xl'}`}>
          {description}
        </h2>
      </div>
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  cover: PropTypes.string,
  mini: PropTypes.bool,
}

PageHeader.defaultProps = {
  title: '',
  description: '',
  cover: '',
  mini: false,
}
