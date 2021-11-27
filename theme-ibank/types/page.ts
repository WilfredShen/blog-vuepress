import type vt from "vuepress-vite";

export interface FrontMatter extends vt.PageFrontmatter {
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

export interface PageNodeData extends vt.PageData {
  order?: string;
  count?: number;
  frontmatter: FrontMatter;
}

export interface PageNode extends vt.Page {
  order?: string[];
  data: PageNodeData;
  $data: PageNodeData;
  $children?: Record<string, PageNode>;
}
