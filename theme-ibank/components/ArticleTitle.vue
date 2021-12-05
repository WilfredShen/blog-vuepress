<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <h1 class="article-title">{{ title }}</h1>
</template>

<style lang="scss">
.article-title {
  margin-bottom: 2.5rem;
}
</style>
