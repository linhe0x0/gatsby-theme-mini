import React from 'react'
import _ from 'lodash'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import TagList from '../components/TagList'

export const query = graphql`
  query TagQuery {
    allMarkdownRemark {
      nodes {
        id
        frontmatter {
          title
          tags
          date
        }
        excerpt
        fields {
          slug
          permalink
        }
      }
    }
  }
`

export default function TagPage(props) {
  const { data } = props
  const { nodes } = data.allMarkdownRemark

  const tags = _.uniq(
    _.flatMap(nodes, (item) => _.get(item, 'frontmatter.tags') || [])
  )
  const postGroups = _.groupBy(
    _.flatMap(nodes, (item) =>
      _.map(_.get(item, 'frontmatter.tags'), (tag) =>
        _.assign({}, item, {
          tag,
        })
      )
    ),
    'tag'
  )

  return (
    <Layout>
      <PageHeader title="Say Hi to All Tags" mini />
      <div className="dark:bg-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="relative z-10">
            <TagList tags={tags} />
          </div>
          <div className="my-4 flex flex-col space-y-4">
            {_.map(postGroups, (posts, tag) => (
              <div key={tag}>
                <div id={`tag-${tag}`} className="pt-16 -mt-16">
                  <div className="mt-6 mb-2">
                    <h2 className="text-xl text-indigo-600">
                      <Link to={`#tag-${tag}`}>{tag}</Link>
                    </h2>
                  </div>
                  <ul className="relative z-10 divide-y divide-gray-100 dark:divide-gray-900">
                    {posts.map((post) => (
                      <li
                        key={post.id}
                        className="py-5 pl-4 hover:bg-gray-100 dark:hover:bg-gray-900"
                      >
                        <Link to={post.fields.permalink}>
                          <h3 className="text-lg mb-2 dark:text-gray-400">
                            {post.frontmatter.title}
                          </h3>
                          <p className="text-sm truncate text-gray-500 dark:text-gray-600 hover:text-gray-800">
                            {post.excerpt}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
