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
import { useRoute } from "vue-router";
import MainLayout from "./MainLayout.vue";
import ArticleInfo from "./ArticleInfo.vue";
import Sidebar from "./SideBar.vue";

const route = useRoute();

const selector = "a[href*='#']:not([href='#'])";

const scrollToPos = (top: number) => window.scrollTo({ top, behavior: "smooth" });
const scrollToEl = (event: Event) => {
  const hash = (event.target as HTMLAnchorElement).hash;
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (el) {
    scrollToPos(el.offsetTop - 4.6 * 16);
    event.preventDefault();
    if (history && history.pushState) history.pushState({}, document.title, location.pathname + hash);
  }
};
const addListener: () => void = () => document.querySelectorAll(selector).forEach(e => e.addEventListener("click", scrollToEl));
const removeListener: () => void = () => document.querySelectorAll(selector).forEach(e => e.removeEventListener("click", scrollToEl));

onMounted(addListener);
watch(() => route.path, addListener);
onBeforeUnmount(removeListener);
</script>
<style lang="scss">
.content-wrapper > :not(.article-info) {
  user-select: text;
}
</style>
