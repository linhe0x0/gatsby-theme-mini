import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import Tag from '../Tag'

import './Sidebar.css'

const Section = (props) => (
  <section className="section">
    <h5 className="section__title">
      <Link to={props.to || ''}>{props.title}</Link>
    </h5>
    <div className="section__body">
      {props.children}
    </div>
  </section>
)

const Sidebar = ({ featuredTags, userInformation, snsLink, friends }) => (
  <div>
    <Section
      title="FEATURED TAGS"
      to="/tags"
    >
      <div className="featured-tags">
        {
          featuredTags.map((item, index) => (
            <Tag key={`${item}-${index}`} to={`/tags#${item}`}>{item}</Tag>
          ))
        }
      </div>
    </Section>
    <Section
      title="ABOUT ME"
      to="/about"
    >
      <div className="short-about">
        <Link to="/about"><img className="short-about__avatar rounded" src={userInformation.avatar} /></Link>
        <p className="short-about__intro">{userInformation.bio}</p>
        <ul className="styles.sns list-inline">
          {
            snsLink.map((item, index) => (
              <li key={`${item}-${index}`} className="list-inline-item">
                <a className="sns__link" target="_blank" href={item.to}>
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x"></i>
                    {
                      item.icon
                        ? (<i className={`fa fa-${item.icon} fa-stack-1x fa-inverse`}></i>)
                        : (<i className="fa fa-stack-1x fa-inverse">{item.text}</i>)
                    }
                  </span>
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </Section>
    <Section title="FRIENDS">
      <ul className="friend-links list-inline">
        {
          friends.map((item, index) => (
            <li key={`${item}-${index}`} className="list-inline-item"><a className="friend-links__link" href={item.to} target="_blank">{item.name}</a></li>
          ))
        }
      </ul>
    </Section>
  </div>
)

Sidebar.propTypes = {
  featuredTags: PropTypes.array.isRequired,
  userInformation: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  snsLink: PropTypes.array.isRequired,
  friends: PropTypes.array.isRequired,
}

export default Sidebar
