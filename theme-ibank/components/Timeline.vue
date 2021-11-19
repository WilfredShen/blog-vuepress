<template>
  <div class="timeline card">
    <template v-for="[year, archive] in archives">
      <h2 class="year bold">{{ year }}</h2>
      <div class="timeline-list">
        <template class="item" v-for="[month, monthData] in Object.entries(archive)">
          <template v-for="[day, list] in Object.entries(monthData)">
            <template v-for="item in list">
              <router-link class="item link" :to="item.$data.path">
                <span class="date bold">{{ `${month.padStart(2, "0")}-${day.padStart(2, "0")}` }}</span>
                <span class="title">{{ item.$data.title }}</span>
              </router-link>
            </template>
          </template>
        </template>
      </div>
    </template>
  </div>
</template>
<script setup>
defineProps({ archives: Object });
</script>
<style lang="scss">
@use "../styles/variables" as *;

.timeline {
  padding: 1rem 1.5rem;

  h2 {
    position: sticky;
    top: $navbarHeight;
    background-color: var(--mainBg);

    &:first-child {
      margin-top: 0;
    }
  }

  .timeline-list {
    display: flex;
    flex-direction: column;

    .item {
      padding: 0.3rem 1rem;
      cursor: pointer;
      transition: color 0.2s, background-color 0.2s, border-width 0.1s;
      border-left: 0 solid var(--accentColor);

      a,
      span {
        color: var(--textColor);
      }

      .title {
        margin-left: 1rem;
      }

      &:hover {
        background-color: var(--bodyBg);
        border-left: 5px solid var(--accentColor);
        a,
        span {
          color: var(--accentColor);
        }
      }
    }
  }
}
</style>
