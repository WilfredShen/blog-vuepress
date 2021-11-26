<template>
  <div class="categories-page page-wrapper">
    <div class="categories-wrapper">
      <MainLayout>
        <ArticleList v-if="currentArticles" :articles="currentArticles" />
        <template #inner-right>
          <RightMenu>
            <template #title>
              <h3 class="right-menu-title row" @click="switchCategoryTo()">
                <span class="bold">全部分类</span><span class="number digital">{{ themeData.categories.$data.count }}</span>
              </h3>
            </template>
            <div class="right-menu-list">
              <template v-for="item in allCategories" :key="item.key">
                <div
                  v-if="item.count"
                  class="right-menu-item row"
                  :class="{ active: item.key === route.query.category }"
                  @click="switchCategoryTo(item.key)"
                >
                  <span>{{ item.title }}</span>
                  <span class="number digital">{{ item.count }}</span>
                </div>
              </template>
            </div>
          </RightMenu>
        </template>
        <template #footer>
          <Pagination v-if="total > pageSize" :total="total" :page-size="pageSize" :current="currentPage" @switch-paging="switchPagingTo" />
        </template>
      </MainLayout>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import { parsePages, filterArticles, sortPagesByDateDesc, sotrPagesByOrder } from "../utils/articles";
import Pagination from "./Pagination.vue";
import ArticleList from "./ArticleList.vue";
import RightMenu from "./RightMenu.vue";
import MainLayout from "./MainLayout.vue";
import type { PageNode, PageNodeData } from "types";

const route = useRoute();
const router = useRouter();
const themeData = useThemeData();

const allCategories = ref<PageNodeData[]>();
const articles = ref<PageNode[]>();
const currentArticles = ref<PageNode[]>();
const total = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);
const currentCategory = ref<PageNode>();

const getAllCategories = (node: PageNode, prefix = "", ignoreSelf = true) => {
  const list = [];
  if (node && node.$children) {
    const key = prefix ? `${prefix},${node.$data.title}` : node.$data.title;
    !ignoreSelf && list.push({ ...node.$data, key });
    sotrPagesByOrder(parsePages(node) || []).forEach(p => list.push(...getAllCategories(p, ignoreSelf ? "" : key, false)));
  }
  return list;
};

const switchPagingTo = (index: number) =>
  index !== currentPage.value &&
  index >= 1 &&
  index <= Math.ceil(total.value / pageSize.value) &&
  router.push({ query: { ...route.query, page: index } });

const switchCategoryTo = (category?: string) => router.push({ query: { ...route.query, category, page: undefined } });

const updateQuery = () => {
  let t = themeData.value.categories;
  if (route.query.category)
    route.query.category
      .toString()
      .split(",")
      .forEach(k => (t = t.$children[k]));
  currentCategory.value = t;

  currentPage.value = parseInt(route.query.page?.toString() || "1");
};

const updateList = () => {
  const list = (currentCategory.value && parsePages(currentCategory.value)) || [];
  let i = -1;
  while (++i < list.length) list.push(...(parsePages(list[i]) || []));
  articles.value = sortPagesByDateDesc(filterArticles(list));
  total.value = articles.value.length;
  currentArticles.value = articles.value.slice(pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value);
};

watch(() => route.query, updateQuery);
watch(currentCategory, updateList);
watch(currentPage, updateList);

allCategories.value = getAllCategories(themeData.value.categories);

updateQuery();
updateList();
</script>
<style lang="scss">
@use "../styles/variables" as *;

.categories-page {
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
      font-weight: bold;
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
