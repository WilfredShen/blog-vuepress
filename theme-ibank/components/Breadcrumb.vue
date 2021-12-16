<script setup lang="ts">
import type { LinkRaw } from "../types";

withDefaults(
  defineProps<{
    navs: LinkRaw[];
    separator?: string;
    home?: boolean;
  }>(),
  {
    separator: "/",
    home: false,
  },
);
</script>

<template>
  <div class="breadcrumb">
    <router-link v-if="home" to="/" class="nav-link home is-link iconfont icon-home" title="首页"></router-link>
    <div v-for="(item, index) in navs" :key="item.text" class="breadcrumb-item" title="分类">
      <span v-if="home || index !== 0" class="separator">{{ separator }}</span>
      <router-link
        class="is-link"
        :to="{
          path: '/categories',
          query: {
            category: navs
              .slice(0, index + 1)
              .map(e => e.text)
              .join(','),
          },
        }"
      >
        {{ item.text }}
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.breadcrumb {
  display: flex;
  flex-direction: row;
  cursor: default;
  align-items: center;
  font-size: 1em;
  .separator {
    margin: 0 0.3em;
  }
}
</style>
