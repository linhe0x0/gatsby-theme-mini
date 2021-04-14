# gatsby-theme-mini

> A clean and delicate theme for blog based on Gatsby.

- [中文介绍](README-zh.md)
- [Live demo](https://blog.sqrtthree.com/)

## Getting started

Installing `gatsby-theme-mini` is quite easy. However, you do need to have a couple of other things installed first:

- [Node.js](https://nodejs.org/en/)
- [yarn](http://yarnpkg.com/) (If you prefer yarn instead of npm)

#### 1. Install `gatsby-theme-mini`

```bash
npm install gatsby-theme-mini
```

#### 2. Enable the theme in your `gatsby-config.js` file

```js
module.exports = {
  plugins: ['gatsby-theme-mini'],
}
```

#### 3. Configure your info

```bash
mkdir config && touch config/default.yaml
```

Once initialised, here’s what your project folder will look like:

```
├── config
│   └── default.yaml
├── gatsby-config.js
├── package.json
└── posts
    └── hello-world
        └── index.mdd
```

### All the folders you need to care about

- config: [Site configuration folder](#configuration), You can configure most settings here.
- posts: Posts folder, Where you create a new post.

## Configuration

You can modify site settings in [config/default.yaml](https://github.com/sqrthree/gatsby-theme-mini/blob/master/packages/gatsby-theme-mini/config/default.yaml).

To [config/default.yaml](https://github.com/sqrthree/gatsby-theme-mini/blob/master/packages/gatsby-theme-mini/config/default.yaml) to get more details.

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
git clone https://github.com/sqrthree/gatsby-theme-mini.git

cd gatsby-theme-mini
yarn install

cd packages/demo
yarn run dev
```

## LICENSE

This project is licensed under the MIT License.

---

> [sqrtthree.com](http://sqrtthree.com/) &nbsp;&middot;&nbsp;
> GitHub [@sqrthree](https://github.com/sqrthree) &nbsp;&middot;&nbsp;
> Twitter [@sqrtthree](https://twitter.com/sqrtthree)
