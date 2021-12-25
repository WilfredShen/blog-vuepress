<script setup lang="ts">
import { useRouter } from "vue-router";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import { ThemeData } from "../types";
import { shuffle } from "../utils/random";

const router = useRouter();

const tags = Object.entries(useThemeData<ThemeData>().value.tags)
  .map<[string, number]>(e => [e[0], e[1].length])
  .sort((a, b) => b[1] - a[1]); // 根据文章数排序

const colorList = shuffle([
  { backgroundColor: "#bc9c03", color: "white" },
  { backgroundColor: "#38a894", color: "white" },
  { backgroundColor: "#328ad6", color: "white" },
  { backgroundColor: "#00b2ec", color: "white" },
  { backgroundColor: "#f7c5a0", color: "black" },
  { backgroundColor: "#d4a4eb", color: "black" },
  { backgroundColor: "#d2f5a6", color: "black" },
  { backgroundColor: "#76f2f2", color: "black" },
]);
const selectTag = (tag: string) => router.push({ path: "/tags/", query: { tag } });
const getColor = (index: number) => colorList[index % colorList.length];
</script>

<template>
  <div class="tags-card card">
    <h3 class="title">标签</h3>
    <div class="tags-list">
      <span
        v-for="([tag, count], index) in tags"
        :key="tag"
        class="tag-item"
        :title="`${count}篇文章`"
        :style="getColor(index)"
        @click="selectTag(tag)"
        >{{ tag }}</span
      >
    </div>
  </div>
</template>

<style lang="scss">
@use "../styles/variables" as *;

.tags-card {
  padding: 1rem 1rem 0.6rem;
  .title {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 0.5em;
    transition: $transitionColor;
  }
  .tags-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    .tag-item {
      margin-bottom: 0.68em;
      padding: 0.2em 0.5em;
      border-radius: 5px;
      font-size: 0.8em;
      font-weight: 500;
      cursor: pointer;
      transition: $transitionBgColor, $transitionColor, transform 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
