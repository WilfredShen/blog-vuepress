import type vt from "vuepress-vite";

/* eslint-disable no-unused-vars */
export enum PageType {
  index = "index",
  article = "article",
  readme = "readme",
  archives = "archives",
  categories = "categories",
  tags = "tags",
  other = "other",
}
/* eslint-enable */

export interface FrontMatter extends vt.PageFrontmatter {
  title: string;
  permalink: string;
  date: string;
  type: PageType;
  categories?: string[];
  tags?: string[];
  author?: {
    name: string;
    link?: string;
  };
}

export interface PageNodeData extends vt.PageData {
  order?: string;
  categories?: string[];
  count?: number;
  frontmatter: FrontMatter;
}

export interface Page extends vt.Page<PageNodeData> {
  order?: string[];
}

export interface PageNode {
  $data: PageNodeData;
  $children?: Record<string, PageNode>;
}
