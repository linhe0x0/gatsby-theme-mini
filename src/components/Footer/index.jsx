import React from 'react'

const Footer = () => (
  <footer>
    <div className="bg-black px-4 py-16">
      <div className="container mx-auto text-gray-200">
        <h6 className="text-lg">内容许可</h6>
        <p className="py-2 text-sm">
          除特别说明外，本站所有内容均采用
          <a
            href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh"
            target="_blank"
            rel="noreferrer"
          >
            &nbsp;署名-非商业性使用-禁止演绎 4.0 国际 (CC BY-NC-ND 4.0)&nbsp;
          </a>
          进行许可。
        </p>
      </div>
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

export default Footer
