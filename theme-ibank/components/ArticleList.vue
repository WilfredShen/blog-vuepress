<template>
  <div class="article-list">
    <template v-for="item in articles">
      <div v-if="item.$data" class="article-card card">
        <h2 class="title">
          <router-link :to="item.$data.path">{{ item.$data.title }}</router-link>
        </h2>
        <div class="meta-info">
          <a
            class="author"
            title="作者"
            v-if="item.$data.frontmatter.author.link"
            :href="item.$data.frontmatter.author.link"
            target="_blank"
          >
            <i class="iconfont icon-user"></i>{{ item.$data.frontmatter.author.name }}
          </a>
          <span title="作者" v-else><i class="iconfont icon-user"></i>{{ item.$data.frontmatter.author.name }}</span>
          <span title="创建日期"><i class="iconfont icon-calendar"></i>{{ item.$data.frontmatter.date?.toString().slice(0, 10) }}</span>
          <Tags :tags="item.$data.frontmatter.tags" gutter="0.5em" />
        </div>
        <div class="excerpt-wrapper" v-if="item.$data.excerpt">
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
<script setup lang="ts">
import Tags from "./Tags.vue";

defineProps({ articles: Array as () => Node[] });
</script>
<style lang="scss">
@use "../styles/variables" as *;

.article-card {
  padding: 1rem 1.5rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  a {
    color: var(--textColor);
  }

  .title {
    border: none;
    cursor: pointer;
    margin-top: 0.5rem;
    a:hover {
      color: var(--accentColor);
    }
  }

  .meta-info {
    font-size: 0.8em;
    display: flex;
    flex-direction: row;

    & > * {
      margin-right: 1em;
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

        &:not(:hover) {
          max-width: 2rem;
        }
      }
    }
  }
}
</style>
