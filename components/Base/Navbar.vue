<template>
  <Menubar
    :pt="{
      root: {},
    }"
  >
    <template #start>
      <div class="pl-4">
        <NuxtLink to="/" class="text-xl font-semibold"> Retrovisor </NuxtLink>
      </div>
    </template>

    <template #end>
      <div class="flex gap-4 pr-4">
        <!-- <div class="flex items-center gap-2">
          <i class="pi pi-sun" style="font-size: 1.2em"></i>
          <div @click="toggleDarkMode()" class="flex items-center">
            <ToggleSwitch v-model="isAppDark" />
          </div>
          <i class="pi pi-moon"></i>
        </div> -->

        <BaseSignInButton />
      </div>
    </template>
  </Menubar>
</template>

<script lang="ts" setup>
const isAppDark = ref(true);

function toggleDarkMode() {
  document.documentElement.classList.toggle("app-dark");
}
</script>
