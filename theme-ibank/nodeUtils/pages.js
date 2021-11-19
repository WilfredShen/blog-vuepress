const fs = require("fs");
const { path } = require("@vuepress/utils");

const createPages = (docsPath, cfg) => {
  if (!(docsPath && cfg)) return {};
  const dir = path.join(docsPath, "@pages");
  const res = {};

  if (cfg.categories) {
    const content = ["---", "title: 分类", "type: categories", "permalink: /categories", "navbar: false", "---"].join("\n");
    const fullPath = path.join(dir, "categories.md");
    res.categories = [createPage(fullPath, content), fullPath.replace(docsPath, "")];
  }

  if (cfg.tags) {
    const content = ["---", "title: 标签", "type: tags", "permalink: /tags", "navbar: false", "---"].join("\n");
    const fullPath = path.join(dir, "tags.md");
    res.tags = [createPage(fullPath, content), fullPath.replace(docsPath, "")];
  }

  if (cfg.archives) {
    const content = ["---", "title: 归档", "type: archives", "permalink: /archives", "navbar: false", "---"].join("\n");
    const fullPath = path.join(dir, "archives.md");
    res.archives = [createPage(fullPath, content), fullPath.replace(docsPath, "")];
  }

  return res;
};

const createPage = (fullPath, content) => {
  if (fs.existsSync(fullPath)) return false;
  fs.writeFileSync(fullPath, content);
  return true;
};

module.exports = { createPages };
