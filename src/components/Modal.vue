<template>
  <div v-show="props.show" class="fixed inset-0 bg-black/10 flex items-center justify-center z-50 px-4"
    @click.self="close">
    <div class="border border-zinc-700 bg-zinc-900 rounded-md grid p-4 gap-4 text-gray-300">
      <header class="grid grid-flow-col gap-4 items-center">
        <h2 class="mr-auto">{{ props.title }}</h2>
        <button class="ml-auto rounded-md p-1 hover:bg-zinc-800" @click="close">
          <Icon name="close" css="fill-zinc-400" />
        </button>
      </header>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon.vue';

const props = defineProps<{ show: boolean; title: string }>()
const emit = defineEmits(['close'] as const)

function close() {
  emit('close')
}
</script>