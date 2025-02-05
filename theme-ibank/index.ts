import { path } from "@vuepress/utils";
import chalk from "chalk";
import { parseFile, formatFile } from "./node-utils/frontmatter";
import { parseOrder } from "./node-utils/order";
import { buildCategories } from "./node-utils/categories";
import { buildNavbar } from "./node-utils/navbar";
import { buildTags } from "./node-utils/tags";
import { buildArchives } from "./node-utils/archives";
import { defaultConfig } from "./node-utils/defaults";
import { converToPageNode, createIndexPages, filterPagesByType } from "./node-utils/pages";
import { LinkRaw, NavLink, Page, PageType, SiteData, ThemeConfig, ThemeData } from "./types";
import type { ThemeFunction, ThemeObject } from "vuepress-vite";

const LOG_ENABLE = true;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const log = LOG_ENABLE ? console.log : () => {};

const themeIbank: ThemeFunction = (options, ctx) => {
  ctx.options.templateDev = path.resolve(__dirname, "templates/dev.html");
  ctx.options.templateSSR = path.resolve(__dirname, "templates/ssr.html");
  const opts: ThemeConfig = { ...defaultConfig, ...options } as ThemeConfig;
  const siteData: SiteData = ctx.siteData;
  siteData.themeConfig = opts;

  Object.values(createIndexPages(ctx.options.source, opts)).forEach(v =>
    v[0]
      ? log(chalk.cyan("info"), "create page:", chalk.green("[success]        "), chalk.green(v[1]))
      : log(chalk.cyan("info"), "create page:", chalk.yellow("[already existed]"), chalk.yellow(v[1])),
  );

  const themeData: ThemeData = {} as ThemeData;

  return <ThemeObject>{
    name: "vuepress-theme-ibank",
    layouts: {
      Layout: path.resolve(__dirname, "layouts/Layout.vue"),
      404: path.resolve(__dirname, "layouts/404.vue"),
    },
    plugins: [
      ["@vuepress/plugin-prismjs"],
      ["@vuepress/plugin-theme-data", { themeData }],
      ["@vuepress/plugin-nprogress"],
      ["@vuepress/plugin-medium-zoom", { selector: ".article-wrapper :not(a) img" }],
      ["@vuepress/plugin-external-link-icon"],
      [
        "@vuepress/register-components",
        {
          components: {
            HomeLayout: path.resolve(__dirname, "./layouts/HomeLayout.vue"),
            ArticleLayout: path.resolve(__dirname, "./layouts/ArticleLayout.vue"),
            ReadmeLayout: path.resolve(__dirname, "./layouts/ReadmeLayout.vue"),
            CategoriesLayout: path.resolve(__dirname, "./layouts/CategoriesLayout.vue"),
            TagsLayout: path.resolve(__dirname, "./layouts/TagsLayout.vue"),
            ArchivesLayout: path.resolve(__dirname, "./layouts/ArchivesLayout.vue"),
            FriendsLayout: path.resolve(__dirname, "./layouts/FriendsLayout.vue"),
            ImgIcon: path.resolve(__dirname, "./global/ImgIcon.vue"),
          },
        },
      ],
      [
        "@vuepress/plugin-container",
        {
          type: "details",
          before: (info: string) => `<div class="custom-container"><details class="details"><summary>${info}</summary>\n`,
          after: () => "</details></div>\n",
          locales: { "/": { defaultInfo: "点击查看" }, "/en/": { defaultInfo: "DETAILS" } },
        },
      ],
      [
        "@vuepress/plugin-container",
        {
          type: "info",
          before: (info: string) => `<div class="custom-container"><div class="info"><p class="title iconfont icon-info">${info}</p>\n`,
          after: () => "</div></div>\n",
          locales: { "/": { defaultInfo: "普通信息" }, "/en/": { defaultInfo: "INFO" } },
        },
      ],
      [
        "@vuepress/plugin-container",
        {
          type: "tip",
          before: (info: string) => `<div class="custom-container"><div class="tip"><p class="title iconfont icon-tip">${info}</p>\n`,
          after: () => "</div></div>\n",
          locales: { "/": { defaultInfo: "提示信息" }, "/en/": { defaultInfo: "TIP" } },
        },
      ],
      [
        "@vuepress/plugin-container",
        {
          type: "warning",
          before: (info: string) =>
            `<div class="custom-container"><div class="warning"><p class="title iconfont icon-warning">${info}</p>\n`,
          after: () => "</div></div>\n",
          locales: { "/": { defaultInfo: "警告信息" }, "/en/": { defaultInfo: "WARNING" } },
        },
      ],
      [
        "@vuepress/plugin-container",
        {
          type: "danger",
          before: (info: string) => `<div class="custom-container"><div class="danger"><p class="title iconfont icon-danger">${info}</p>\n`,
          after: () => "</div></div>\n",
          locales: { "/": { defaultInfo: "危险信息" }, "/en/": { defaultInfo: "DANGER" } },
        },
      ],
      // ["@vuepress/plugin-active-header-links", { offset: 4.6 * 16 }],
    ],
    // 以下为 Hooks，按调用顺序排列
    // extendsMarkdown: () => {},
    extendsPageOptions: option => {
      if (option.filePath) {
        const [filePath, status] = formatFile(opts, option.filePath, ctx.options.source);
        if (status === "success") log(chalk.cyan("info"), "formatting frontmatter:", chalk.green("[success]  "), chalk.green(filePath));
        if (status === "fail") log(chalk.cyan("info"), "formatting frontmatter:", chalk.red("[fail]     "), chalk.red(filePath));
        if (status === "excluded") log(chalk.cyan("info"), "formatting frontmatter:", chalk.yellow("[excluded] "), chalk.yellow(filePath));
      }
    },
    extendsPage: page => {
      const p = page as Page;
      const filePath = p.filePathRelative;
      if (filePath) {
        p.order = parseOrder(filePath);
        p.data.categories = parseFile("/" + filePath).categories;
      }
    },
    onInitialized: ctx => {
      const filteredPages = (ctx.pages as Page[]).filter(page => !page.order || !page.order.filter(o => /^_/.test(o)).length);
      filteredPages.forEach(page => page.order && (page.order = page.order.map(o => o.replace(/^@/, ""))));
      themeData.categories = buildCategories(filteredPages);
      themeData.tags = buildTags(filteredPages);
      themeData.archives = buildArchives(filteredPages);
      const navbar: (NavLink | LinkRaw)[] = buildNavbar(themeData.categories);
      const indexes: LinkRaw = { text: "索引", children: [] };
      opts.categories && indexes.children?.push({ text: "分类", link: `/${PageType.categories}/` });
      opts.tags && indexes.children?.push({ text: "标签", link: `/${PageType.tags}/` });
      opts.archives && indexes.children?.push({ text: "归档", link: `/${PageType.archives}/` });
      navbar.unshift({ text: "首页", link: "/" });
      navbar.push(indexes);
      navbar.push({ text: "GitHub", link: "https://github.com/WilfredShen/vuepress-theme-ibank" });
      themeData.navbar = navbar;
      themeData.articles = converToPageNode(...filterPagesByType(filteredPages, PageType.article)).sort((a, b) =>
        b.$data.frontmatter.date.localeCompare(a.$data.frontmatter.date),
      );
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
