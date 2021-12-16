<script setup lang="ts">
import { useSiteData } from "@vuepress/client";
import { isWebLink } from "../utils/validate";
import type { ThemeConfig, SiteData } from "../types";

const avatar: ThemeConfig["avatar"] = (useSiteData().value as SiteData).themeConfig?.avatar;
</script>

<template>
  <div v-if="avatar" class="avatar-card card">
    <img class="avatar" :src="avatar.img" />
    <div v-if="avatar.icons" class="icon-list flex-row">
      <div v-for="item in avatar.icons" :key="item.title" class="icon-item flex-1 flex-row justify-center align-center">
        <a
          class="is-link iconfont"
          :class="`icon-${item.icon}`"
          :href="item.link"
          :target="isWebLink(item.link) ? '_blank' : undefined"
        ></a>
      </div>
    </div>
    <div class="name">{{ avatar.name }}</div>
    <div v-if="avatar.slogan" class="slogan">{{ avatar.slogan }}</div>
  </div>
</template>

<style lang="scss">
.avatar-card {
  overflow: hidden;
  .avatar {
    width: 100%;
  }
  .icon-item {
    min-height: 2rem;
    * {
      font-size: 1.2rem;
    }
  }
  .name {
    font-size: 1.2rem;
    padding: 0 1rem;
    &:last-child {
      padding-bottom: 1rem;
    }
  }
  .slogan {
    padding: 0 1rem 1rem;
  }
}
</style>
