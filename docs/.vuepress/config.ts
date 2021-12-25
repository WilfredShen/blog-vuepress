import { defineUserConfig } from "vuepress-vite";
import { IconType } from "vuepress-theme-ibank/types";
import type { ThemeConfig } from "vuepress-theme-ibank/types";

export default defineUserConfig<ThemeConfig>({
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
      img: "/img/avatar.png",
      name: "柒月流火",
      slogan: "slogan",
      icons: [
        {
          title: "邮箱",
          link: "mailto:blog@wilfredshen.cn",
          icon: IconType.email,
          desc: "发送邮件至：blog@wilfredshen.cn",
        },
        {
          title: "GitHub",
          link: "https://github.com/WilfredShen",
          icon: IconType.github,
        },
      ],
    },
  },
});
