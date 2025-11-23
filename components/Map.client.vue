<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
    @map:click="onMapClick"
  >
    <MglNavigationControl />

    <!-- Locations markers -->
    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div v-tooltip.top="{ value: point.name, class: 'text-sm' }">
          <Icon
            name="tabler:map-pin-filled"
            size="30"
            :class="
              isPointSelected(point, mapStore.selectedPoint)
                ? 'text-cyan-400'
                : 'text-pink-400'
            "
            @mouseenter="mapStore.selectPointWithoutFlyTo(point)"
            @mouseleave="mapStore.selectPointWithoutFlyTo(null)"
          />
        </div>
      </template>

      <MglPopup>
        <h3 class="text-base font-semibold">{{ point.name }}</h3>
        <p>{{ point.description }}</p>
        <div class="flex justify-end mt-2">
          <Button v-if="point.to" size="small" outlined>
            <NuxtLink :to="point.to">
              {{ point.toLabel }}
            </NuxtLink>
          </Button>
        </div>
      </MglPopup>
    </MglMarker>

    <!-- Draggable marker -->
    <MglMarker
      :coordinates="[mapStore.draggablePoint.long, mapStore.draggablePoint.lat]"
      draggable
      class-name="z-50"
      v-if="mapStore.draggablePoint"
      @update:coordinates="updateDraggablePoint"
    >
      <template #marker>
        <div
          v-tooltip.top="{
            value: 'Drag to your desired location',
            class: 'text-sm',
          }"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="32"
            class="text-orange-400"
          />
        </div>
      </template>
    </MglMarker>
  </MglMap>
</template>

<script lang="ts" setup>
import { useMapStore } from "~/stores/mapStore";
import type { LngLat } from "maplibre-gl";
import type { MglEvent } from "@indoorequal/vue-maplibre-gl";

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

const updateDraggablePoint = (location: LngLat) => {
  if (mapStore.draggablePoint) {
    (mapStore.draggablePoint.long = location.lng),
      (mapStore.draggablePoint.lat = location.lat);
  }
};

const onMapClick = (mglEvent: MglEvent<"click">) => {
  if (mapStore.draggablePoint) {
    mapStore.draggablePoint.lat = mglEvent.event.lngLat.lat;
    mapStore.draggablePoint.long = mglEvent.event.lngLat.lng;
  }
};

onMounted(() => {
  mapStore.init();
});
</script>
