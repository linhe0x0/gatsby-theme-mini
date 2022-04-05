import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

export default function Anchor(props) {
  const { children, offsetTop } = props

  const container = useRef(null)
  const [offsetWidth, setOffsetWidth] = useState(0)
  const [offsetLeft, setOffsetLeft] = useState(0)
  const [isPinned, setIsPinned] = useState(false)

  useEffect(() => {
    const maxTop = container.current.offsetTop

    setOffsetLeft(container.current.offsetLeft)
    setOffsetWidth(container.current.offsetWidth)

    const handleScroll = () => {
      const { scrollTop } = document.documentElement

      if (maxTop - scrollTop <= offsetTop) {
        setIsPinned(true)
      } else {
        setIsPinned(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setOffsetLeft(container.current.parentNode.offsetLeft)
      setOffsetWidth(container.current.parentNode.offsetWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      ref={container}
      style={{
        position: isPinned ? 'fixed' : 'static',
        left: `${offsetLeft}px`,
        top: `${offsetTop}px`,
        width: isPinned ? `${offsetWidth}px` : '',
      }}
    >
      {children}
    </div>
  )
}

Anchor.propTypes = {
  children: PropTypes.node.isRequired,
  offsetTop: PropTypes.number,
}

Anchor.defaultProps = {
  offsetTop: 0,
}
