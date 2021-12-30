/// <reference types="vite/client" />

/* eslint-disable */
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<unknown, unknown, unknown>;
  export default component;
}
