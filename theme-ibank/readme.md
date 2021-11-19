[TOC]

## 主题配置

本主题遵循**“约定优于配置”**原则，遵循以下约定，你完全可以做到零配置使用本主题。

在`config.js`中支持的配置项：

```js
// config.js
const config = {
  title: "xxx's blog", // 博客名称，会出现在导航栏中
  themeConfig: {
    logo: "/img/logo.png", // required: false // 你的logo，如果选择不设置，则导航栏中不会有logo
    title: "title", // required: false // 覆盖config.title
    categories: false, // default: true // 是否生成目录索引
    tags: false, // default: true // 是否生成标签索引
    archives: false, // default: true // 是否生成时间索引
  }
}
module.exports = config;
```

### 目录约定

```
docs
├── 一级目录
│   ├── 二级文件
│   └── 二级目录
│       └── 三级文件
└── 一级文件
```

命`docs`为顶级目录，其下为一级文件/目录、二级文件/目录、三级文件/目录，以此类推，**不限层数**。

在导航栏中一级文件/目录会直接显示在其中，如果是一级目录，则会添加下拉框。下拉框中最多可以显示到三级，其中二级文件/目录之间有行线分隔，三级文件会列在对应的二级目录下方。

`readme.md`是描述其父目录的文件，即导航栏中文件名指向的链接即为其`frontmatter`中`permalink`的值，目录名指向的链接为其目录下`readme.md`文件中的`frontmatter.permalink`。

在没有文件指定其链接为`/`的情况下，`/`的路由会被重定向至`docs/readme.md`中指定的链接。如果`docs/readme.md`不存在或者其中没有指定链接，则访问`/`会提示`404`。

### 命名约定

目录以及Markdown文件分别需要遵循以下命名规范：

- 目录：`[order].[name]`。
- Markdown：`readme.md`或`[order].[name].[md]`，其中`readme`和后缀`md`不区分大小写。

文件和目录在导航栏处的排序均按照`order`的字典序进行升序排序，**建议使用相同位数的数字作为order**。

#### 排除的文件

有时你并不希望所有的文件都被加载，你可以借助以下的规则来排除文件：

- `.`开头的文件/目录会被vuepress的引擎忽略，不会被解析，你可以借此存放草稿等文件。例：
  - 创建一个目录`.draft`，并在目录下撰写草稿，发布时移动到合式的目录下就会被解析；
  - 创建一个目录`.recyclebin`，将废弃的文章移动到此处，避免下次发布时被解析。
- `_`开头的文件/目录会被本主题的格式化工具忽略，其下Markdown文件的frontmatter不会被格式化，也不会出现在导航栏和索引中，但它依旧会被引擎加载并渲染，因此你依旧可以直接输入其网址访问它。例：
  - 如果你有一些界面希望发布上去，但不希望任何人都能轻易访问它，你可以给它添加`_`前缀，这样只有知道这个网址的人才能够访问它
- `@`开头的文件/目录仅会被本主题的格式化工具忽略，依旧会被引擎加载并渲染成网页，并出现在导航栏和索引中；其`order`值会去除开头的`@`，有多个则只会去除第一个。例：
  - 本主题在`@pages`目录下存放导航栏中“索引”栏的界面，不过我设置其`frontmatter.navbar=false`（[点击查看详情](#frontmatter格式)），导航栏中的“索引”是我手动添加的
- `readme.md`不能添加`@`或`_`，否则不会被认为是`readme`文件

参考以下样例：

```
docs
├── 00.前端
│   ├── .排除测试1.md
│   ├── 12.测试e35c229e.md
│   ├── @08.排除测试2.md
│   ├── readme.md
│   ├── _14.排除测试3.md
│   └── @05.子目录2
│       ├── 01.测试.md
│       └── readme.md
└── README.md
```

在以上的目录结构中，如果你使用`dev`或`build`指令，你得到如下输出：

```
info Initializing VuePress and preparing data...
info 格式化frontmatter: [success]   /README.md
info 格式化frontmatter: [success]   /00.前端/12.测试e35c229e.md
info 格式化frontmatter: [excluded]  /00.前端/@08.排除测试2.md
info 格式化frontmatter: [success]   /00.前端/readme.md
info 格式化frontmatter: [excluded]  /00.前端/_14.排除测试3.md
info 格式化frontmatter: [excluded]  /00.前端/@05.子目录2/01.测试.md
info 格式化frontmatter: [excluded]  /00.前端/@05.子目录2/readme.md
```

你可以看到，在格式化工具的输出中，不存在“.排除测试1.md”文件，即该文件没有被引擎加载；而“@05.子目录2”目录下的文件和“@排除测试2.md”、“_排除测试3.md”文件的状态都是`[excluded]`，即没有被格式化。

## frontmatter

**本主题会自动对未排除的Markdown文件进行格式化，一般情况下不需要任何手动的配置**

### frontmatter格式

```yml
---
title: 测试d83cbf9d
permalink: /article/d83cbf9d
date: '2021-11-17 19:15:29'
type: article
navbar: true
categories:
  - 前端
  - 前端文章
tags:
  - math
  - JavaScript
author:
  name: 柒月流火
  link: 'https://github.com/WilfredShen'
---
```

### 自动生成

| key          | 生成规则                                                     |
| ------------ | ------------------------------------------------------------ |
| `title`      | `[order].[name].[md]`中的`name`，若为`readme.md`，则取父目录的`name` |
| `permalink`  | `/article/[hash]`：`hash`根据文件内容生成                    |
| `date`       | 格式化时间                                                   |
| `type`       | `article`                                                    |
| `categories` | 所有父目录的`name`，依次排列                                 |
| `author`     | `themeConfig`中指定                                          |

### 手动添加

| key      | 数据规范                                                     |
| -------- | ------------------------------------------------------------ |
| `tags`   | `Array`                                                      |
| `navbar` | `Boolean`：默认为`true`，设置为`false`时不会被添加到导航栏中 |

