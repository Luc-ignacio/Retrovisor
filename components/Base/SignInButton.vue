<script lang="ts" setup>
// const authStore = useAuthStore();
</script>

<template>
  <Button>
    <p>Sign In With Google</p>
    <Icon name="tabler:brand-google" size="24" />
  </Button>

  <!-- <button
    v-else
    class="btn btn-secondary"
    :disabled="authStore.isLoading"
    @click="authStore.signIn"
  >
    Sign In With Google
    <span v-if="authStore.isLoading" class="loading loading-ring loading-md" />
    <Icon v-else name="tabler:brand-google" size="24" />
  </button> -->
</template>
