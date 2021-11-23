<template>
  <div class="right-menu card">
    <div class="title"><slot name="title" /></div>
    <slot />
  </div>
</template>
<style lang="scss">
@use "../styles/variables" as *;

.right-menu {
  position: sticky;
  top: $navbarHeight + 0.5rem;
}
</style>
