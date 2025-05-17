<template>
  <div v-html="icons" style="display:none" aria-hidden="true"></div>
  <router-view />
</template>

<script setup lang="ts">
import icons from "./assets/icons.svg?raw";
</script>