import { defaultType } from "./defaults";

const newNode = (data?: PageNodeData): PageNode => ({ $data: { ...data } } as PageNode);

export const buildCategories = (pages: PageNode[]) => {
  const root = newNode({ count: 0, title: "首页" } as PageNodeData);
  pages.forEach(page => {
    if (page.order) for (const order of page.order) if (/^_/.test(order)) return;

    const doIncrease = page.data.frontmatter.type === defaultType;
    if (page.data.frontmatter.categories) {
      let current = root;
      // 遍历categories，注册节点
      page.data.frontmatter.categories.forEach((e, i) => {
        if (!current.$children) current.$children = {};
        // 已存在节点则直接递归
        if (current.$children[e]) current = current.$children[e];
        // 不存在节点则创建新的节点并递归
        else {
          current = current.$children[e] = newNode({ order: page.order[i], count: 0, title: e } as PageNodeData);
          root.$data.count !== undefined && root.$data.count++;
        }

        doIncrease && current.$data.count !== undefined && current.$data.count++;
      });
      /* 此时current指向当前 page 的父节点 */

      // 注册 page
      if (!current.$children) current.$children = {};
      if (!current.$children[page.data.title]) current.$children[page.data.title] = newNode();
      current = current.$children[page.data.title];
      current.$data = {
        ...page.data,
        order: page.order[page.order.length - 1],
        ...current.$data,
      };
    } else if (page.data.title) {
      if (!root.$children) root.$children = {};
      if (!root.$children[page.data.title]) root.$children[page.data.title] = newNode();
      root.$children[page.data.title].$data = {
        ...page.data,
        order: page.order[page.order.length - 1] || "",
        ...root.$children[page.data.title].$data,
      };
    }
  });
  return root;
};
