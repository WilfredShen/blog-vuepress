<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "@vuepress/client";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import Pagination from "../components/Pagination.vue";
import ArticleList from "../components/ArticleList.vue";
import RightMenu from "../components/RightMenu.vue";
import MainLayout from "../components/MainLayout.vue";
import type { ThemeData } from "../types";

const route = useRoute();
const router = useRouter();
const themeData = useThemeData<ThemeData>().value;

const allTags: [string, number][] = Object.entries(themeData.tags).map(([tag, pages]) => [tag, pages.length]);
const articles = computed(() => (selectedTag.value && themeData.tags[selectedTag.value]) || themeData.articles);
const selectedTag = computed(() => (typeof route.params.tag === "string" && route.params.tag) || "");
const selectedArticles = computed(() =>
  articles.value.slice(pageSize.value * (selectedPage.value - 1), pageSize.value * selectedPage.value),
);

const total = computed(() => articles.value.length);
const pageSize = ref(10);
const selectedPage = computed(() => +(route.query.page || 1));

const switchPagingTo = (index: number) => router.push({ query: { page: index } });
const switchTagTo = (tag?: string) => router.push({ query: { page: undefined }, params: { tag } });
</script>

<template>
  <div class="tags-page page-wrapper">
    <div class="tags-wrapper">
      <MainLayout>
        <ArticleList v-if="selectedArticles" :articles="selectedArticles" />
        <template #inner-right>
          <RightMenu>
            <template #title>
              <h3 class="right-menu-title is-link row" @click="switchTagTo()">
                <span class="bold">全部标签</span><span class="number font-digital">{{ allTags?.length }}</span>
              </h3>
            </template>
            <div class="right-menu-list">
              <div
                v-for="[tag, count] in allTags"
                :key="`tag-${tag}`"
                class="right-menu-item is-link row"
                :class="{ active: tag === route.query.tag }"
                @click="switchTagTo(tag)"
              >
                <span>{{ tag }}</span>
                <span class="number font-digital">{{ count }}</span>
              </div>
            </div>
          </RightMenu>
        </template>
        <template #footer>
          <Pagination
            v-if="total > pageSize"
            :total="total"
            :page-size="pageSize"
            :current="selectedPage"
            @switch-paging="switchPagingTo"
          />
        </template>
      </MainLayout>
    </div>
  </div>
</template>

<style lang="scss">
@use "../styles/variables" as *;

.tags-page {
  .right-menu {
    padding: 1rem 0;
    .number {
      font-size: 1rem;
      line-height: 1rem;
      font-weight: 600;
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
      font-weight: 700;
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
