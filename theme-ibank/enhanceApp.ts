import { defineClientAppEnhance } from "@vuepress/client";
import "./styles/index.scss";
// eslint-disable-next-line
export default defineClientAppEnhance(({ app, router, siteData }) => {
  const routes = router.getRoutes();
  const categoriesRouteIndex = routes.findIndex(r => r.path === "/categories/");
  if (categoriesRouteIndex > -1) {
    const categoriesRoute = routes[categoriesRouteIndex];
    categoriesRoute.name && router.removeRoute(categoriesRoute.name);
    router.addRoute({
      name: categoriesRoute.name,
      path: "/categories/:categories*/",
      component: categoriesRoute.components.default,
    });
  }
  console.log(router.getRoutes());
});
