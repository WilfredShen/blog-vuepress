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
              <i class="iconfont icon-user"></i>{{ item.$data.frontmatter.author.name }}
            </a>
            <span v-else title="作者"><i class="iconfont icon-user"></i>{{ item.$data.frontmatter.author.name }}</span>
          </template>
          <span title="创建日期"><i class="iconfont icon-calendar"></i>{{ item.$data.frontmatter.date?.toString().slice(0, 10) }}</span>
          <Tags v-if="item.$data.frontmatter.tags" :tags="item.$data.frontmatter.tags" gutter="0.5em" />
        </div>
        <div v-if="item.$data.excerpt" class="excerpt-wrapper">
          <!-- eslint-disable-next-line -->
          <div class="excerpt" v-html="item.$data.excerpt"></div>
          <div class="readmore">
            <div class="card">
              <router-link :to="item.$data.path"><span>阅读全文</span><i class="iconfont icon-more"></i></router-link>
            </div>
          </div>
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

    .readmore {
      text-align: right;
      margin-right: 0.5rem;
      display: flex;
      justify-content: right;

      .card {
        width: fit-content;
        padding: 0.4em 0;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: right;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        transition: max-width 0.5s ease, $transitionBgColor, $transitionColor;
        max-width: 7rem;

        i {
          padding: 0 0.5rem;
        }

        span {
          margin-left: 0.8rem;
          text-align: right;
          display: inline-block;
        }

        a {
          color: var(--textColor);
        }

        &:not(:hover) {
          max-width: 2rem;
        }
      }
    }
  }
}
</style>
