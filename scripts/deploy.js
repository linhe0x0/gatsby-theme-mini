const path = require('path')
const ghpages = require('gh-pages')
const config = require('config')
const chalk = require('chalk')

const token = process.env.GH_TOKEN
const date = new Date().toISOString()

const { github } = config.get('deploy')

let remoteURL = ''

if (token) {
  remoteURL = `https://${token}@github.com/${github.username}/${github.repo}.git`

  console.log(
    `${chalk.blue(
      'info'
    )} All files will be published to https://YOUR_TOKEN@github.com/${
      github.username
    }/${github.repo}.git`
  )
} else {
  remoteURL = `git@github.com:${github.username}/${github.repo}.git`

  console.log(
    `${chalk.blue('info')} All files will be published to git@github.com:${
      github.username
    }/${github.repo}.git`
  )
}

console.log(`${chalk.blue('info')} Branch: ${github.branch || 'gh-pages'}`)

console.log(chalk.cyan('uploading...'))

ghpages.publish(
  path.resolve(__dirname, '../public'),
  {
    branch: github.branch,
    repo: remoteURL,
    message: `:sparkles: Site updated at ${date}`,
    dotfiles: true,
  },
  (err) => {
    if (err) {
      console.error(err)

      process.exit(1)
    }

    console.log(`${chalk.green('success')} OK.`)
    console.log(
      `${chalk.green('success')} Open https://github.com/${github.username}/${
        github.repo
      } to get more details.`
    )
  }
)
