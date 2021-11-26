import { path } from "@vuepress/utils";
// const { path }from("@vuepress/utils");
import chalk from "chalk";
// const chalkfrom("chalk"); // 命令行打印美化
import { formatFile } from "./nodeUtils/frontmatter";
import { parseOrder } from "./nodeUtils/order";
import { buildCategories } from "./nodeUtils/categories";
import { buildNavbar } from "./nodeUtils/navbar";
import { buildTags } from "./nodeUtils/tags";
import { buildArchives } from "./nodeUtils/archives";
import { defaultConfig } from "./nodeUtils/defaults";
import { createPages } from "./nodeUtils/pages";
import type { ThemeFunction, ThemeObject } from "vuepress-vite";
import type { Archive, LinkRaw, NavLink, PageNode, SiteData, Tags, ThemeConfig } from "types";

const LOG_ENABLE = true;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const log = LOG_ENABLE ? console.log : () => {};

const themeIbank: ThemeFunction = (options, ctx) => {
  ctx.options.templateDev = path.resolve(__dirname, "templates/dev.html");
  ctx.options.templateSSR = path.resolve(__dirname, "templates/ssr.html");
  const opts: ThemeConfig = { ...defaultConfig, ...options } as ThemeConfig;

  const siteData: SiteData = ctx.siteData;
  siteData.themeConfig = opts;

  Object.values(createPages(ctx.options.source, opts)).forEach(v =>
    v[0]
      ? log(chalk.cyan("info"), "create page:", chalk.green("[success]        "), chalk.green(v[1]))
      : log(chalk.cyan("info"), "create page:", chalk.yellow("[already exists] "), chalk.yellow(v[1])),
  );

  const themeData: {
    categories?: PageNode;
    tags?: Tags;
    archives?: Archive;
    navbar?: (NavLink | LinkRaw)[];
  } = {};

  return <ThemeObject>{
    name: "vuepress-theme-ibank",
    layouts: {
      Layout: path.resolve(__dirname, "layouts/Layout.vue"),
      404: path.resolve(__dirname, "layouts/404.vue"),
    },
    plugins: [
      ["@vuepress/plugin-prismjs"],
      ["@vuepress/plugin-theme-data", { themeData }],
      // ["@vuepress/plugin-active-header-links", { offset: 4.6 * 16 }],
    ],
    // 以下为 Hooks，按调用顺序排列
    // extendsMarkdown: () => {},
    extendsPageOptions: option => {
      if (option.filePath) {
        const [filePath, status] = formatFile(opts, option.filePath, ctx.options.source);
        if (status === "success") log(chalk.cyan("info"), "格式化frontmatter:", chalk.green("[success]  "), chalk.green(filePath));
        if (status === "fail") log(chalk.cyan("info"), "格式化frontmatter:", chalk.red("[fail]     "), chalk.red(filePath));
        if (status === "excluded") log(chalk.cyan("info"), "格式化frontmatter:", chalk.yellow("[excluded] "), chalk.yellow(filePath));
      }
      return option;
    },
    extendsPageData: page => {
      const p = page as PageNode;
      if (p.filePathRelative) p.order = parseOrder(p.filePathRelative);
      return p;
    },
    onInitialized: ctx => {
      const filteredPages = (ctx.pages as PageNode[]).filter(page => !page.order || !page.order.filter(o => /^_/.test(o)).length);
      filteredPages.forEach(page => page.order && (page.order = page.order.map(o => o.replace(/^@/, ""))));

      themeData.categories = buildCategories(filteredPages);
      themeData.tags = buildTags(filteredPages);
      themeData.archives = buildArchives(filteredPages);
      const navbar: (NavLink | LinkRaw)[] = buildNavbar(themeData.categories);
      const indexes: LinkRaw = { text: "索引", children: [] };
      opts.categories && indexes.children?.push({ text: "分类", link: "/categories/" });
      opts.tags && indexes.children?.push({ text: "标签", link: "/tags/" });
      opts.archives && indexes.children?.push({ text: "归档", link: "/archives/" });
      navbar.push(indexes);
      navbar.push({ text: "GitHub", link: "https://github.com/WilfredShen/vuepress-theme-ibank" });
      themeData.navbar = navbar;
    },
    // clientAppSetupFiles: null,
    // clientAppRootComponentFiles: null,
    clientAppEnhanceFiles: path.resolve(__dirname, "enhanceApp.ts"),
    // onPrepared: ctx => {},
    // alias: null,
    // define: null,
    // onWatched: () => {}, // dev server only
    // onGenerated: () => {}, // build only
  };
};

export default themeIbank;
