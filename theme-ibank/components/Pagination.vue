<template>
  <div ref="pagination" class="pagination">
    <div class="prev card" :class="{ disabled: current === 1 }" @click="goPrev">
      <i class="iconfont icon-arrow-left"></i><span>上一页</span>
    </div>
    <div class="pagination-list">
      <div
        v-for="item in paginationItems"
        :key="item.pageIndex"
        class="pagination-item card"
        :class="{ active: item.pageIndex === current }"
        :title="`第${item.pageIndex}页`"
        @click="goTo(item.pageIndex)"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="next card" :class="{ disabled: current === pageCount }" @click="goNext">
      <span>下一页</span><i class="iconfont icon-arrow-right"></i>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    total: number;
    pageSize: number;
    current: number;
  }>(),
  {
    total: 0,
    pageSize: 10,
    current: 1,
  },
);

const itemSize = 58; // (48 + 5 * 2) px
const nextSize = 120;
const buttonNum = ref(0);
const pagination = ref<Element>();

const fn = () => {
  if (pagination.value) {
    const t = Math.floor((pagination.value.clientWidth - 2 * nextSize) / itemSize);
    buttonNum.value = t > 1 ? t : 1;
  }
};

const pageCount = computed(() => Math.ceil(props.total / props.pageSize));

const paginationItems = computed<PaginationItem[]>(() => {
  const list: PaginationItem[] = [];
  if (pageCount.value <= buttonNum.value) for (let i = 1; i <= pageCount.value; i++) list.push({ text: i.toString(), pageIndex: i });
  else {
    let cur = props.current;
    let btn = buttonNum.value - 2;
    let pc = pageCount.value;
    let trimLeft = true;

    if (btn === 3) {
      if (cur === 1)
        return [
          { text: "1", pageIndex: 1 },
          { text: "···", pageIndex: 2 },
          { text: pc.toString(), pageIndex: pc },
        ];
      else if (cur === pc)
        return [
          { text: "1", pageIndex: 1 },
          { text: "···", pageIndex: cur - 1 },
          { text: cur.toString(), pageIndex: cur },
        ];
      return [
        { text: "1", pageIndex: 1 },
        { text: cur.toString(), pageIndex: cur },
        { text: pc.toString(), pageIndex: pc },
      ];
    } else if (btn < 3) {
      return [{ text: cur.toString(), pageIndex: cur }];
    }

    let left = cur - Math.floor(btn / 2);
    if (left < 2) (left = 2), (trimLeft = false);
    let right = left + btn - 1;
    if (right > pc) (left -= right - pc + 1), (right = pc - 1);

    list.push({ text: "1", pageIndex: 1 });
    for (let i = left + (trimLeft ? (right - left) % 2 : 0); i <= right - (trimLeft ? 0 : (right - left) % 2); i++)
      list.push({ text: i.toString(), pageIndex: i });
    list.push({ text: pc.toString(), pageIndex: pc });

    if (list.length > 3) {
      if (list[1].pageIndex > 2) list[1].text = "···";
      if (list[list.length - 2].pageIndex < pc - 1) list[list.length - 2].text = "···";
    }
  }
  return list;
});

const emit = defineEmits(["switchPaging"]);
const goTo = (index: number) => index >= 1 && index <= pageCount.value && emit("switchPaging", index);
const goPrev = () => goTo(props.current - 1);
const goNext = () => goTo(props.current + 1);

onMounted(() => {
  window.addEventListener("resize", fn);
  fn();
});
onUnmounted(() => window.removeEventListener("resize", fn));
</script>
<style lang="scss">
.pagination {
  display: flex;
  flex-direction: row;
  width: 100%;

  .pagination-list {
    display: flex;
    flex-direction: row;

    .pagination-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px;
      width: 48px;
      cursor: pointer;
      margin: 5px;
      line-height: 48px;
    }

    .active {
      background-color: var(--accentColor);
      color: white;
    }
  }

  .prev,
  .next {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 120px;
    flex: 1;
    cursor: pointer;
    margin: 5px;
    padding: 0 16px;
    line-height: 48px;

    i {
      font-size: 24px;
    }
  }

  .prev {
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
    padding-left: 16px;
  }

  .next {
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    padding-right: 16px;
  }
}
</style>
