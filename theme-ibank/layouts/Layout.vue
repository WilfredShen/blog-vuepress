<template>
  <div class="theme-container">
    <Navbar />
    <Page v-if="frontmatter.type === 'article'" />
    <Page v-else-if="frontmatter.type === 'readme'" />
    <CategoriesPage v-else-if="frontmatter.type === 'categories'" />
    <TagsPage v-else-if="frontmatter.type === 'tags'" />
    <ArchivesPage v-else-if="frontmatter.type === 'archives'" />
    <Footer />
  </div>
</template>

<script setup>
import { usePageFrontmatter } from "@vuepress/client";
import Navbar from "../components/Navbar.vue";
import Page from "../components/Page.vue";
import CategoriesPage from "../components/CategoriesPage.vue";
import Footer from "../components/Footer.vue";
import TagsPage from "../components/TagsPage.vue";
import ArchivesPage from "../components/ArchivesPage.vue";

const frontmatter = usePageFrontmatter();
</script>
<style lang="scss"></style>
