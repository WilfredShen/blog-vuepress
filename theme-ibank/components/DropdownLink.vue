<script setup lang="ts">
import { ref } from "vue";
import NavLink from "./NavLink.vue";
import type { LinkRaw } from "../types";

defineProps<{ item: LinkRaw }>();

const open = ref(false);
</script>

<template>
  <div class="dropdown-link underline-wrapper">
    <NavLink :item="item" class="link-title accent-underline" />
    <span class="arrow" :class="open ? 'down' : 'right'"></span>
    <ul v-if="item" class="dropdown-list box-shadow">
      <li v-for="child in item.children" :key="`child-${child.text}`" class="dropdown-group">
        <template v-if="child.children && child.children.length">
          <h4>
            <NavLink v-if="child.link" class="dropdown-item" :item="child" />
            <span v-else>{{ child.text }}</span>
          </h4>
          <ul class="dropdown-sub-group">
            <template v-for="subItem in child.children" :key="`sub-item-${subItem.text}`">
              <li v-if="subItem.link">
                <NavLink class="dropdown-sub-item" :item="subItem" />
              </li>
            </template>
          </ul>
        </template>
        <NavLink v-else class="dropdown-item" :item="child" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use "../styles/_variables" as *;

.dropdown-link {
  position: relative;
  white-space: nowrap;
  height: fit-content;
  .arrow {
    margin-left: 0.6rem;
    vertical-align: middle;
    margin-top: -2px;
    @media (min-width: $MQMobile) {
      border-left: 4px solid transparent !important;
      border-right: 4px solid transparent !important;
      border-top: 6px solid var(--arrowBgColor) !important;
      border-bottom: 0 !important;
    }
  }
  ul {
    padding: 0;
    margin: 0;
  }
  &:hover .dropdown-list {
    display: flex;
  }
  .dropdown-list {
    display: none;
    position: absolute;
    background-color: var(--mainBg);
    right: 0;
    padding: 0.5rem 0;
    border-radius: 5px;
    flex-direction: column;
    margin-top: 0.2em;
    .dropdown-item,
    .dropdown-sub-item {
      display: inline-block;
      width: 100%;
    }
    li {
      list-style-type: none;
    }
    .dropdown-group {
      font-size: 0.9em;
      padding: 0.3rem 1.2rem;
      border-top: 1px solid var(--borderColor);
      &:first-child {
        border: none;
      }
      h4 {
        margin: 0 0 0.2em 0;
        & > * {
          font-weight: 700;
        }
      }
      .dropdown-sub-group {
        font-size: 0.9em;
      }
    }
  }
}
</style>
