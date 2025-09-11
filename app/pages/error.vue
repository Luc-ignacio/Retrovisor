<script lang="ts" setup>
const route = useRoute();

const error = route.query.error || "An unknown error occurred";
</script>

<template>
  <div class="hero bg-base-300 container mx-auto mt-4">
    <div class="hero-content text-center min-h-96">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Oh no!  :(
        </h1>
        <p class="py-6">
          {{ error }}
        </p>

        <NuxtLink to="/" class="btn btn-secondary items-center">
          <p>Home</p>
          <Icon name="tabler:arrow-left" size="24" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
