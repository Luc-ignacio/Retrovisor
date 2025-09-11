<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div class="hero bg-base-300 container mx-auto mt-4">
    <div class="hero-content text-center min-h-96">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Retrovisor
        </h1>
        <p class="py-6">
          Capture your journeys, reflect on your paths, and keep your memories alive. Retrovisor is your personal travel log, a space to record, revisit, and share the stories behind every place you’ve explored.
        </p>

        <AuthButton v-if="!authStore.user" />

        <NuxtLink v-else to="/dashboard">
          <button class="btn btn-secondary">
            Go to Dashboard!
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
