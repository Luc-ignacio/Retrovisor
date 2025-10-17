import { defineStore } from "pinia";

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

  watchEffect(() => {
    if (locations.value) {
      sidebarStore.sidebarItems = locations.value.map((location) => {
        return {
          id: location.id,
          label: location.name,
          icon: "tabler:map-pin-filled",
          href: "#",
        };
      });

      sidebarStore.loading = loading.value;
    }
  });

  return {
    fetchLocations,
    locations,
    loading,
  };
});
