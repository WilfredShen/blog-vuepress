const { path } = require("@vuepress/utils");
const chalk = require("chalk"); // 命令行打印美化
const { formatFile } = require("./nodeUtils/frontmatter");
const { parseOrder } = require("./nodeUtils/order");
const { buildCategories } = require("./nodeUtils/categories");
const { buildNavbar } = require("./nodeUtils/navbar");
const { buildTags } = require("./nodeUtils/tags");
const { buildArchives } = require("./nodeUtils/archives");

const log = console.log;

module.exports = (opts, ctx) => {
  ctx.options.templateDev = path.resolve(__dirname, "templates/dev.html");
  ctx.options.templateSSR = path.resolve(__dirname, "templates/ssr.html");

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
        const [filePath, status] = formatFile(option.filePath, ctx.options.source);
        if (status === "success") log(chalk.cyan("info"), "格式化frontmatter:", chalk.green("[success]  "), chalk.green(filePath));
        if (status === "fail") log(chalk.cyan("info"), "格式化frontmatter:", chalk.red("[fail]     "), chalk.red(filePath));
        if (status === "excluded") log(chalk.cyan("info"), "格式化frontmatter:", chalk.yellow("[excluded] "), chalk.yellow(filePath));
      }
    },
    extendsPageData: page => {
      if (page.filePathRelative) page.order = parseOrder(page.filePathRelative);
    },
    onInitialized: ctx => {
      themeData.categories = buildCategories(ctx.pages);
      themeData.tags = buildTags(ctx.pages);
      themeData.archives = buildArchives(ctx.pages);
      const list = buildNavbar(themeData.categories);
      list.push({
        text: "索引",
        children: [
          { text: "分类", link: "/categories/" },
          { text: "标签", link: "/tags/" },
          { text: "归档", link: "/archives/" },
        ],
      });
      themeData.navbar = list;
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
