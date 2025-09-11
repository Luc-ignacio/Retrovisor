<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <button class="btn btn-secondary" :disabled="authStore.isLoading" @click="authStore.signIn">
    Sign In With Google
    <span v-if="authStore.isLoading" class="loading loading-ring loading-md" />
    <Icon v-else name="tabler:brand-google" size="24" />
  </button>
</template>
