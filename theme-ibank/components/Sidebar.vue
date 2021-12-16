<template>
  <aside class="sidebar card">
    <template v-for="header in headers" :key="header.slug">
      <div class="sidebar-title is-link">
        <a :href="`#${header.slug}`" class="bold">{{ header.title }}</a>
      </div>
      <ul v-for="item in header.children" :key="item.slug" class="sidebar-list">
        <li class="sidebar-item is-link">
          <a :href="`#${item.slug}`">{{ item.title }}</a>
        </li>
      </ul>
    </template>
  </aside>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, usePageData } from "@vuepress/client";

const route = useRoute();

const headers = ref(usePageData().value.headers);
watch(
  () => route.path,
  () => (headers.value = usePageData().value.headers),
);
</script>
<style lang="scss">
.sidebar {
  background-color: var(--mainBg);
  padding: 1.5rem;
  .sidebar-title {
    margin: 0;
    border: none;
    font-size: 1.2rem;
    a {
      display: inline-block;
      width: 100%;
    }
  }
  .sidebar-list {
    margin-top: 0.5rem;
    list-style: none;
    a {
      display: inline-block;
      width: 100%;
    }
  }
}
</style>
