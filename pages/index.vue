<template>
  <div
    class="container mx-auto mt-16 rounded-lg flex flex-col items-center justify-center min-h-[600px] bg-slate-300"
  >
    <div class="max-w-4xl text-center">
      <h1 class="text-5xl font-bold">Retrovisor</h1>
      <p class="py-6">
        Capture your journeys, reflect on your paths, and keep your memories
        alive. Retrovisor is your personal travel log, a space to record,
        revisit, and share the stories behind every place you’ve explored.
      </p>
    </div>
    Locations: {{ locations }}
  </div>
</template>

<script lang="ts" setup>
const { getLocations } = useLocations();
const locations = ref();

onMounted(async () => {
  const res = await getLocations();
  locations.value = res.data;
});
</script>
