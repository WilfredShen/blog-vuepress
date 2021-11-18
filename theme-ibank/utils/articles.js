export const parsePages = node => node && Object.values(node);
export const filterArticles = pages => pages && pages.filter(e => e.$data.frontmatter && e.$data.frontmatter.type === "article");

export const sotrPagesByOrder = pages => pages.sort((a, b) => a.$data.order.toString().localeCompare(b.$data.order.toString()));
export const sotrPagesByOrderDesc = pages => pages.sort((a, b) => b.$data.order.toString().localeCompare(a.$data.order.toString()));

export const sortPagesByDate = pages =>
  pages.sort((a, b) => a.$data.frontmatter.date.toString().localeCompare(b.$data.frontmatter.date.toString()));
export const sortPagesByDateDesc = pages =>
  pages.sort((a, b) => b.$data.frontmatter.date.toString().localeCompare(a.$data.frontmatter.date.toString()));
