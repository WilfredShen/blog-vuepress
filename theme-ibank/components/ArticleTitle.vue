<template>
  <h1 class="article-title">{{ title }}</h1>
</template>
<script setup lang="ts">
defineProps<{ title: string }>();
</script>
<style lang="scss">
.article-title {
  margin-bottom: 2.5rem;
}
</style>
