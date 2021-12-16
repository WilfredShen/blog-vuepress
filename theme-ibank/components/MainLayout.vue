<script setup lang="ts">
import { computed, useSlots } from "vue";

const slots = useSlots();
const hasSidebar = computed(() => !!slots["sidebar"]);
const hasInnerRight = computed(() => !!slots["inner-right"]);
</script>

<template>
  <div class="main-layout" :class="{ 'sidebar-open': hasSidebar }">
    <div v-if="hasSidebar" class="sidebar"><slot name="sidebar"></slot></div>
    <div class="main">
      <div class="content"><slot /><slot name="footer" /></div>
      <div v-if="hasInnerRight" class="inner-right"><slot name="inner-right" /></div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../styles/variables" as *;

.main-layout {
  &.sidebar-open {
    padding-left: $sidebarWidth;
  }
  .sidebar {
    box-sizing: border-box;
    position: fixed;
    top: $navbarHeight;
    left: 0;
    height: calc(100vh - $navbarHeight);
    width: $sidebarWidth;
  }
  .main {
    display: flex;
    flex-direction: row;
    width: 100%;
    .content {
      flex: 1;
    }
    .inner-right {
      width: 240px;
      margin-left: 1rem;
    }
  }
}
</style>
