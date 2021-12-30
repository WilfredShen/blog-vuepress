<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  img: string;
  defaultImg?: string;
  size?: number;
  name?: string;
  radius?: number;
}>();

const iconStyle = computed(() => {
  const size = props.size || 64;
  const radius = props.radius !== undefined ? props.radius : size / 2;
  return {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${radius}px`,
    overflow: "hidden",
  };
});

const defaultImg = props.defaultImg || "/img/avatar-404.png";
const useDefaultImg = `this.src="${defaultImg}";this.onerror=undefined`;
const removeAttr = (event: Event) => (event.target as HTMLImageElement).removeAttribute("onerror");
</script>

<template>
  <div class="img-icon" :class="name" :style="iconStyle">
    <img style="width: 100%; height: 100%" :src="img" :onerror="useDefaultImg" @load="removeAttr" />
  </div>
</template>
