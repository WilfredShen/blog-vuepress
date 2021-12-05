import fs from "fs";
import { path } from "@vuepress/utils";
import { PageType } from "../types";
import type { ThemeConfig } from "../types";

export const createPages = (docsPath: string, cfg: ThemeConfig) => {
  if (!(docsPath && cfg)) return {};
  const dir = path.join(docsPath, "@pages");
  const res: Record<string, [boolean, string]> = {};

  if (cfg.index) {
    const content = ["---", "title: 首页", `type: ${PageType.index}`, "permalink: /", "navbar: false", "---"].join("\n");
    const fullPath = path.join(dir, "index.md");
    createPage(fullPath, content);
  }

  if (cfg.categories) {
    const content = ["---", "title: 分类", `type: ${PageType.categories}`, "permalink: /categories/", "navbar: false", "---"].join("\n");
    const fullPath = path.join(dir, "categories.md");
    res.categories = [createPage(fullPath, content), fullPath.replace(docsPath, "")];
  }

  if (cfg.tags) {
    const content = ["---", "title: 标签", `type: ${PageType.tags}`, "permalink: /tags/", "navbar: false", "---"].join("\n");
    const fullPath = path.join(dir, "tags.md");
    res.tags = [createPage(fullPath, content), fullPath.replace(docsPath, "")];
  }

  if (cfg.archives) {
    const content = ["---", "title: 归档", `type: ${PageType.archives}`, "permalink: /archives/", "navbar: false", "---"].join("\n");
    const fullPath = path.join(dir, "archives.md");
    res.archives = [createPage(fullPath, content), fullPath.replace(docsPath, "")];
  }

  return res;
};

const createPage = (fullPath: string, content: string) => {
  if (fs.existsSync(fullPath)) return false;
  fs.writeFileSync(fullPath, content);
  return true;
};
