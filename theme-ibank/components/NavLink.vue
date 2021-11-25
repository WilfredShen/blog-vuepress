<template>
  <span v-if="!item.link" class="nav-link">{{ item.text }}</span>
  <router-link v-else-if="!isExternal(item.link)" class="nav-link" :to="item.link">
    {{ item.text }}
  </router-link>
  <a
    v-else
    :href="item.link"
    class="nav-link external"
    :target="(isWebLink(item.link) && '_blank') || undefined"
    :rel="(isWebLink(item.link) && 'noopener noreferrer') || undefined"
  >
    {{ item.text }}
    <OutboundLink />
  </a>
</template>
<script setup lang="ts">
import { isExternal, isWebLink } from "../utils/validate";

defineProps<{ item: LinkRaw }>();
</script>
