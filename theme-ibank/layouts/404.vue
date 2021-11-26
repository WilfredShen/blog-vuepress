<template>
  <div class="theme-container">
    <div class="not-found-container">
      <div class="code">404<ToggleThemeButton style="display: inline-block" /></div>
      <div class="msg">{{ msg }}</div>
      <div class="link">
        <router-link to="/">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ToggleThemeButton from "../components/ToggleThemeButton.vue";
import * as storage from "../utils/storage";

const msgs = ["🌵这里一片荒芜🌵，去别的地方看看吧", "这个页面进隧道🚇了", "芜湖🚀这个页面上天了！", "人在火星👽，刚下🛸"];
let msg = ref("");

onMounted(() => {
  let prev: number = parseInt(storage.get("current-404-msg") as string);
  let current: number;
  if (prev !== 0 && !prev) prev = -1;
  while ((current = Math.floor(Math.random() * msgs.length)) === prev);
  storage.set("current-404-msg", current.toString());
  msg.value = msgs[(prev = current)];
});
</script>
<style lang="scss" scoped>
.not-found-container {
  box-sizing: border-box;
  padding-left: 30vw;
  padding-top: 20vh;
  .code {
    font-size: 6rem;
    color: var(--accentColor);
  }
  .link {
    margin-top: 0.5rem;
  }
}
</style>
