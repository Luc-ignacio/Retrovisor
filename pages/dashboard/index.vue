<template>
  <div v-if="loading" class="flex flex-col h-full items-center justify-center">
    <i class="pi pi-spin pi-spinner-dotted" style="font-size: 3rem"></i>
  </div>

  <div v-else class="px-8 mt-9 mb-4 space-y-4">
    <h1 class="text-xl font-medium">Locations</h1>

    <div v-if="locations?.length" class="flex flex-nowrap overflow-auto gap-4">
      <div v-for="location in locations" :key="location.id">
        <Card class="!w-72">
          <template #title>{{ location.name }}</template>
          <template #content>
            <p class="m-0">
              {{ location.description }}
            </p>
          </template>
        </Card>
      </div>
    </div>

    <div v-else class="flex flex-col gap-2 mt-4">
      <p>Add a location to get started.</p>

      <Button
        label="Add Location"
        class="!w-fit"
        @click="navigateTo('/dashboard/add')"
      >
        <template #icon>
          <Icon name="tabler:circle-plus" size="24" />
        </template>
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const locationsStore = useLocationsStore();
const { locations, loading } = storeToRefs(locationsStore);

onMounted(async () => {
  await locationsStore.fetchLocations();
});
</script>
