const { path } = require("@vuepress/utils");

module.exports = {
  lang: "zh-CN",
  title: "柒月流火's blog",
  description: "个人技术博客",
  theme: require.resolve("../../theme-ibank"),
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
};
