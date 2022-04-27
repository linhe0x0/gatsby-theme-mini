import React from 'react'
import PropTypes from 'prop-types'

const Footer = (props) => {
  const { copyright } = props

  return (
    <footer className="relative">
      <div className="bg-black px-4 py-16">
        {copyright.name ? (
          <div className="container mx-auto text-gray-200">
            <h6 className="text-lg">内容许可</h6>
            <p className="py-2 text-sm">
              除特别说明外，本站所有内容均采用
              <a href={copyright.link} target="_blank" rel="noreferrer">
                &nbsp;{copyright.name}&nbsp;
              </a>
              进行许可。
            </p>
          </div>
        ) : null}
      </div>
      <div className="bg-gray-900 px-4 py-3 text-xs text-right">
        <p className="container mx-auto text-gray-300">
          <strong className="font-normal">
            <a
              href="https://github.com/sqrthree"
              target="_blank"
              rel="noreferrer"
            >
              @根号三&nbsp;
            </a>
          </strong>
          <strong className="font-normal">
            Power by
            <a href="https://www.gatsbyjs.org" target="_blank" rel="noreferrer">
              &nbsp;Gatsby
            </a>
          </strong>
        </p>
      </div>
    </footer>
  )
}

Footer.propType = {
  copyright: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
  }),
}

Footer.defaultProps = {
  copyright: {
    name: '',
    link: '',
  },
}

export default Footer
