import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Tags from '../Tag'

import './TagCloud.css'

const colorOpts = {
  start: '#bbe',
  end: '#0085a1',
}

const toRGB = function (code) {
  if (code.length === 4) {
    code = code.replace(/(\w)(\w)(\w)/gi, "\$1\$1\$2\$2\$3\$3")
  }

  const hex = /(\w{2})(\w{2})(\w{2})/.exec(code)

  return [parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)]
}

const toHex = function (arr) {
  return "#" + arr.map((i) => {
    let hex =  i.toString(16);

    hex = (hex.length === 1) ? '0' + hex : hex

    return hex
  }).join('')
}

const colorIncrement = function (range) {
  return toRGB(colorOpts.end).map((n, i) => (n - toRGB(colorOpts.start)[i])/range)
}

const tagColor = function(increment, weighting) {
  const rgb = toRGB(colorOpts.start).map((n, i) => {
    let ref = Math.round(n + (increment[i] * weighting))

    if (ref > 255) {
      ref = 255
    } else if (ref < 0) {
      ref = 0
    }

    return ref
  })

  return toHex(rgb)
}

const generateNumberArray = function (len) {
  const result = []
  let i = len

  while (i--) {
    result.push(len - i)
  }

  return result
}

const TagCloud = (props) => {
  const len = props.dataSource.length
  const arr = generateNumberArray(len)

  const Cloud = props.dataSource.map((item, index) => {
    const increment = colorIncrement(len)
    const random = Math.floor(Math.random() * arr.length)
    const weight = arr.splice(random, 1)
    const color = tagColor(increment, weight)

    return (
      <Tags
        key={`${item}-${index}`}
        custom-color={color}
        to={`/tags/#${item}`}
      >
        {item}
      </Tags>
    )
  })

  return (
    <div className="tagCloud">{ Cloud }</div>
  )
}

TagCloud.propTypes = {
}

export default TagCloud
