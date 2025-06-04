<template>
  <div v-show="props.show" class="fixed inset-0 bg-black/10 flex items-center justify-center z-50 px-4"
    @click.self="close">
    <div class="border border-zinc-700 bg-zinc-900 rounded-3xl grid p-4 gap-4 text-gray-300 modal-content">
      <header class="grid grid-flow-col gap-4 items-center">
        <h2 class="mr-auto">{{ props.title }}</h2>
        <button class="ml-auto cursor-pointer" @click="close">
          <Icon name="circle" size="18"
            css="transition-all fill-red-400 hover:scale-110 hover:fill-red-500 active:scale-80 active:fill-zinc-700" />
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