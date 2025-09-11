<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div v-if="!authStore.isLoading && authStore.user" class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-secondary m-1">
      <div v-if="authStore.user.image" class="avatar">
        <div class="w-8 rounded-full">
          <img :src="authStore.user.image" :alt="authStore.user.name">
        </div>
      </div>
      {{ authStore.user.name }}
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-base-300 mt-2 rounded-box z-1 w-44 p-2 shadow-sm">
      <li>
        <NuxtLink to="/sign-out" class="btn btn-secondary items-center gap-2">
          <Icon name="tabler:logout-2" size="24" />
          Sign Out
        </NuxtLink>
      </li>
    </ul>
  </div>

  <button v-else class="btn btn-secondary" :disabled="authStore.isLoading" @click="authStore.signIn">
    Sign In With Google
    <span v-if="authStore.isLoading" class="loading loading-ring loading-md" />
    <Icon v-else name="tabler:brand-google" size="24" />
  </button>
</template>
