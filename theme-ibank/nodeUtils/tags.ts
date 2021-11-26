import { defaultType } from "./defaults";
import { PageNode, Tags } from "types";

export const buildTags = (pages: PageNode[]) => {
  const tags: Tags = { $all: [] };
  pages.forEach(page => {
    if (page.data.frontmatter.type === defaultType) {
      const p = { $data: { order: page.order, ...page.data } } as PageNode;
      tags.$all.push(p);
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
