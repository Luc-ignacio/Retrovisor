<template>
  <NuxtLink
    :to="props.href"
    v-tooltip="{ value: props.showLabel ? undefined : props.label }"
    class="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-400 hover:cursor-pointer transition-all"
    :class="{
      'bg-gray-400': route.path === props.href,
      'justify-center': !props.showLabel,
    }"
  >
    <Icon :name="props.icon" size="24" :class="props.iconColor" />
    <p v-if="props.showLabel" class="transition-all">{{ props.label }}</p>
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string;
  icon: string;
  href: string;
  showLabel: boolean;
  iconColor?: string;
}>();

const route = useRoute();
</script>
