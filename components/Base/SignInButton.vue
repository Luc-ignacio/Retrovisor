<script lang="ts" setup>
import { useAuthStore } from "~/stores/authStore";

const authStore = useAuthStore();
</script>

<template>
  <Button
    @click="authStore.signIn"
    label="Sign In With Google"
    icon="pi pi-google"
    iconPos="right"
    :loading="authStore.isLoading"
    loading-icon="pi pi-spinner-dotted pi-spin"
  >
  </Button>
</template>
