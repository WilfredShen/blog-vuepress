<script setup lang="ts">
import { ref } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import { Friend } from "../types";
import MainLayout from "../components/MainLayout.vue";
const friends: Friend[] = usePageFrontmatter().value.links as Friend[];
const flag = ref<boolean[]>([]); // 如果默认头像也加载失败，则会陷入死循环，使用flag避免进入死循环
const useDefaultImg = (event: Event, index: number) => {
  flag.value[index] = true; // 只调用一次
  const target = event.target as HTMLImageElement;
  target.src = "/img/avatar-404.png";
};
</script>

<template>
  <div class="page page-wrapper">
    <MainLayout>
      <div class="friends-wrapper">
        <div class="friend-list">
          <a v-for="(friend, index) in friends" :key="index" class="friend-card flex-row card" :href="friend.link" target="_blank">
            <div class="avatar">
              <img :src="friend.avatar" @error="!flag[index] && useDefaultImg($event, index)" />
            </div>
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .friend-card {
      color: var(--textColor);
      box-sizing: border-box;
      width: 32%;
      padding: 1rem;
      margin-bottom: 1rem;
      transition: $transitionBgColor, $transitionColor, transform 0.5s;
      &:hover {
        transform: scale(1.1);
      }
      .avatar {
        width: 64px;
        height: 64px;
        border-radius: 32px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
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
