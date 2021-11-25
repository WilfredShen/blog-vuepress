<template>
  <div class="tags" title="标签">
    <router-link
      v-for="(item, index) in tags"
      :key="`tag-${item}`"
      class="tag"
      :style="getStyle(index)"
      :to="{ path: '/tags', query: { tag: item } }"
    >
      <i class="iconfont icon-tag"></i>{{ item }}
    </router-link>
  </div>
</template>
<script setup lang="ts">
import { shuffle } from "../utils/random";

const props = withDefaults(
  defineProps<{
    tags: string[];
    gutter: string;
  }>(),
  {
    gutter: "0",
  },
);
const colorList = shuffle([
  ["#bc9c03", "white"],
  ["#38a894", "white"],
  ["#328ad6", "white"],
  ["#00b2ec", "white"],
  ["#f7c5a0", "black"],
  ["#d4a4eb", "black"],
  ["#d2f5a6", "black"],
  ["#76f2f2", "black"],
]);
const wrapIndex = (index: number) => index % colorList.length;
const getStyle = (index: number) => {
  const c = colorList[wrapIndex(index)];
  return { backgroundColor: c[0], color: c[1], marginLeft: index && props.gutter };
};
</script>
<style lang="scss">
.tags {
  .tag {
    font-size: 0.8em;
    padding: 3px;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
