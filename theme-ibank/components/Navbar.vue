<template>
  <header class="navbar" ref="navbar">
    <NavLinks />
    <ToggleThemeButton />
  </header>
</template>
<script setup>
import { ref } from "vue";
import NavLinks from "./NavLinks.vue";
import ToggleThemeButton from "./ToggleThemeButton.vue";

const navbar = ref(null);
</script>
