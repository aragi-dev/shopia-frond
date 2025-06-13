<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  label: string;
  name: string;
  error: boolean;
  touched: boolean;
  modelValue: string | number;
  labelClass?: string;
  inputClass?: string;
  inputmode?: any;
  maxlength?: string;
  onBlur?: () => void;
}>();

const inputValue = computed({
  get: () => String(props.modelValue ?? ""),
  set: (val: string) => {
    const cleaned = val.replace(/\D+/g, "");
    emit("update:modelValue", cleaned);
  },
});
</script>

<template>
  <div class="grid gap-1">
    <label :for="props.name" :class="['text-gray-400 ml-1', props.labelClass]">
      {{ props.label }}
    </label>
    <div class="relative">
      <input
        type="text"
        :name="props.name"
        v-model="inputValue"
        :maxlength="props.maxlength"
        inputmode="numeric"
        pattern="\d*"
        @blur="props.onBlur"
        :class="[
          'py-2 px-4 border-1 border-zinc-700 text-gray-300 rounded-lg bg-zinc-800 focus:outline-none focus:border-zinc-500 w-full',
          props.inputClass,
        ]"
      />
      <span
        v-if="props.touched && props.error"
        class="absolute right-0 top-0 flex h-3 w-3 pointer-events-none"
      >
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"
        ></span>
        <span
          class="relative inline-flex h-3 w-3 rounded-full bg-red-500"
        ></span>
      </span>
    </div>
  </div>
</template>
