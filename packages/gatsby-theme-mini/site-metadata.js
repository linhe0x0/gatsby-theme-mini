process.env.SUPPRESS_NO_CONFIG_WARNING = true

const path = require('path')
const _ = require('lodash')
const config = require('config')

const cwd = process.cwd()

const userSiteMetadata = config.util.loadFileConfigs(
  path.resolve(cwd, 'config')
)

const defaultSiteMetadata = config.util.loadFileConfigs(
  path.resolve(__dirname, 'config')
)

module.exports = _.defaults(userSiteMetadata, defaultSiteMetadata)
