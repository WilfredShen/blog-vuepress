<template>
  <div class="theme-container">
    <Navbar />
    <Component :is="comp" v-if="comp" />
    <Footer />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Page from "../components/Page.vue";
import ReadmePage from "../components/ReadmePage.vue";
import CategoriesPage from "../components/CategoriesPage.vue";
import TagsPage from "../components/TagsPage.vue";
import ArchivesPage from "../components/ArchivesPage.vue";

const frontmatter = usePageFrontmatter();

const comp = computed(() => {
  switch (frontmatter.value.type) {
    case "article":
      return Page;
    case "readme":
      return ReadmePage;
    case "categories":
      return CategoriesPage;
    case "tags":
      return TagsPage;
    case "archives":
      return ArchivesPage;
  }
  return undefined;
});
</script>
