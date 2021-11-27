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
    logo: "/img/logo-64.png",
    author: {
      name: "柒月流火",
      link: "https://github.com/WilfredShen",
    },
  },
});
