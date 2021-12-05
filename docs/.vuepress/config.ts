import { defineUserConfig } from "vuepress-vite";
import type { DefaultThemeOptions } from "vuepress-vite";

export default defineUserConfig<DefaultThemeOptions>({
  lang: "zh-CN",
  title: "柒月流火's blog",
  description: "个人技术博客",
  // theme: "ibank",
  theme: require.resolve("../../theme-ibank"),
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    // index: true,       // 是否添加首页
    // categories: true,  // 是否添加分类页面
    // tags: true,        // 是否添加标签汇总页面
    // archives: true,    // 是否添加归档页面
    logo: "/img/logo-64.png",
    author: {
      name: "柒月流火",
      link: "https://github.com/WilfredShen",
    },
    avatar: {
      img: "/img/logo-160.png",
      name: "柒月流火",
      slogan: "666",
      icons: [
        {
          title: "邮箱",
          link: "mailto:blog@wilfredshen.cn",
          icon: "email",
        },
        {
          title: "GitHub",
          link: "https://github.com/WilfredShen",
          icon: "github",
        },
      ],
    },
  },
});
