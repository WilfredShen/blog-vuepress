<template>
  <div class="tags" title="标签">
    <router-link class="tag" :style="getStyle(index)" v-for="(item, index) in tags" :to="{ path: '/tags', query: { tag: item } }">
      <i class="iconfont icon-tag"></i>{{ item }}
    </router-link>
  </div>
</template>
<script setup>
import { shuffle } from "../utils/random";

const props = defineProps({ tags: Array, gutter: { type: String, default: "0" } });
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
const wrapIndex = index => index % colorList.length;
const getStyle = index => {
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
