<template>
  <MglMap :map-style="style" :center="center" :zoom="zoom">
    <MglNavigationControl />

    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <Icon
          name="tabler:map-pin-filled"
          size="30"
          class="text-cyan-400"
          v-tooltip="{ value: point.label, class: 'text-sm' }"
        />
      </template>
    </MglMarker>
  </MglMap>
</template>

<script lang="ts" setup>
import { useMapStore } from "~/stores/mapStore";

const colorMode = useColorMode();

const style = computed(() =>
  colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty"
);

// Australia
const center = [133.766467, -26.477063];
const zoom = 4.2;

const mapStore = useMapStore();

onMounted(() => {
  mapStore.init();
});
</script>
