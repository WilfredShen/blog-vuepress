<template>
  <div class="main-layout" :class="{ 'sidebar-open': hasSidebar }">
    <div class="sidebar" v-if="hasSidebar"><slot name="sidebar"></slot></div>
    <div class="main">
      <div class="content"><slot /><slot name="footer" /></div>
      <div class="inner-right" v-if="hasInnerRight"><slot name="inner-right" /></div>
    </div>
  </div>
</template>
<script setup>
import { computed, useSlots } from "vue";

const slots = useSlots();
const hasSidebar = computed(() => !!slots["sidebar"]);
const hasInnerRight = computed(() => !!slots["inner-right"]);
</script>
<style lang="scss">
@use "../styles/variables" as *;

.main-layout {
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
      width: 200px;
      margin-left: 1rem;
    }
  }

  &.sidebar-open {
    padding-left: $sidebarWidth;
  }
}
</style>
