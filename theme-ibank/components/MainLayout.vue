<template>
  <div class="main-layout">
    <div class="main">
      <div class="content"><slot /><slot name="footer" /></div>
      <div class="right"><slot name="right" /></div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss">
.main {
  display: flex;
  flex-direction: row;
  width: 100%;

  .content {
    flex: 1;
  }

  .right {
    width: 200px;
    margin-left: 1rem;
  }
}
</style>
