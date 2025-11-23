import { defineStore } from "pinia";
import { useMapStore } from "./mapStore";
import type { Location } from "@prisma/client";
import type { MapPoint } from "~/lib/types";

export const useLocationsStore = defineStore("useLocationsStore", () => {
  const { getLocations } = useLocations();
  const locations = ref<Location[]>();
  const loading = ref(false);

  const fetchLocations = async () => {
    loading.value = true;
    try {
      const res = await getLocations();
      locations.value = res.data;
    } catch (error) {
      console.log("Error fetching locations", error);
    } finally {
      loading.value = false;
    }
  };

  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  effect(() => {
    if (locations.value) {
      const mapPoints: MapPoint[] = [];
      const sidebarItems: SidebarItem[] = [];

      locations.value.forEach((location) => {
        const mapPoint = createPointFromLocation(location);

        mapPoints.push(mapPoint);

        sidebarItems.push({
          id: location.id,
          name: location.name,
          icon: "tabler:map-pin-filled",
          to: {
            name: "dashboard-location-slug",
            params: { slug: location.slug },
          },
          mapPoint,
        });
      });

      sidebarStore.sidebarItems = sidebarItems;
      mapStore.mapPoints = mapPoints;

      sidebarStore.loading = loading.value;
    }
  });

  return {
    fetchLocations,
    locations,
    loading,
  };
});
