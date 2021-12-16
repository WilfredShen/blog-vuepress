import { defineClientAppEnhance } from "@vuepress/client";
import HomeLayout from "./layouts/HomeLayout.vue";
import ArticleLayout from "./layouts/ArticleLayout.vue";
import ReadmeLayout from "./layouts/ReadmeLayout.vue";
import CategoriesLayout from "./layouts/CategoriesLayout.vue";
import TagsLayout from "./layouts/TagsLayout.vue";
import ArchivesLayout from "./layouts/ArchivesLayout.vue";
import FriendsLayout from "./layouts/FriendsLayout.vue";
// import { PageType } from "./types";
import "./styles/index.scss";
// eslint-disable-next-line
export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component("HomeLayout", HomeLayout);
  app.component("ArticleLayout", ArticleLayout);
  app.component("ReadmeLayout", ReadmeLayout);
  app.component("CategoriesLayout", CategoriesLayout);
  app.component("TagsLayout", TagsLayout);
  app.component("ArchivesLayout", ArchivesLayout);
  app.component("FriendsLayout", FriendsLayout);
  // const routes = router.getRoutes();
  // const categoriesRoute = routes.find(route => route.path === `/${PageType.categories}/`);
  // if (categoriesRoute && categoriesRoute.name) {
  //   router.removeRoute(categoriesRoute.name);
  //   router.addRoute({
  //     name: categoriesRoute.name,
  //     component: categoriesRoute.components.default,
  //     path: categoriesRoute.path + ":categories(.*)",
  //     props: { categories: true },
  //   });
  // }
  // console.log(router.getRoutes());
});
