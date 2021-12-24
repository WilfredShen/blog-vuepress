import { PageType } from "../types";
import type { Archives, Page, PageNode, PageNodeData } from "../types";

export const buildArchives = (pages: Page[]) => {
  const archives: Archives = {};
  pages.forEach(page => {
    if (page.data.frontmatter.type === PageType.article) {
      const p = { $data: page.data as PageNodeData } as PageNode;
      const date = p.$data.frontmatter.date?.toString().slice(0, 10);
      if (date) {
        if (!archives[date]) archives[date] = [];
        archives[date].push(p);
      }
    }
  });
  return archives;
};
