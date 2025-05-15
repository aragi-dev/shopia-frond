<template>
  <div v-html="sprite" style="display:none" aria-hidden="true"></div>
  <router-view />
</template>

<script setup lang="ts">
import sprite from "./assets/sprite.svg?raw";
</script>