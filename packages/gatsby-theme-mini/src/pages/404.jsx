import React from 'react'
import { Link } from 'gatsby'

export default function NotFound() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        background: '#fff',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '960px',
          height: '360px',
          margin: 'auto',
          background: 'url(/404.svg) no-repeat center left',
        }}
      >
        <div
          style={{
            float: 'right',
            width: '40%',
            paddingTop: '60px',
          }}
        >
          <h2
            style={{
              fontSize: '72px',
              color: '#434e59',
            }}
          >
            404
          </h2>
          <p
            style={{
              marginBottom: '16px',
              color: '#00000073',
              fontSize: '20px',
              lineHeight: '28px',
            }}
          >
            抱歉，你访问的页面暂不存在
          </p>
          <div>
            <Link to="/">查看其它文章</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
