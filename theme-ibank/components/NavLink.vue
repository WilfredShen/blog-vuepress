<template>
  <span v-if="!item.link" class="nav-link">{{ item.text }}</span>
  <router-link v-else-if="!isExternal(item.link)" class="nav-link" :to="item.link">
    {{ item.text }}
  </router-link>
  <a
    v-else
    :href="item.link"
    class="nav-link external"
    :target="(isWebLink(item.link) && '_blank') || null"
    :rel="(isWebLink(item.link) && 'noopener noreferrer') || null"
  >
    {{ item.text }}
    <OutboundLink />
  </a>
</template>
<script setup>
import { isExternal, isWebLink } from "../utils/validate";

const props = defineProps({
  item: Object,
});
</script>
