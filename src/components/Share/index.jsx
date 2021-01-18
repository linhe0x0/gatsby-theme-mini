import React from 'react'

export default class Share extends React.Component {
  addShareSupport() {
    const headElement = document.querySelector('head')
    const linkElement = document.createElement('link')

    linkElement.rel = 'stylesheet'
    linkElement.href =
      'https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/css/share.min.css'

    headElement.appendChild(linkElement)

    const scriptElement = document.createElement('script')

    scriptElement.src =
      'https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js'

    headElement.appendChild(scriptElement)
  }

  addHighlightSupport() {
    const headElement = document.querySelector('head')
    const linkElement = document.createElement('link')

    linkElement.rel = 'stylesheet'
    linkElement.href =
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.11.0/themes/prism-okaidia.min.css'

    headElement.appendChild(linkElement)
  }

  componentDidMount() {
    this.addHighlightSupport()
    this.addShareSupport()
  }

  render() {
    return <div className="social-share" data-disabled="diandian" />
  }
}
