<template>
  <div class="navbar bg-primary text-primary-content">
    <div class="navbar-start pl-2">
      <NuxtLink to="/" class="text-xl font-semibold">
        Retrovisor
      </NuxtLink>
    </div>

    <div class="flex items-center gap-2 navbar-end pr-2">
      <BaseThemeToggle />

      <AuthButton />
    </div>
  </div>
</template>
