import React from 'react'
import PropTypes from 'prop-types'
let inlinedStyles = ''

if (process.env.NODE_ENV === 'production') {
  try {
    inlinedStyles = require('!raw-loader!../public/styles.css')
  } catch (e) {
    console.error(e)
  }
}

export default function HTML(props) {
  const {
    htmlAttributes,
    headComponents,
    preBodyComponents,
    body,
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
      <body {...props.bodyAttributes}>
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
