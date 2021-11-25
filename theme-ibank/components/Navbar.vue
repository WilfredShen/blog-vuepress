<template>
  <header ref="navbar" class="navbar">
    <div class="logo">
      <router-link class="flex-row align-center" :to="siteData.base">
        <img v-if="siteData.themeConfig && siteData.themeConfig.logo" :src="siteData.themeConfig.logo" alt="" />
        <span>{{ (siteData.themeConfig && siteData.themeConfig.title) || siteData.title }}</span>
      </router-link>
    </div>
    <NavLinks />
    <ToggleThemeButton />
  </header>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useSiteData } from "@vuepress/client";
import type { SiteData } from "@vuepress/client";
import NavLinks from "./NavLinks.vue";
import ToggleThemeButton from "./ToggleThemeButton.vue";

const siteData: Ref<SiteData & { themeConfig?: ThemeConfig }> = useSiteData();

const navbar = ref();
</script>
