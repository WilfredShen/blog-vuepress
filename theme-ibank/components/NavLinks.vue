<template>
  <nav class="nav-links">
    <div v-for="item in links" :key="item.text" class="nav-item">
      <DropdownLink v-if="item.children && item.children.length" :item="item" />
      <span v-else class="underline-wrapper"><NavLinkComp :item="item" class="accent-underline" /></span>
    </div>
  </nav>
</template>
<script setup lang="ts">
import NavLinkComp from "./NavLink.vue";
import DropdownLink from "./DropdownLink.vue";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import type { NavLink } from "types";

const themeData = useThemeData();
const links: NavLink[] = themeData.value.navbar;
</script>
<style lang="scss">
.nav-links {
  height: 100%;
}
</style>
