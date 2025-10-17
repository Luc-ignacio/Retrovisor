<template>
  <div
    class="container mx-auto mt-16 rounded-lg flex flex-col items-center justify-center min-h-[600px] bg-gray-300 gap-4"
  >
    <div class="max-w-4xl text-center">
      <h1 class="text-5xl font-bold">Oh no!</h1>
      <p class="py-6">
        {{ error }}
      </p>
    </div>

    <NuxtLink to="/">
      <Button label="Go Back" icon="pi pi-arrow-left" />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const error = route.query.error || "An unknown error has occurred";
</script>
