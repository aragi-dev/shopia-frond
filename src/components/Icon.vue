<template>
  <svg
    :width="size"
    :height="size"
    :class="css"
    :viewBox="icon.viewBox"
    aria-hidden="true"
  >
    <path v-for="(d, i) in icon.paths" :key="i" :d="d" />
  </svg>
</template>

<script setup lang="ts">
import IconName from "@/utils/enums/IconName";
import iconsDataJson from "../assets/icons.json";
import { error } from "../utils/Logger";

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  css: { type: String, default: "currentColor" },
});

interface IIconData {
  viewBox: string;
  paths: string[];
}

const iconsData = iconsDataJson as Record<IconName, IIconData>;

function getIconData(iconName: IconName): IIconData {
  if (iconsData[iconName]) return iconsData[iconName];
  error(`icon '${iconName}' not found`);
  return iconsData[IconName.warning];
}

const icon = getIconData(props.name as IconName);
</script>