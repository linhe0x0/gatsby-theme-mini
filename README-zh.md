# gatsby-theme-mini

- [在线演示](http://blog.sqrtthree.com/)

> 一个基于 Gatsby 的博客主题。

## 起步

安装 `gatsby-theme-mini` 非常容易。然而，在安装之前你需要先具备以下环境：

- [Node.js](https://nodejs.org/en/)
- [yarn](http://yarnpkg.com/)

#### 1. 安装 `gatsby-theme-mini`

```bash
npm install gatsby-theme-mini
```

#### 2. 在 `gatsby-config.js` 文件中启用

```js
module.exports = {
  plugins: ['gatsby-theme-mini'],
}
```

#### 3. 配置信息

```bash
mkdir config && touch config/default.yaml
```

初始化之后，你的项目文件夹如下：

```
├── config
│   └── default.yaml
├── gatsby-config.js
├── package.json
└── posts
    └── hello-world
        └── index.mdd
```

### 你需要关心的文件夹

- config: [网站配置文件夹](#配置)，你可以在这里设置所有的个性化配置信息。
- posts: 你创建文章的地方。

## 配置

你可以修改 [config/default.yaml](./packages/gatsby-theme-mini/config/default.yaml) 文件来进行个性化配置。

有关更多的个性化配置信息请查看 [config/default.yaml](./packages/gatsby-theme-mini/config/default.yaml)。

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
git clone https://github.com/sqrthree/gatsby-theme-mini.git

cd gatsby-theme-mini
yarn install

cd packages/demo
yarn run dev
```

## LICENSE

该项目基于 MIT License 发布。

---

> [sqrtthree.com](http://sqrtthree.com/) &nbsp;&middot;&nbsp;
> GitHub [@sqrthree](https://github.com/sqrthree) &nbsp;&middot;&nbsp;
> Twitter [@sqrtthree](https://twitter.com/sqrtthree)
