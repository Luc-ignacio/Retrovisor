<template>
  <NuxtLink
    :to="props.href || props.to"
    v-tooltip="{ value: props.showLabel ? undefined : props.label }"
    class="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-400 hover:cursor-pointer transition-all"
    :class="{
      'bg-gray-400': route.path === props.href,
      'justify-center': !props.showLabel,
    }"
  >
    <Icon :name="props.icon" size="20" :class="props.iconColor" />
    <p v-if="props.showLabel" class="transition-all text-sm">
      {{ props.label }}
    </p>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  label: string;
  icon: string;
  href?: string;
  to?: RouteLocationRaw;
  showLabel: boolean;
  iconColor?: string;
}>();

const route = useRoute();
</script>
