import { Page } from "vuepress-vite";
import { PageType } from "../types";
import type { Archive, PageNode, PageNodeData } from "../types";

export const buildArchives = (pages: Page[]) => {
  const archives: Archive = {};
  pages.forEach(page => {
    if (page.data.frontmatter.type === PageType.article) {
      const p = { $data: page.data as PageNodeData } as PageNode;
      const [year, month, day] =
        p.$data.frontmatter.date
          ?.toString()
          .slice(0, 10)
          .split("-")
          .map((e: string) => parseInt(e)) || [];
      if (year && month && day) {
        if (!archives[year]) archives[year] = {};
        if (!archives[year][month]) archives[year][month] = {};
        if (!archives[year][month][day]) archives[year][month][day] = [];
        archives[year][month][day].push(p);
      }
    }
  });
  return archives;
};
