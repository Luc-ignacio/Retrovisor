<template>
  <div
    v-if="loading"
    class="flex flex-col min-h-52 items-center justify-center"
  >
    <i class="pi pi-spin pi-spinner-dotted" style="font-size: 3rem"></i>
  </div>

  <div v-else class="px-8 mt-9 space-y-4 min-h-48">
    <div v-if="location" class="flex flex-col gap-2">
      <h1 class="text-lg font-medium">{{ location.name }}</h1>

      <p class="text-sm">{{ location.description }}</p>

      <p
        v-if="!location.LocationLog.length"
        class="text-sm italic mt-2 text-gray-600 dark:text-gray-300"
      >
        Add a location log to get started
      </p>

      <Button
        severity="primary"
        size="small"
        class="!w-fit"
        label="Add Location Log"
        loading-icon="pi pi-spinner-dotted pi-spin"
      >
        <template #icon>
          <Icon name="tabler:map-pin-plus" size="24" />
        </template>
      </Button>
    </div>

    <Button
      v-if="!location && !loading"
      severity="primary"
      size="small"
      label="Back to Dashboard"
      loading-icon="pi pi-spinner-dotted pi-spin"
      @click="navigateTo('/dashboard')"
    >
      <template #icon>
        <Icon name="tabler:arrow-left" size="20" />
      </template>
    </Button>
  </div>
</template>

<script lang="ts" setup>
import type { Location } from "@prisma/client";
const { getLocationBySlug } = useLocations();

const route = useRoute();
const toast = useToast();

const mapStore = useMapStore();

const slug = route.params.slug;

const loading = ref(false);
const location = ref<Location>();

const getLocation = async () => {
  loading.value = true;
  try {
    const res = await getLocationBySlug(slug);
    location.value = res.data;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Location not found",
      life: 5000,
    });
  } finally {
    loading.value = false;
  }
};

effect(() => {
  if (location.value) {
    mapStore.mapPoints = [location.value];
  }
});

onMounted(async () => {
  await getLocation();
});
</script>
