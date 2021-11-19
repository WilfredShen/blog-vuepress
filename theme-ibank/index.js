const { path } = require("@vuepress/utils");
const chalk = require("chalk"); // 命令行打印美化
const { formatFile } = require("./nodeUtils/frontmatter");
const { parseOrder } = require("./nodeUtils/order");
const { buildCategories } = require("./nodeUtils/categories");
const { buildNavbar } = require("./nodeUtils/navbar");
const { buildTags } = require("./nodeUtils/tags");
const { buildArchives } = require("./nodeUtils/archives");
const { defaultConfig } = require("./nodeUtils/defaults");
const { createPages } = require("./nodeUtils/pages");

const log = console.log;
// const log = () => {};

module.exports = (opts, ctx) => {
  ctx.options.templateDev = path.resolve(__dirname, "templates/dev.html");
  ctx.options.templateSSR = path.resolve(__dirname, "templates/ssr.html");
  opts = { ...defaultConfig, ...opts };
  ctx.siteData.themeConfig = opts;

  Object.values(createPages(ctx.options.source, opts)).forEach(v =>
    v[0]
      ? log(chalk.cyan("info"), "create page:", chalk.green("[success] "), chalk.green(v[1]))
      : log(chalk.cyan("info"), "create page:", chalk.yellow("[already exists] "), chalk.yellow(v[1])),
  );

  const themeData = {};
  const options = {
    name: "vuepress-theme-ibank",
    layouts: {
      Layout: path.resolve(__dirname, "layouts/Layout.vue"),
      404: path.resolve(__dirname, "layouts/404.vue"),
    },
    plugins: [["@vuepress/plugin-prismjs"], ["@vuepress/plugin-theme-data", { themeData }]],
    // 以下为 Hooks，按调用顺序排列
    // extendsMarkdown: () => {},
    extendsPageOptions: option => {
      if (option.filePath) {
        const [filePath, status] = formatFile(opts, option.filePath, ctx.options.source);
        if (status === "success") log(chalk.cyan("info"), "格式化frontmatter:", chalk.green("[success]  "), chalk.green(filePath));
        if (status === "fail") log(chalk.cyan("info"), "格式化frontmatter:", chalk.red("[fail]     "), chalk.red(filePath));
        if (status === "excluded") log(chalk.cyan("info"), "格式化frontmatter:", chalk.yellow("[excluded] "), chalk.yellow(filePath));
      }
    },
    extendsPageData: page => {
      if (page.filePathRelative) page.order = parseOrder(page.filePathRelative);
    },
    onInitialized: ctx => {
      const filteredPages = ctx.pages.filter(page => !page.order || !page.order.filter(o => /^_/.test(o)).length);
      filteredPages.forEach(page => page.order && (page.order = page.order.map(o => o.replace(/^@/, ""))));

      themeData.categories = buildCategories(filteredPages);
      themeData.tags = buildTags(filteredPages);
      themeData.archives = buildArchives(filteredPages);
      const navbar = buildNavbar(themeData.categories);
      const indexes = { text: "索引", children: [] };
      opts.categories && indexes.children.push({ text: "分类", link: "/categories/" });
      opts.tags && indexes.children.push({ text: "标签", link: "/tags/" });
      opts.archives && indexes.children.push({ text: "归档", link: "/archives/" });
      navbar.push(indexes);
      navbar.push({ text: "GitHub", link: "https://github.com/WilfredShen/vuepress-theme-ibank" });
      themeData.navbar = navbar;
    },
    // clientAppSetupFiles: null,
    // clientAppRootComponentFiles: null,
    clientAppEnhanceFiles: path.resolve(__dirname, "enhanceApp.js"),
    // onPrepared: ctx => {},
    // alias: null,
    // define: null,
    // onWatched: () => {}, // dev server only
    // onGenerated: () => {}, // build only
  };

  return options;
};
