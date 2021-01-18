# little

[在线演示](http://blog.sqrtthree.com/)

> 一个基于 Gatsby 的博客主题。

## 起步

安装 little 非常容易。然而，在安装之前你需要先具备以下环境：

- [Node.js](https://nodejs.org/en/)
- [yarn](http://yarnpkg.com/)

```shell
git clone https://github.com/sqrthree/little.git myblog
cd myblog
yarn install // or `npm install`
```

初始化之后，你的项目文件夹如下：

```
myblog
├── LICENSE
├── README.md
├── bin
├── config
│   └── default.yaml
├── contents
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

### 你需要关心的文件夹

- config: [网站配置文件夹](#configuration)，你可以在这里设置所有的个性化配置信息。
- posts: 你创建文章的地方。

## Scripts

### `yarn run start` / `npm start`

启动一个具备热重载功能的开发环境，并监听 localhost:8000。

如果你创建或编辑了一篇文章，页面将会自动刷新。

### `yarn run build` / `npm run build`

构建一个压缩后的生产版本到 `public` 文件夹中，生产的文件包含所有的静态 HTML 和一些必要的 JS 文件。

### `yarn run serve` / `npm run serve`

启动一个本地服务器用来进行本地测试和预览。

### `yarn run deploy` / `npm run deploy`

发布 `public` 目录中所有的文件到 GitHub 上的指定的『gh-pages』分支。

## 配置

你可以修改 [config/default.yaml](https://github.com/sqrthree/little/blob/master/config/default.yaml) 文件来进行个性化配置。

一个更好的方案是在 `config` 中创建一个名为 `production.yaml` 文件。`production.yaml` 中的配置将会覆盖默认配置。

`production.yaml` 旨在不会被版本控制系统追踪修改。

有关更多的个性化配置信息请查看 [config/default.yaml](https://github.com/sqrthree/little/blob/master/config/default.yaml)。

## 开发

### 构建于

- React
- GraphQL
- Node.js

### 前提

- [Node.js](https://nodejs.org/en/)
- [yarn](http://yarnpkg.com/)
- [Gatsby](https://www.gatsbyjs.org/)

### 设置开发环境

```shell
git clone https://github.com/sqrthree/little.git
cd little
yarn install
yarn run start
```

## LICENSE

该项目基于 MIT License 发布。
