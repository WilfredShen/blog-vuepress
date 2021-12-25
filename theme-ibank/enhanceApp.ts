import { defineClientAppEnhance } from "@vuepress/client";
import "./styles/index.scss";
import { PageType } from "./types";
// eslint-disable-next-line
export default defineClientAppEnhance(({ app, router, siteData }) => {
  const routes = router.getRoutes();
  const categoriesRoute = routes.find(r => r.path === `/${PageType.categories}/`);
  if (categoriesRoute) {
    categoriesRoute.name && router.removeRoute(categoriesRoute.name);
    router.addRoute({
      name: categoriesRoute.name,
      path: "/categories/:categories*/",
      component: categoriesRoute.components.default,
    });
  }
  const tagsRoute = routes.find(r => r.path === `/${PageType.tags}/`);
  if (tagsRoute) {
    tagsRoute.name && router.removeRoute(tagsRoute.name);
    router.addRoute({
      name: tagsRoute.name,
      path: "/tags/:tag?/",
      component: tagsRoute.components.default,
    });
  }
  const archivesRoute = routes.find(r => r.path === `/${PageType.archives}/`);
  if (archivesRoute) {
    archivesRoute.name && router.removeRoute(archivesRoute.name);
    router.addRoute({
      name: archivesRoute.name,
      path: "/archives/:year?/",
      component: archivesRoute.components.default,
    });
  }
});
