<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "@vuepress/client";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import { parsePages } from "../utils/articles";
import Pagination from "../components/Pagination.vue";
import ArticleList from "../components/ArticleList.vue";
import RightMenu from "../components/RightMenu.vue";
import MainLayout from "../components/MainLayout.vue";
import type { PageNode, ThemeData } from "../types";

const route = useRoute();
const router = useRouter();
const themeData = useThemeData<ThemeData>().value;

const allCategories = (() => {
  const list: Array<{ key: string; title: string; count: number; order: string }> = [];
  const handler = (node: PageNode, order = "") => {
    if (node && node.$children) {
      order += node.$data.order || "";
      if (node.$data.categories) {
        const key = [...node.$data.categories, node.$data.title].join(",");
        list.push({ key, title: node.$data.title, count: node.$data.count || 0, order });
      }
      parsePages(node)?.forEach(p => handler(p, order));
    }
  };
  handler(themeData.categories);
  return list.filter(e => e.count).sort((a, b) => a.order.localeCompare(b.order));
})();
const allArticles = themeData.articles;

const selectedCategory = computed(() => (typeof route.params.categories !== "string" && route.params.categories?.join(",")) || "");
const articles = computed(() => allArticles.filter(p => p.$data.categories?.join(",").startsWith(selectedCategory.value)));
const selectedArticles = computed(() =>
  articles.value.slice(pageSize.value * (selectedPage.value - 1), pageSize.value * selectedPage.value),
);

const total = computed(() => articles.value.length || 0);
const pageSize = ref(10);
const selectedPage = computed(() => +(route.query.page || 1));

const switchPagingTo = (index: number) => router.push({ query: { page: index } });
const switchCategoryTo = (categories?: string) => router.push({ params: { categories: categories?.split(",") } });
</script>

<template>
  <div class="categories-page page-wrapper">
    <div class="categories-wrapper">
      <MainLayout>
        <ArticleList v-if="selectedArticles" :articles="selectedArticles" />
        <template #inner-right>
          <RightMenu>
            <template #title>
              <h3 class="right-menu-title is-link row" @click="switchCategoryTo()">
                <span class="bold">全部分类</span><span class="number font-digital">{{ allCategories?.length }}</span>
              </h3>
            </template>
            <div class="right-menu-list">
              <template v-for="item in allCategories" :key="item.key">
                <div
                  v-if="item.count"
                  class="right-menu-item is-link row"
                  :class="{ active: item.key === selectedCategory }"
                  @click="switchCategoryTo(item.key)"
                >
                  <span>{{ item.title }}</span>
                  <span class="number font-digital">{{ item.count }}</span>
                </div>
              </template>
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

.categories-page {
  .pagination {
    margin-top: 1rem;
  }
  .right-menu {
    padding: 1rem 0;
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    .number {
      font-size: 1rem;
      line-height: 1rem;
      font-weight: 600;
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
