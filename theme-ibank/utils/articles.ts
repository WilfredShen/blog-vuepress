import { PageType } from "../types";
import type { PageNode } from "../types";

export const parsePages = (node: PageNode) => node.$children && Object.values(node.$children);
export const filterArticles = (pages: PageNode[]) =>
  pages.filter(e => e.$data.frontmatter && e.$data.frontmatter.type === PageType.article);

export const sortPagesByOrder = (pages: PageNode[]) =>
  pages.sort((a, b) => a.$data.order?.toString().localeCompare(b.$data.order?.toString() || "") || 0);
export const sortPagesByOrderDesc = (pages: PageNode[]) =>
  pages.sort((a, b) => b.$data.order?.toString().localeCompare(a.$data.order?.toString() || "") || 0);

export const sortPagesByDate = (pages: PageNode[]) =>
  pages.sort((a, b) => a.$data.frontmatter.date?.toString().localeCompare(b.$data.frontmatter.date?.toString() || "") || 0);
export const sortPagesByDateDesc = (pages: PageNode[]) =>
  pages.sort((a, b) => b.$data.frontmatter.date?.toString().localeCompare(a.$data.frontmatter.date?.toString() || "") || 0);
