<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { debounce } from "lodash";

const props = withDefaults(
  defineProps<{
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    zIndex?: number;
  }>(),
  {
    left: undefined,
    right: 60,
    top: undefined,
    bottom: 60,
    zIndex: 10,
  },
);

const fade = ref<number>(0);

const parseUnit = (val: number | string) => {
  if (typeof val === "number") return `${val}px`;
  if (/^\d+$/.test(val)) return `${val}px`;
  return val;
};

const style = computed(() => {
  const s: Record<string, string | number> = {};
  if (props.left !== undefined) s.left = parseUnit(props.left);
  else s.right = parseUnit(props.right);
  if (props.top !== undefined) s.top = parseUnit(props.top);
  else s.bottom = parseUnit(props.bottom);
  s.zIndex = props.zIndex;
  return s;
});

const scrollListener = debounce(() => {
  const scrollTop = document.documentElement.scrollTop;
  const tmp = (scrollTop - 200) / 100;
  fade.value = tmp < 0 ? 0 : tmp > 1 ? 1 : tmp;
}, 100);

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

onMounted(() => window.addEventListener("scroll", scrollListener));
onBeforeUnmount(() => window.removeEventListener("scroll", scrollListener));
</script>

<template>
  <transition name="fade">
    <div v-show="fade" class="back-to-top iconfont icon-backtop" :style="style" @click="scrollToTop"></div>
  </transition>
</template>

<style lang="scss">
@use "../styles/variables" as *;

.back-to-top {
  position: fixed;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--mainBg);
  box-shadow: 0 0 10px 1px var(--shadowColor);
  cursor: pointer;
  transition: $transitionBgColor, $transitionColor, opacity 0.5s;
  &:hover {
    background-color: var(--accentColor);
    color: #fff;
  }
  &:before {
    font-size: 1.2em;
  }
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
