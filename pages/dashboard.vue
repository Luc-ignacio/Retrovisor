<template>
  <div class="flex flex-1">
    <div
      class="bg-gray-300 transition-all duration-300"
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

    <div class="flex-1 bg-gray-200">
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SidebarButton from "~/components/SidebarButton.vue";

const authStore = useAuthStore();

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
};

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});
</script>
