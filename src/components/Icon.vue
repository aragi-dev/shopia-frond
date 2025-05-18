<template>
  <svg :width="size" :height="size" :class="css" aria-hidden="true">
    <use :href="`#${name}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  css: { type: String, default: "currentColor" },
});
</script>
