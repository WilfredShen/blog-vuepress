<script setup lang="ts">
import Tags from "./Tags.vue";
import type { PageNode } from "../types";

defineProps<{ articles: PageNode[] }>();
</script>

<template>
  <div class="article-list">
    <template v-for="item in articles" :key="item.$data.key">
      <div v-if="item.$data" class="article-card card">
        <h2 class="title is-link">
          <router-link :to="item.$data.path">{{ item.$data.title }}</router-link>
        </h2>
        <div class="meta-info">
          <template v-if="item.$data.frontmatter.author">
            <a
              v-if="item.$data.frontmatter.author.link"
              class="author"
              title="作者"
              :href="item.$data.frontmatter.author.link"
              target="_blank"
            >
              <i class="iconfont icon-user" />{{ item.$data.frontmatter.author.name }}
            </a>
            <span v-else title="作者"><i class="iconfont icon-user" />{{ item.$data.frontmatter.author.name }}</span>
          </template>
          <span class="font-time" title="创建日期">
            <i class="iconfont icon-calendar" />{{ item.$data.frontmatter.date?.toString().slice(0, 10) }}
          </span>
          <Tags v-if="item.$data.frontmatter.tags" :tags="item.$data.frontmatter.tags" gutter="0.5em" />
        </div>
        <div v-if="item.$data.excerpt" class="excerpt-wrapper">
          <!-- eslint-disable-next-line -->
          <div class="excerpt" v-html="item.$data.excerpt"></div>
          <router-link class="readmore" :to="item.$data.path">
            阅读全文
            <i class="iconfont icon-more" />
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@use "../styles/variables" as *;

.article-card {
  padding: 1rem 1.5rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  .title {
    border: none;
    cursor: pointer;
    margin-top: 0.5rem;
    a {
      display: inline-block;
      width: 100%;
    }
  }
  .meta-info {
    font-size: 0.8em;
    display: flex;
    flex-direction: row;
    & > * {
      margin-right: 1em;
    }
    a {
      color: var(--textColor);
    }
  }
  .excerpt-wrapper {
    margin-top: 1rem;
    border-top: 1px solid var(--borderColor);
    .excerpt {
      user-select: text;
      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      & > ul > li,
      & > ol > li {
        transition: $transitionColor, $transitionBorderColor;
      }
    }
    .readmore {
      text-align: right;
      display: flex;
      justify-content: right;
      font-size: 0.9em;
      color: var(--textColor);
      &:hover {
        color: var(--accentColor);
      }
      i {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
