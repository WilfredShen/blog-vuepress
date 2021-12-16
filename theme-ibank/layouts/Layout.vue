<script setup lang="ts">
import { computed } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import ArticlePage from "../components/ArticlePage.vue";
import ReadmePage from "../components/ReadmePage.vue";
import BackToTop from "../components/BackToTop.vue";
import { PageType } from "../types";

const frontmatter = usePageFrontmatter();

const comp = computed(() => {
  switch (frontmatter.value.type) {
    case PageType.article:
      return ArticlePage;
    case PageType.readme:
      return ReadmePage;
  }
  return undefined;
});
</script>

<template>
  <div class="theme-container">
    <Navbar />
    <Component :is="comp" v-if="comp" />
    <Footer />
    <BackToTop />
  </div>
</template>
