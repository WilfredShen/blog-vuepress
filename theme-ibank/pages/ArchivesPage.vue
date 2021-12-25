<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "@vuepress/client";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import Timeline from "../components/Timeline.vue";
import RightMenu from "../components/RightMenu.vue";
import MainLayout from "../components/MainLayout.vue";
import type { Archive, ThemeData } from "../types";

const route = useRoute();
const router = useRouter();
const themeData = useThemeData<ThemeData>().value;

const isSelected = (year: string) => selectedYears.value.includes(year);
const switchArchiveTo = (year?: string) => router.push({ query: { year } });

const allArchives = Object.entries<Archive>(themeData.archives);
const allYears = [...new Set(Object.keys(themeData.archives).map(date => date.slice(0, 4)))].sort();
const groupedByYear = (() => {
  const map: { [year: string]: Archive } = {};
  allArchives.forEach(([date, archive]) => {
    const year = date.slice(0, 4);
    if (!map[year]) map[year] = [];
    map[year].push(...archive);
  });
  // 降序
  Object.values(map).forEach(archive => archive.sort((a, b) => b.$data.frontmatter.date.localeCompare(a.$data.frontmatter.date)));
  return Object.entries(map).sort(([a], [b]) => b.localeCompare(a));
})();
const selectAll = computed(() => !route.query.year);
const selectedYears = computed(() => route.query.year?.toString().split(",") || allYears);
const selectedArchives = computed(() => (selectAll.value ? [...groupedByYear] : groupedByYear.filter(([year]) => isSelected(year))));
</script>

<template>
  <div class="archives-page page-wrapper">
    <div class="archives-wrapper">
      <MainLayout>
        <Timeline :archives="selectedArchives" />
        <template #inner-right>
          <RightMenu>
            <template #title>
              <h3 class="right-menu-title is-link row" @click="switchArchiveTo()">
                <span class="fw-700">归档时间</span>
              </h3>
            </template>
            <div class="right-menu-list">
              <div
                v-for="[year] in groupedByYear"
                :key="year"
                class="right-menu-item is-link row"
                :class="{ active: !selectAll && isSelected(year) }"
                @click="switchArchiveTo(year)"
              >
                <span class="font-time fw-500">{{ year }}</span>
              </div>
            </div>
          </RightMenu>
        </template>
      </MainLayout>
    </div>
  </div>
</template>

<style lang="scss">
@use "../styles/variables" as *;

.archives-page {
  .right-menu {
    padding: 1rem 0;
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    .right-menu-title {
      margin: 0;
      padding: 0.3rem 1.5rem;
      margin-bottom: 0.5em;
      font-weight: normal;
    }
    .right-menu-list {
      display: flex;
      flex-direction: column;
      max-height: 60vh;
      overflow-y: auto;
      .right-menu-item {
        box-sizing: border-box;
        padding: 0.3rem 1.5rem;
        transition: border-width 0.1s;
        border-left: 0 solid var(--accentColor);
        transition: border-width 0.1s, $transitionBgColor, $transitionColor;
        &.active,
        &:hover {
          background-color: var(--bodyBg);
          border-left: 5px solid var(--accentColor);
          a,
          span {
            color: var(--accentColor);
          }
        }
      }
    }
  }
}
</style>
