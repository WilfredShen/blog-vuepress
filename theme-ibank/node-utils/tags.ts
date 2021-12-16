import { PageType } from "../types";
import type { Page, PageNode, Tags } from "../types";

export const buildTags = (pages: Page[]) => {
  const tags: Tags = {};
  pages.forEach(page => {
    if (page.data.frontmatter.type === PageType.article) {
      const p = { $data: { order: page.order, ...page.data } } as PageNode;
      page.data.frontmatter.tags &&
        page.data.frontmatter.tags.forEach(tag => {
          if (!tags[tag]) tags[tag] = [];
          tags[tag].push(p);
        });
    }
  });
  Object.values(tags).forEach(l =>
    l.sort((a, b) => b.$data.frontmatter.date.toString().localeCompare(a.$data.frontmatter.date.toString())),
  );
  return tags;
};
