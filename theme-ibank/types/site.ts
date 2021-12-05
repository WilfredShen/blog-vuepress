import type vt from "vuepress-vite";

export type SiteData = vt.SiteData & { themeConfig?: ThemeConfig };

/* eslint-disable no-unused-vars */
export enum IconType {
  email = "email",
  github = "github",
  gitee = "gitee",
  qq = "qq",
  wechat = "wechat",
  bilibili = "bilibili",
  facebook = "facebook",
  twitter = "twitter",
  youtube = "youtube",
}
/* eslint-enable */

export interface ThemeConfig {
  logo?: string;
  title?: string;
  index: boolean;
  categories: boolean;
  tags: boolean;
  archives: boolean;
  author?: {
    name: string;
    link: string;
  };
  avatar?: {
    img: string;
    name: string;
    slogan?: string;
    icons: {
      title: string;
      link: string;
      icon: IconType;
    }[];
  };
}
