/* eslint-disable */
import type { PageFrontmatter } from "@vuepress/core";
export {};
declare global {
  interface FrontMatter extends PageFrontmatter {
    title: string;
    permalink: string;
    date: string | Date;
    type: string;
    categories: string[];
    tags: string[];
    author: {
      name: string;
      link: string;
    };
  }
}
