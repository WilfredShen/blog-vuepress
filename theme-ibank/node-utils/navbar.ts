import { PageType } from "../types";
import type { PageNode, NavLink } from "../types";

export const buildNavbar = (node: PageNode) => {
  const list: NavLink[] = [];
  if (!node.$children) return list;
  Object.entries(node.$children).forEach(
    ([k, v]) =>
      (v.$data && v.$data.frontmatter && v.$data.frontmatter.navbar !== undefined ? v.$data.frontmatter.navbar : true) &&
      list.push({
        text: k,
        link: v.$data.frontmatter && v.$data.frontmatter.permalink,
        children: v.$data && v.$data.frontmatter && v.$data.frontmatter.type === PageType.article ? undefined : buildNavbar(v),
        $data: v.$data,
        $children: v.$children,
      }),
  );
  return list.sort(({ $data: { order: a } }, { $data: { order: b } }) => (a && b ? a.localeCompare(b) : 0));
};
