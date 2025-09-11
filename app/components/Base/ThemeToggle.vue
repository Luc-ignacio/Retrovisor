<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dracula";
  },
  set(value) {
    colorMode.preference = value ? "dracula" : "bumblebee";
  },
});
</script>

<template>
  <label class="swap swap-rotate">
    <!-- this hidden checkbox controls the state -->
    <input v-model="isDark" type="checkbox">

    <!-- sun icon -->
    <Icon name="tabler:sun-high" class="swap-on" size="24" />

    <!-- moon icon -->
    <Icon name="tabler:moon-filled" class="swap-off" size="24" />
  </label>
</template>
