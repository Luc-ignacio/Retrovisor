<script lang="ts" setup>
const authStore = useAuthStore();

onMounted(() => {
  authStore.signOut();
});
</script>

<template>
  <div class="hero min-h-[90dvh]">
    <span class="loading loading-ring loading-xl" />
  </div>
</template>
