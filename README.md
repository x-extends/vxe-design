# vxe-design

简体中文 | [繁體中文](README.zh-TW.md) | [English](README.en.md) | [日本語](README.ja-JP.md)  

[![github star](https://img.shields.io/github/stars/x-extends/vxe-design.svg)](https://github.com/x-extends/vxe-design/stargazers)
[![gitee star](https://gitee.com/x-extends/vxe-design/badge/star.svg)](https://gitee.com/x-extends/vxe-design/stargazers)
[![gitcode star](https://gitcode.com/x-extends/vxe-design/star/badge.svg)](https://gitcode.com/x-extends/vxe-design/stargazers)
[![npm version](https://img.shields.io/npm/v/vxe-design.svg?style=flat-square)](https://www.npmjs.com/package/vxe-design)
[![NodeJS with Webpack](https://github.com/x-extends/vxe-design/actions/workflows/webpack.yml/badge.svg)](https://github.com/x-extends/vxe-design/actions/workflows/webpack.yml)
[![gzip size: JS](http://img.badgesize.io/https://unpkg.com/vxe-design/lib/index.umd.min.js?compression=gzip&label=gzip%20size:%20JS)](https://unpkg.com/vxe-design/lib/index.umd.min.js)
[![npm downloads](https://img.shields.io/npm/dt/vxe-design.svg?style=flat-square)](https://npm-stat.com/charts.html?package=vxe-design)
[![issues](https://img.shields.io/github/issues/x-extends/vxe-design.svg)](https://github.com/x-extends/vxe-design/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/vxe-design.svg)](https://github.com/x-extends/vxe-design/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/vxe-design.svg)](https://github.com/x-extends/vxe-design/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/vxe-design.svg)](https://github.com/x-extends/vxe-design/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

一个基于 [Vxe UI](https://github.com/x-extends/vxe-pc-ui) 的 PC 端可视化设计器，用于搭建零代码、低代码的平台

* 设计理念
  * 面向现代浏览器，高效的简洁 API 设计
  * 按需加载

* 版本说明
  * **V4**
    * [x] v4.0 实现表单设计器、列表设计器
  * **V3**
    * [x] v3.0 重构中
  * **V2**
    * [x] ~~v2.0 基于 vue2.6+，停止维护~~
  * **V1**
    * [x] ~~v1.0 基于 vue2.6+，停止维护~~
* 版本计划
  * [ ] 计划功能：工作流设计器
  * [ ] 计划功能：打印设计器

## 浏览器支持

![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
80+ ✔ | 80+ ✔ | 90+ ✔ | 75+ ✔ | 10+ ✔ |

## 在线文档

👉 [基础库](https://vxeui.com)  
👉 [表格库](https://vxetable.cn)  
👉 [甘特图](https://gantt.vxeui.com)  
👉 [可视化](https://design.vxeui.com)  

## QQ 交流群

该群供大家交流問題，如果群人数已满，将会不定期剔除不活跃的。  

![qq](https://vxeui.com/resource/donation/qq1.png)
![qq](https://vxeui.com/resource/donation/qq2.png)

## 功能点

[👀 Vxe Design](https://vxeui.com)  

* [ ] flow-design 工作流设计器
* [ ] flow-view 工作流设计器-视图渲染
* [x] form-design 表单设计器
* [x] form-view 表单设计器-视图渲染
* [x] list-design 列表设计器
* [x] list-view 列表设计器-视图渲染

## 安装

版本：[vue](https://www.npmjs.com/package/vue) 3.x

```shell
npm install vxe-pc-ui vxe-table vxe-design
```

### NPM

```javascript
// ...
import VxeUIBase from 'vxe-pc-ui'
import 'vxe-pc-ui/es/style.css'

import VxeUITable from 'vxe-table'
import 'vxe-table/es/style.css'

import VxeUIDesign from 'vxe-design'
import 'vxe-design/lib/style.css'
// ...

createApp(App).use(VxeUIBase).use(VxeUITable).use(VxeUIDesign).mount('#app')
```

## 运行项目

安装依赖

```shell
npm run update
```

启动本地调试

```shell
npm run serve
```

编译打包，生成编译后的目录：es,lib

```shell
npm run lib
```

## 示例

```html
<template>
  <div>
    <vxe-form-design :widgets="formDesignWidgets" :height="800" />
  </div>
</template>

<script>
export default {
  data() {
    const formDesignWidgets = [
      {
        group: 'base',
        children: [
          'VxeInput',
          'VxeTextarea',
          'VxeSelect',
          'VxeSwitch',
          'VxeRadioGroup',
          'VxeCheckboxGroup'
        ]
      }
    ]
    return {
      formDesignWidgets
    }
  }
}
</script>
```

## 贡献源码步骤

1. 如果是修复 bug，必须有示例的复现链接
2. 如果新功能，涉及代码风格、质量、还需有对应的示例页面

## 贡献者

Thank you to everyone who contributed to this project.

[![vxe-design](https://contrib.rocks/image?repo=x-extends/vxe-design)](https://github.com/x-extends/vxe-design/graphs/contributors)

## 许可证

[MIT](LICENSE) © 2019-present, Xu Liangzhan
