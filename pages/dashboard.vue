<template>
  <div class="flex flex-1">
    <div
      class="bg-gray-300 dark:bg-neutral-700 transition-all duration-300 shrink-0"
      :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }"
    >
      <div
        class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-400 hover:cursor-pointer transition-all"
        :class="{
          'justify-end': isSidebarOpen,
          'justify-center': !isSidebarOpen,
        }"
        @click="toggleSidebar"
      >
        <Icon v-if="isSidebarOpen" name="tabler:chevron-left" size="24" />
        <Icon v-else="isSidebarOpen" name="tabler:chevron-right" size="24" />
      </div>

      <div class="flex flex-col">
        <SidebarButton
          :showLabel="isSidebarOpen"
          label="Locations"
          icon="tabler:map-2"
          href="/dashboard"
        />
        <SidebarButton
          :showLabel="isSidebarOpen"
          label="Add Location"
          icon="tabler:circle-plus"
          href="/dashboard/add"
        />

        <Divider
          v-if="sidebarStore.sidebarItems.length || locationsStore.loading"
        />

        <div v-if="locationsStore.loading" class="px-2 space-y-2">
          <Skeleton height="2.5rem" width="100%" borderRadius="8px" />
          <Skeleton height="2.5rem" width="100%" borderRadius="8px" />
        </div>

        <div v-else class="flex flex-col">
          <p
            v-if="isSidebarOpen && sidebarStore.sidebarItems.length"
            class="px-4 text-sm mb-1"
          >
            Quick Links
          </p>

          <div v-for="item in sidebarStore.sidebarItems" :key="item.id">
            <SidebarButton
              :showLabel="isSidebarOpen"
              :label="item.name"
              :icon="item.icon"
              :href="item.href"
              :iconColor="
                item.location === mapStore.selectedPoint ? 'text-cyan-400' : ''
              "
              @mouseenter="mapStore.selectedPoint = item.location"
              @mouseleave="mapStore.selectedPoint = null"
            />
          </div>
        </div>

        <Divider />

        <div
          class="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-400 hover:cursor-pointer transition-all"
          :class="{ 'justify-center': !isSidebarOpen }"
          v-tooltip="{ value: isSidebarOpen ? undefined : 'Sign Out' }"
          @click="authStore.signOut"
        >
          <i class="pi pi-sign-out" style="font-size: 1.2rem" />
          <p v-if="isSidebarOpen">Sign Out</p>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-auto bg-gray-200 dark:bg-neutral-800">
      <div
        class="flex size-full"
        :class="{ 'flex-col': route.path !== '/dashboard/add' }"
      >
        <NuxtPage />
        <Map class="flex-1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SidebarButton from "~/components/SidebarButton.vue";

const route = useRoute();

// Stores
const sidebarStore = useSidebarStore();
const locationsStore = useLocationsStore();
const authStore = useAuthStore();
const mapStore = useMapStore();

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
};

onMounted(async () => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
  await locationsStore.fetchLocations();
});
</script>
