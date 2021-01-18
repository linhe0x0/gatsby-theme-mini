import React from 'react'
import PropTypes from 'prop-types'

let inlinedStyles = ''

if (process.env.NODE_ENV === 'production') {
  try {
    // eslint-disable-next-line import/no-unresolved,import/no-webpack-loader-syntax,global-require
    inlinedStyles = require('!raw-loader!../public/styles.css')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}

export default function HTML(props) {
  const {
    htmlAttributes,
    headComponents,
    preBodyComponents,
    body,
    bodyAttributes,
    postBodyComponents,
  } = props

  let css = ''

  if (process.env.NODE_ENV === 'production') {
    css = (
      <style
        id="gatsby-inlined-css"
        dangerouslySetInnerHTML={{ __html: inlinedStyles }}
      />
    )
  }

  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {headComponents}
        {css}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
        {postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}

HTML.defaultProps = {
  htmlAttributes: {},
  headComponents: [],
  bodyAttributes: {},
  preBodyComponents: [],
  body: '',
  postBodyComponents: [],
}
