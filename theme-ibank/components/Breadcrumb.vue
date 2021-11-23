<template>
  <div class="breadcrumb">
    <router-link v-if="home" to="/" class="nav-link home iconfont icon-home" title="首页"></router-link>
    <div class="breadcrumb-item" title="分类" v-for="(item, index) in navs">
      <span v-if="home || index !== 0" class="separator">{{ separator }}</span>
      <router-link
        v-if="navs"
        :to="{
          path: '/categories',
          query: {
            category: navs
              .slice(0, index + 1)
              .map(e => e.text)
              .join(','),
          },
        }"
      >
        {{ item.text }}
      </router-link>
      <span v-else>{{ item.text }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  navs: Array as () => LinkRaw[],
  separator: {
    type: String,
    default: "/",
  },
  home: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="scss">
.breadcrumb {
  display: flex;
  flex-direction: row;
  cursor: default;
  align-items: center;
  font-size: 1em;

  .home,
  .breadcrumb-item a {
    color: var(--textColor);
    &:hover {
      color: var(--accentColor);
    }
  }

  .separator {
    margin: 0 0.3em;
  }
}
</style>
