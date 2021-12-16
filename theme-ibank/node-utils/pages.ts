import fs from "fs";
import { path } from "@vuepress/utils";
import { PageType } from "../types";
import type { Page, PageNode, ThemeConfig } from "../types";

export const createIndexPages = (docsPath: string, cfg: ThemeConfig) => {
  if (!(docsPath && cfg)) return {};
  const dir = path.join(docsPath, "@pages");
  const res: Record<string, [boolean, string]> = {};

  if (cfg.index) {
    const content = ["---", "title: 首页", `type: ${PageType.index}`, "permalink: /", "navbar: false", "---"].join("\n");
    const fullPath = path.join(dir, "index.md");
    createIndexPage(fullPath, content);
  }

  if (cfg.categories) {
    const name = PageType.categories;
    const content = ["---", "title: 分类", `type: ${name}`, `permalink: /${name}/`, "navbar: false", "---"].join("\n");
    const fullPath = path.join(dir, `${name}.md`);
    res.categories = [createIndexPage(fullPath, content), fullPath.replace(docsPath, "")];
  }

  if (cfg.tags) {
    const name = PageType.tags;
    const content = ["---", "title: 标签", `type: ${name}`, `permalink: /${name}/`, "navbar: false", "---"].join("\n");
    const fullPath = path.join(dir, `${name}.md`);
    res.tags = [createIndexPage(fullPath, content), fullPath.replace(docsPath, "")];
  }

  if (cfg.archives) {
    const name = PageType.archives;
    const content = ["---", "title: 归档", `type: ${name}`, `permalink: /${name}/`, "navbar: false", "---"].join("\n");
    const fullPath = path.join(dir, `${name}.md`);
    res.archives = [createIndexPage(fullPath, content), fullPath.replace(docsPath, "")];
  }

  return res;
};

const createIndexPage = (fullPath: string, content: string) => {
  if (fs.existsSync(fullPath)) return false;
  fs.writeFileSync(fullPath, content);
  return true;
};

export const filterPagesByType = (pages: Page[], type: PageType) => pages.filter(page => page.data.frontmatter.type === type);

export const converToPageNode = (...pages: Page[]): PageNode[] =>
  pages.map(page => ({ $data: { order: page.order?.join(""), ...page.data } }));
