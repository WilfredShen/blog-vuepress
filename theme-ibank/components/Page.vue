<template>
  <div class="page page-wrapper">
    <MainLayout>
      <template #sidebar><Sidebar /></template>
      <div class="content-wrapper">
        <ArticleInfo />
        <Content />
      </div>
    </MainLayout>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import $ from "jquery";
import MainLayout from "./MainLayout.vue";
import ArticleInfo from "./ArticleInfo.vue";
import Sidebar from "./SideBar.vue";

const scrollTo = el => {
  const hash = decodeURIComponent(el.target.hash);
  $([document.documentElement, document.body]).animate({ scrollTop: $(hash).offset().top - 4.6 * 16 }, 400);
};
onMounted(() => $("a[href*='#'][href!='#']").on("click", scrollTo));
</script>
<style lang="scss">
.content-wrapper > :not(.article-info) {
  user-select: text;
}
</style>
