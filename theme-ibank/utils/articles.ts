export const parsePages = (node: Node | undefined) => node && node.$children && Object.values(node.$children);
export const filterArticles = (pages: Node[]) => pages.filter(e => e.$data.frontmatter && e.$data.frontmatter.type === "article");

export const sotrPagesByOrder = (pages: Node[]) => pages.sort((a, b) => a.$data.order.toString().localeCompare(b.$data.order.toString()));
export const sotrPagesByOrderDesc = (pages: Node[]) =>
  pages.sort((a, b) => b.$data.order.toString().localeCompare(a.$data.order.toString()));

export const sortPagesByDate = (pages: Node[]) =>
  pages.sort((a, b) => a.$data.frontmatter.date.toString().localeCompare(b.$data.frontmatter.date.toString()));
export const sortPagesByDateDesc = (pages: Node[]) =>
  pages.sort((a, b) => b.$data.frontmatter.date.toString().localeCompare(a.$data.frontmatter.date.toString()));
