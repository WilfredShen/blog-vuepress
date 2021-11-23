import type { PageFrontmatter } from "@vuepress/core";
export {};
declare global {
  interface FrontMatter extends PageFrontmatter {
    type: string;
    categories: string[];
    tags: string[];
    author: {
      name: string;
      link: string;
    };
  }
}
