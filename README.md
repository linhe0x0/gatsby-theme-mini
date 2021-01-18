# little

> A clean and delicate theme for blog based on Gatsby.

- [中文介绍](./posts/hello-world.md)
- [Live demo](https://blog.sqrtthree.com/)

## Getting started

Installing little is quite easy. However, you do need to have a couple of other things installed first:

- [Node.js](https://nodejs.org/en/)
- [yarn](http://yarnpkg.com/) (If you prefer yarn instead of npm)

```shell
git clone https://github.com/sqrthree/little.git myblog
cd myblog
yarn install // or `npm install`
```

Once initialised, here’s what your project folder will look like:

```
myblog
├── LICENSE
├── README.md
├── bin
├── config
│   └── default.yaml
├── posts
│   └── hello-world.md
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── index.js
├── package.json
├── src
├── static
│   ├── CNAME
│   ├── README.md
│   ├── favicon.ico
│   └── robots.txt
└── yarn.lock
```

### All the folders you need to care about

- config: [Site configuration folder](#configuration), You can configure most settings here.
- posts: Posts folder, Where you create a new post.

## Scripts

### `yarn run start` / `npm start`

Start a hot-reloading development environment accessible at localhost:8000.

The page will automatically reload if you make changes to the post in `posts`.

You can get the build errors and lint warnings in the console.

### `yarn run build` / `npm run build`

Perform an optimized production build to the `public` folder for your site generating static HTML and per-route JavaScript code bundles.

### `yarn run serve` / `npm run serve`

Start a local HTML server for testing your built site.

### `yarn run deploy` / `npm run deploy`

Publish your all files in `public` to a gh-pages branch on GitHub.

## Configuration

You can modify site settings in [config/default.yaml](./config/default.yaml).

A better solution is to create a local configuration file, `production.yaml`, in `config` folder. All configuration parameters from `production.yaml` will overwrite `default.yaml`.

`production.yaml` is intended to not be tracked in your version control system.

To [config/default.yaml](https://github.com/sqrthree/little/blob/master/config/default.yaml) to get more details.

## Developing

### Built With

- React
- GraphQL
- Node.js

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [yarn](http://yarnpkg.com/)
- [Gatsby](https://www.gatsbyjs.org/)

### Setting up Dev

```shell
git clone https://github.com/sqrthree/little.git
cd little
yarn install
yarn run start
```

## LICENSE

This project is licensed under the MIT License.

---

> [sqrtthree.com](http://sqrtthree.com/) &nbsp;&middot;&nbsp;
> GitHub [@sqrthree](https://github.com/sqrthree) &nbsp;&middot;&nbsp;
> Twitter [@sqrtthree](https://twitter.com/sqrtthree)
