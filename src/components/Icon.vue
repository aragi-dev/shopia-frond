<template>
  <svg :width="size" :height="size" :class="color" aria-hidden="true">
    <use :href="`#${name}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  color: { type: String, default: 'currentColor' }
})
</script>
