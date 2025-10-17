<template>
  <Button
    v-if="!authStore.isLoading && authStore.user"
    :label="authStore.user?.name"
    @click="togglePopover"
  >
    <template #icon>
      <div v-if="authStore.user.image">
        <img
          :src="authStore.user.image"
          :alt="authStore.user.name"
          class="w-6 h-6 rounded-full"
        />
      </div>

      <i v-else class="pi pi-user" />
    </template>
  </Button>

  <Button
    v-else
    @click="authStore.signIn"
    label="Sign In With Google"
    icon="pi pi-google"
    iconPos="right"
    :loading="authStore.isLoading"
    loading-icon="pi pi-spinner-dotted pi-spin"
  >
  </Button>

  <Popover ref="popover" v-if="!authStore.isLoading && authStore.user">
    <Button
      icon="pi pi-sign-out"
      severity="secondary"
      size="small"
      label="Sign Out"
      :loading="authStore.isLoading"
      @click="authStore.signOut()"
    />
  </Popover>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();

const popover = ref();
const togglePopover = (event) => {
  popover.value.toggle(event);
};
</script>
