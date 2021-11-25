<template>
  <a
    class="toggle-theme-button iconfont"
    :class="themeMode === 'light' ? 'icon-sun' : 'icon-moon'"
    @click="toggleThemeMode(themeMode === 'dark' ? 'light' : 'dark')"
  ></a>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as storage from "../utils/storage";

const regex = /(?<!\w)theme-mode-(\w*)(?!=\w)/i;
const themeMode = ref<string>();

const parseThemeMode = () => {
  const className = document.body.className;
  const res = className.match(regex);
  return (res && res[1]) || "light";
};

const toggleThemeMode = (mode: string) => {
  let className = document.body.className;
  className = className.replace(regex, `theme-mode-${mode}`);
  document.body.setAttribute("class", className);
  themeMode.value = mode;
  storage.set("theme-mode", mode);
};

onMounted(() => toggleThemeMode(storage.get("theme-mode") || parseThemeMode()));
</script>
<style lang="scss">
.toggle-theme-button {
  display: flex;
  margin-left: 1rem;
  color: var(--textColor);
  cursor: pointer;
  align-items: center;
  font-weight: bold;

  &:hover {
    color: var(--accentColor);
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
