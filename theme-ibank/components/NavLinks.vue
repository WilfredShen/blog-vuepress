<template>
  <nav class="nav-links">
    <div class="nav-item" v-for="item in links">
      <DropdownLink v-if="item.children && item.children.length" :item="item" />
      <span v-else class="underline-wrapper"><NavLink :item="item" class="accent-underline" /></span>
    </div>
  </nav>
</template>
<script setup>
import NavLink from "./NavLink.vue";
import DropdownLink from "./DropdownLink.vue";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";

const themeData = useThemeData();
const links = themeData.value.navbar;
console.log(links);
</script>
<style lang="scss">
.nav-links {
  height: 100%;
}
</style>
