import type vt from "vuepress-vite";

export type SiteData = vt.SiteData & { themeConfig?: ThemeConfig };

export interface ThemeConfig {
  logo: string;
  title: string;
  categories: boolean;
  tags: boolean;
  archives: boolean;
  author: {
    name: string;
    link: string;
  };
}
