const { defaultType } = require("./defaults");

const newNode = data => ({ $data: { ...data }, $children: {} });
const newLeafNode = data => ({ $data: { ...data } });

const buildCategories = pages => {
  const root = newNode({ count: 0, title: "首页" });
  pages.forEach(page => {
    const doIncrease = page.data.frontmatter.type === defaultType;
    if (page.data.frontmatter.categories) {
      let current = root;

      // 遍历categories，注册节点
      page.data.frontmatter.categories.forEach((e, i) => {
        // 已存在节点则直接递归
        if (current.$children[e]) current = current.$children[e];
        // 不存在节点则创建新的节点并递归
        else (current = current.$children[e] = newNode({ order: page.order[i], count: 0, title: e })), root.$data.count++;
        doIncrease && current.$data.count++;
      });

      /* 此时current指向当前 page 的父节点 */

      // 注册 page
      if (!current.$children[page.data.title]) current.$children[page.data.title] = newLeafNode();
      current = current.$children[page.data.title];
      current.$data = {
        ...page.data,
        order: page.order[page.order.length - 1],
        ...current.$data,
      };
    } else if (page.data.title && !root.$children[page.data.title]) {
      root.$children[page.data.title] = { $data: { ...page.data, order: page.order[page.order.length - 1] || "" } };
    }
  });
  return root;
};

module.exports = { buildCategories };
