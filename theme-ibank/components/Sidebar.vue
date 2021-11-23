<template>
  <aside class="sidebar card">
    <template v-for="header in headers">
      <h3 class="sidebar-title">
        <a :href="`#${header.slug}`" class="bold">{{ header.title }}</a>
      </h3>
      <ul class="sidebar-list iconfont" v-for="item in header.children">
        <li class="sidebar-item">
          <a :href="`#${item.slug}`">{{ item.title }}</a>
        </li>
      </ul>
    </template>
  </aside>
</template>
<script setup lang="ts">
import { usePageData } from "@vuepress/client";

const pageData = usePageData();
const headers = pageData.value.headers;
</script>
<style lang="scss">
.sidebar {
  background-color: var(--mainBg);
  padding: 1.5rem;

  a {
    color: var(--textColor);
  }

  .sidebar-title {
    margin: 0;
    border: none;
  }

  .sidebar-list {
    margin-top: 0.5rem;
    list-style: "\e71c";

    a {
      display: inline-block;
      width: 100%;

      &:hover {
        color: var(--accentColor);
      }
    }
  }
}
</style>
