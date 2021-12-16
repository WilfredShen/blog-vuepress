<template>
  <div class="tags-page page-wrapper">
    <div class="tags-wrapper">
      <MainLayout>
        <ArticleList v-if="currentArticles" :articles="currentArticles" />
        <template #inner-right>
          <RightMenu>
            <template #title>
              <h3 class="right-menu-title is-link row" @click="switchTagTo()">
                <span class="bold">全部标签</span><span class="number font-digital">{{ allTags?.length }}</span>
              </h3>
            </template>
            <div class="right-menu-list">
              <div
                v-for="[tag, pages] in allTags"
                :key="`tag-${tag}`"
                class="right-menu-item is-link row"
                :class="{ active: tag === route.query.tag }"
                @click="switchTagTo(tag)"
              >
                <span>{{ tag }}</span>
                <span class="number font-digital">{{ pages.length }}</span>
              </div>
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
import { useRoute, useRouter } from "@vuepress/client";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import Pagination from "./Pagination.vue";
import ArticleList from "./ArticleList.vue";
import RightMenu from "./RightMenu.vue";
import MainLayout from "./MainLayout.vue";
import type { Tag, PageNode, Tags } from "../types";

const route = useRoute();
const router = useRouter();
const themeData = useThemeData();

const allTags = ref<Tag[]>();
const articles = ref<PageNode[]>();
const currentArticles = ref<PageNode[]>();

const total = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);
const currentTag = ref<string>();

const getAllTags = (tags: Tags) => Object.entries(tags);

const switchPagingTo = (index: number) =>
  index !== currentPage.value &&
  index >= 1 &&
  index <= Math.ceil(total.value / pageSize.value) &&
  router.push({ query: { ...route.query, page: index } });

const switchTagTo = (tag?: string) => router.push({ query: { ...route.query, tag, page: undefined } });

const updateQuery = () => {
  currentTag.value = route.query.tag?.toString();
  currentPage.value = parseInt(route.query.page?.toString() || "1");
};

const updateList = () => {
  articles.value = currentTag.value ? themeData.value.tags[currentTag.value] : themeData.value.articles;
  total.value = articles.value?.length || 0;
  currentArticles.value = articles.value?.slice(pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value);
};

watch(() => route.query, updateQuery);
watch(currentTag, updateList);
watch(currentPage, updateList);

allTags.value = getAllTags(themeData.value.tags);
updateQuery();
updateList();
</script>
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
        &.active {
          transition: border-width 0.1s, $transitionBgColor, $transitionColor;
        }
        &.active,
        &:hover {
          background-color: var(--bodyBg);
          border-left: 5px solid var(--accentColor);
        }
      }
    }
  }
}
</style>
