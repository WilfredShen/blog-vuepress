<script setup lang="ts">
import { isExternal, isWebLink } from "../utils/validate";
import type { LinkRaw } from "../types";

defineProps<{ item: LinkRaw }>();
</script>

<template>
  <span v-if="!item.link" class="nav-link">{{ item.text }}</span>
  <router-link v-else-if="!isExternal(item.link)" class="nav-link is-link" :to="item.link">
    {{ item.text }}
  </router-link>
  <a
    v-else
    :href="item.link"
    class="nav-link is-link external"
    :target="(isWebLink(item.link) && '_blank') || undefined"
    :rel="(isWebLink(item.link) && 'noopener noreferrer') || undefined"
  >
    {{ item.text }}
    <OutboundLink />
  </a>
</template>
