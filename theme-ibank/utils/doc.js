export const searchDocNode = (root, permalink) => {
  if (root.link === permalink) return [root]; // 匹配成功，直接返回
  if (!root.children) return null; // 匹配失败并且不存在子节点，返回 null
  for (const node of root.children) {
    const r = searchDocNode(node, permalink);
    if (r) return [root, ...r];
  }
  return null;
};
