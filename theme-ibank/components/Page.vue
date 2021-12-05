<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute } from "@vuepress/client";
import MainLayout from "./MainLayout.vue";
import ArticleInfo from "./ArticleInfo.vue";
import Sidebar from "./Sidebar.vue";

const route = useRoute();

const selector = "a[href*='#']:not([href='#'])";

const scrollToPos = (pos: { left?: number; top?: number }) => window.scrollTo({ ...pos, behavior: "smooth" });
const scrollToEl = (event: Event) => {
  const hash = (event.target as HTMLAnchorElement).hash;
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (el) {
    scrollToPos({ top: el.offsetTop - 4.6 * 16 });
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
