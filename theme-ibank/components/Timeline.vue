<template>
  <div class="timeline card">
    <template v-for="[year, archive] in archives" :key="year">
      <h2 class="year fw-700">{{ year }}</h2>
      <div class="timeline-list">
        <router-link v-for="item in archive" :key="item.$data.key" class="item is-link" :to="item.$data.path">
          <span class="date font-time fw-500">{{ item.$data.frontmatter.date.slice(5, 10) }}</span>
          <span class="title">{{ item.$data.title }}</span>
        </router-link>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { Entry, Archive } from "../types";

defineProps<{ archives: Entry<Archive>[] }>();
</script>
<style lang="scss">
@use "../styles/variables" as *;

.timeline {
  padding: 1rem 1.5rem;
  h2 {
    position: sticky;
    top: $navbarHeight;
    background-color: var(--mainBg);
    margin-bottom: 0;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
    &:first-child {
      margin-top: 0;
    }
  }
  .timeline-list {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    .item {
      padding: 0.3rem 1rem;
      cursor: pointer;
      transition: color 0.2s, background-color 0.2s, border-width 0.1s;
      border-left: 0 solid var(--accentColor);
      &:hover {
        background-color: var(--bodyBg);
        border-left: 5px solid var(--accentColor);
      }
      .title {
        margin-left: 1rem;
      }
    }
  }
}
</style>
