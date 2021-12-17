<script setup lang="ts">
import NavLinkComp from "./NavLink.vue";
import DropdownLink from "./DropdownLink.vue";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import type { NavLink } from "../types";

const themeData = useThemeData();
const links: NavLink[] = themeData.value.navbar;
</script>

<template>
  <nav class="nav-links">
    <div v-for="item in links" :key="item.text" class="nav-item">
      <DropdownLink v-if="item.children && item.children.length" :item="item" />
      <NavLinkComp v-else :item="item" class="accent-underline" />
    </div>
  </nav>
</template>

<style lang="scss">
.nav-links {
  height: 100%;
  .nav-item {
    height: fit-content;
  }
}
</style>
