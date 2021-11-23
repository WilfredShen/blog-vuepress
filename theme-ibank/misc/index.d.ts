import type { PageData } from "@vuepress/core";
export {};

declare global {
  type Entry<T = any> = [string, T];

  interface NodeData extends PageData {
    order?: string;
    count?: number;
    frontmatter: FrontMatter;
  }

  interface Node {
    $data: NodeData;
    $children?: { [key: string]: Node };
  }

  interface ThemeConfig {
    logo: string;
    title: string;
    categories: boolean;
    tags: boolean;
    archives: boolean;
  }
}
