<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "@vuepress/client";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import ArticleList from "./ArticleList.vue";
import MainLayout from "./MainLayout.vue";
import Pagination from "./Pagination.vue";
import type { PageNode } from "../types";
import { filterArticles, parsePages, sortPagesByDateDesc } from "../utils/articles";
import AvatarCard from "../cards/AvatarCard.vue";
import TagsCard from "../cards/TagsCard.vue";

const route = useRoute();
const router = useRouter();
const themeData = useThemeData();

const state = reactive<{
  allArticles: PageNode[];
  total: number;
  pageSize: number;
  currentPage: number;
}>({
  allArticles: [],
  total: 0,
  pageSize: 10,
  currentPage: 1,
});

const currentArticles = computed(() => {
  const begin = state.pageSize * (state.currentPage - 1);
  const end = begin + state.pageSize;
  return state.allArticles.slice(begin, end);
});

const switchPagingTo = (index: number) =>
  index !== state.currentPage &&
  index >= 1 &&
  index <= Math.ceil(state.total / state.pageSize) &&
  router.push({ query: { ...route.query, page: index } });

const updateArticles = () => {
  const list = parsePages(themeData.value.categories) || [];
  let i = -1;
  while (++i < list.length) list.push(...(parsePages(list[i]) || []));
  state.allArticles = sortPagesByDateDesc(filterArticles(list));
  state.total = state.allArticles.length;
};

updateArticles();
</script>

<template>
  <div class="home-page page-wrapper">
    <div class="home-wrapper">
      <MainLayout>
        <ArticleList v-if="currentArticles" :articles="currentArticles" />
        <template #inner-right>
          <div class="card-list">
            <AvatarCard />
            <TagsCard />
          </div>
        </template>
        <template #footer>
          <Pagination
            v-if="state.total > state.pageSize"
            :total="state.total"
            :page-size="state.pageSize"
            :current="state.currentPage"
            @switch-paging="switchPagingTo"
          />
        </template>
      </MainLayout>
    </div>
  </div>
</template>

<style lang="scss">
.pagination {
  margin-top: 1rem;
}

.card-list {
  & > * {
    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
}
</style>
