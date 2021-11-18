<template>
  <div class="page page-wrapper">
    <div class="content-wrapper">
      <ArticleInfo />
      <Content />
    </div>
  </div>
</template>
<script setup>
import ArticleInfo from "./ArticleInfo.vue";
</script>
<style lang="scss">
.content-wrapper > :not(.article-info) {
  user-select: text;
}
</style>
