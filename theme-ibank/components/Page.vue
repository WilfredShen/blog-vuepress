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
<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import $ from "jquery";
import MainLayout from "./MainLayout.vue";
import ArticleInfo from "./ArticleInfo.vue";
import Sidebar from "./SideBar.vue";

const route = useRoute();

const scrollToPos = (top: number) => $([document.documentElement, document.body]).animate({ scrollTop: top - 4.6 * 16 }, 400) && void 0;

const scrollToEl = (el: any) => {
  const hash = decodeURIComponent(el.target.hash);
  const offset = $(hash).offset();
  offset && scrollToPos(offset.top);
};

const addListener = () => $("a[href^='#'][href!='#']").on("click", scrollToEl) && void 0;
const removeListener = () => $("a[href^='#'][href!='#']").on("click", scrollToEl) && void 0;

onMounted(addListener);
watch(() => route.path, addListener);
onBeforeRouteLeave(removeListener);
onBeforeUnmount(removeListener);
</script>
<style lang="scss">
.content-wrapper > :not(.article-info) {
  user-select: text;
}
</style>
