# vxe-design

[简体中文](README.md) | [繁體中文](README.zh-TW.md) | [English](README.en.md) | 日本語  

[![star](https://gitee.com/x-extends/vxe-design/badge/star.svg?theme=gvp)](https://gitee.com/x-extends/vxe-design/stargazers)
[![npm version](https://img.shields.io/npm/v/vxe-design.svg?style=flat-square)](https://www.npmjs.com/package/vxe-design)
[![NodeJS with Webpack](https://github.com/x-extends/vxe-design/actions/workflows/webpack.yml/badge.svg)](https://github.com/x-extends/vxe-design/actions/workflows/webpack.yml)
[![npm downloads](https://img.shields.io/npm/dt/vxe-design.svg?style=flat-square)](https://npm-stat.com/charts.html?package=vxe-design)
[![issues](https://img.shields.io/github/issues/x-extends/vxe-design.svg)](https://github.com/x-extends/vxe-design/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/vxe-design.svg)](https://github.com/x-extends/vxe-design/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/vxe-design.svg)](https://github.com/x-extends/vxe-design/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/vxe-design.svg)](https://github.com/x-extends/vxe-design/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

[vue](https://www.npmjs.com/package/vue)ベースのPCコンポーネントライブラリ。

## ブラウザサポート

![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
80+ ✔ | 80+ ✔ | 90+ ✔ | 75+ ✔ | 10+ ✔ |

## オンラインドキュメント

👉 [UIドキュメント](https://vxeui.com)  
👉 [テーブルドキュメント](https://vxetable.cn)  

## インストール

版本：[vue](https://www.npmjs.com/package/vue) 3.x

```shell
npm install vxe-pc-ui vxe-table vxe-design
```

### NPM

```javascript
// ...
import VxeUIAll from 'vxe-pc-ui'
import 'vxe-pc-ui/es/style.css'

import VxeUITable from 'vxe-table'
import 'vxe-table/es/style.css'

import VxeUIDesign from 'vxe-design'
import 'vxe-design/lib/style.css'
// ...

createApp(App).use(VxeUIAll).use(VxeUITable).use(VxeUIDesign).mount('#app')
```

## プロジェクトの実行

依存関係をインストールする

```shell
npm install
```

ローカルデバッグを開始する

```shell
npm run serve
```

コンパイルパッケージング、生成されたコンパイルディレクトリ: es,lib

```shell
npm run lib
```

## ライセンス

[MIT](LICENSE) © 2019-present, Xu Liangzhan
