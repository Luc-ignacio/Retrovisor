<template>
  <div
    class="container mx-auto mt-16 rounded-lg flex flex-col items-center justify-center min-h-[600px] bg-gray-300 gap-4"
  >
    <div class="max-w-4xl text-center">
      <h1 class="text-5xl font-bold">Retrovisor</h1>
      <p class="py-6">
        Capture your journeys, reflect on your paths, and keep your memories
        alive. Retrovisor is your personal travel log, a space to record,
        revisit, and share the stories behind every place you’ve explored.
      </p>
    </div>

    <div v-if="authStore.user">
      <Button
        label="Go To Dashboard"
        icon="pi pi-arrow-right"
        iconPos="right"
        @click="navigateTo('/dashboard')"
      />
    </div>

    <div v-else>
      <BaseSignInButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const { getLocations } = useLocations();
const locations = ref();

onMounted(async () => {
  const res = await getLocations();
  locations.value = res.data;
});
</script>
