<template>
  <div class="article-info">
    <Breadcrumb v-if="navs && navs.length" :navs="navs" :home="true" />
    <div class="meta-info">
      <Tags :tags="frontmatter.tags" gutter="0.5em" />
      <a class="author" title="作者" v-if="frontmatter.author.link" :href="frontmatter.author.link" target="_blank">
        <i class="iconfont icon-user"></i>{{ frontmatter.author.name }}
      </a>
      <span title="作者" v-else><i class="iconfont icon-user"></i>{{ frontmatter.author.name }}</span>
      <span title="创建日期"><i class="iconfont icon-calendar"></i>{{ frontmatter.date.slice(0, 10) }}</span>
    </div>
  </div>
  <ArticleTitle :title="frontmatter.title" />
</template>
<script setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import { usePageData } from "@vuepress/client";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import Breadcrumb from "./Breadcrumb.vue";
import ArticleTitle from "./ArticleTitle.vue";
import Tags from "./Tags.vue";

const route = useRoute();
const themeData = useThemeData();

const page = ref(null);
const navs = ref(null);
const frontmatter = ref(null);

const getBreadcrumb = (node, keys) => {
  if (!keys) return;
  const list = [];
  for (let i = 0, e = node.$children[keys[i]]; i < keys.length; i++, e = e.$children[keys[i]])
    list.push({ text: keys[i], link: e.$data.frontmatter && e.$data.frontmatter.permalink });
  return list;
};

const updateData = () => {
  page.value = usePageData().value;
  navs.value = getBreadcrumb(themeData.value.categories, page.value.frontmatter.categories);
  frontmatter.value = page.value.frontmatter;
};
watch(route, updateData);
updateData();
</script>
<style lang="scss">
.article-info {
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row;
  justify-content: right;

  .breadcrumb {
    flex: 1;
  }

  .meta-info {
    font-size: 0.8em;
    display: flex;
    flex-direction: row;

    & > span,
    & > a {
      margin-left: 1em;
      color: var(--textColor);
    }
  }
}
</style>
