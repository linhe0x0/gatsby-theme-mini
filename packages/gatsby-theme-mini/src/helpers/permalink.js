import _ from 'lodash'

export function getPermalink(node) {
  const { date } = node.frontmatter
  const { slug } = node.fields

  const dateString = date ? `/${_.join(_.split(date, '-'), '/')}` : ''

  return `/articles${dateString}${slug}`
}
