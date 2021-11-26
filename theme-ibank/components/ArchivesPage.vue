<template>
  <div class="archives-page page-wrapper">
    <div class="archives-wrapper">
      <MainLayout>
        <Timeline :archives="currentArchives" />
        <template #inner-right>
          <RightMenu>
            <template #title>
              <h3 class="right-menu-title row" @click="switchArchiveTo()">
                <span class="bold">归档时间</span>
              </h3>
            </template>
            <div class="right-menu-list">
              <div
                v-for="[year] in allArchives"
                :key="year"
                class="right-menu-item row"
                :class="{ active: currentYears && currentYears.includes(year) }"
                @click="switchArchiveTo(year)"
              >
                <span class="bold">{{ year }}</span>
              </div>
            </div>
          </RightMenu>
        </template>
      </MainLayout>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import Timeline from "./Timeline.vue";
import RightMenu from "./RightMenu.vue";
import MainLayout from "./MainLayout.vue";
import type { Entry, ArchiveYear } from "types";

const route = useRoute();
const router = useRouter();
const themeData = useThemeData();

const allArchives = ref<Entry<ArchiveYear>[]>([]);

const switchArchiveTo = (year?: string) => router.push({ query: { year } });

const currentYears = computed(() => route.query.year && route.query.year.toString().split(","));
const currentArchives = computed<Entry<ArchiveYear>[]>(() =>
  currentYears.value ? allArchives.value.filter(([year]) => currentYears.value?.includes(year)) : allArchives.value,
);

allArchives.value = Object.entries(themeData.value.archives);
</script>
<style lang="scss">
@use "../styles/variables" as *;

.archives-page {
  .right-menu {
    padding: 1rem 0;

    .number {
      font-size: 1rem;
      line-height: 1rem;
      font-weight: bold;
    }

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

        &.active {
          transition: border-width 0.1s, $transitionBgColor, $transitionColor;
        }

        &.active,
        &:hover {
          background-color: var(--bodyBg);
          border-left: 5px solid var(--accentColor);
          color: var(--accentColor);
        }
      }
    }
  }
}
</style>
