import React from 'react'
import PropTypes from 'prop-types'

import './Footer.css'

const Footer = ({ friends, externalItemOfFooter, contact }) => (
  <footer className="footer">
    <div className="container">
      <div>
        <ul className="row">
          <li className="col-md-3">
            <h2>友情链接</h2>
            {
              friends.map((item, index) => (
                <div key={`${item}-${index}`}><a href={item.to} target="_blank">{item.name}</a></div>
              ))
            }
          </li>
          <li className="col-md-3">
            <h2>{externalItemOfFooter.title}</h2>
            {
              externalItemOfFooter.list.map((item, index) => (
                <div key={`${item}-${index}`}><a href={item.to} target="_blank">{item.name}</a></div>
              ))
            }
          </li>
          <li className="col-md-3">
            <h2>联系方式</h2>
            {
              contact.map((item, index) => (
                <div key={`${item}-${index}`}><a href="javascript:;">{item.name}</a> - {item.value}</div>
              ))
            }
          </li>
          <li className="col-md-3">
            <h2>内容许可</h2>
            <div>除特别说明外，本站所有内容均采用 <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh" target="_blank">署名-非商业性使用-禁止演绎 4.0 国际 (CC BY-NC-ND 4.0)</a> 进行许可。</div>
          </li>
        </ul>
      </div>
      <p className="text-md-right">
        <strong>©2018 <a href="https://github.com/sqrthree" target="_blank">根号三 </a></strong>
        <strong>Theme by <a href="http://huangxuan.me/" target="_blank">Hux </a></strong>
        <strong>Power by <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a></strong>
      </p>
    </div>
  </footer>
)

Footer.propTypes = {
  friends: PropTypes.array.isRequired,
  contact: PropTypes.array.isRequired,
  externalItemOfFooter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
  }).isRequired,
}

export default Footer
