/* eslint-disable */
import type vt from "vuepress-vite";
export {};

declare global {
  type Entry<T = any> = [string, T];
  type SiteData = vt.SiteData & { themeConfig?: ThemeConfig };
  interface FrontMatter extends vt.PageFrontmatter {
    title: string;
    permalink: string;
    date: string | Date;
    type: string;
    categories?: string[];
    tags?: string[];
    author?: {
      name: string;
      link?: string;
    };
  }

  interface PageNodeData extends vt.PageData {
    order?: string;
    count?: number;
    frontmatter: FrontMatter;
  }

  interface PageNode extends vt.Page {
    order: string[];
    data: PageNodeData;
    $data: PageNodeData;
    $children?: Record<string, PageNode>;
  }

  interface ThemeConfig {
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

  interface PaginationItem {
    text: string;
    pageIndex: number;
  }

  type ArchiveDay = PageNode[];

  interface ArchiveMonth {
    [day: string]: ArchiveDay;
  }

  interface ArchiveYear {
    [month: string]: ArchiveMonth;
  }

  interface Archive {
    [year: string]: ArchiveYear;
  }

  type Tag = Entry<PageNode[]>;

  interface Tags {
    [key: string]: PageNode[];
    $all: PageNode[];
  }

  interface LinkRaw {
    text: string;
    link?: string;
    children?: LinkRaw[];
  }

  interface NavLink extends LinkRaw {
    $data: PageNodeData;
    $children?: Record<string, PageNode>;
  }
}
