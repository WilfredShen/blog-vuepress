<script setup lang="ts">
import { usePageFrontmatter } from "@vuepress/client";
import { Friend } from "../types";
import MainLayout from "../components/MainLayout.vue";

const friends: Friend[] = usePageFrontmatter().value.links as Friend[];
</script>

<template>
  <div class="page page-wrapper">
    <MainLayout>
      <div class="friends-wrapper">
        <div class="friend-list">
          <a v-for="(friend, index) in friends" :key="index" class="friend-card flex-row card" :href="friend.link" target="_blank">
            <ImgIcon :size="64" name="avatar" :img="friend.avatar" default-img="/img/avatar-404.png" />
            <div class="content flex-column">
              <div class="name">{{ friend.name }}</div>
              <div class="desc">{{ friend.desc }}</div>
            </div>
          </a>
        </div>
        <div class="content">
          <Content />
        </div>
      </div>
    </MainLayout>
  </div>
</template>

<style lang="scss">
@use "../styles/_variables.scss" as *;

.friends-wrapper {
  & > .friend-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    margin-bottom: 1rem;
    .friend-card {
      color: var(--textColor);
      box-sizing: border-box;
      padding: 1rem;
      transition: $transitionBgColor, $transitionColor, transform 0.5s;
      &:hover {
        transform: scale(1.1);
      }
      .content {
        margin-left: 1rem;
        word-break: break-all;
        .name {
          font-weight: 500;
          margin-bottom: 0.3rem;
        }
        .desc {
          font-size: 0.9em;
        }
      }
    }
  }
  & > .content {
    user-select: text;
    background-color: var(--mainBg);
    padding: 1rem 2.5rem 2rem;
    border-radius: 5px;
  }
}
</style>
