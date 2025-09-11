<template>
  <div class="flex p-4 bg-primary text-primary-content">
    <div class="container mx-auto flex items-center justify-between">
      <div>
        <NuxtLink to="/" class="text-xl font-semibold">
          Retrovisor
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <BaseThemeToggle />

        <AuthButton />
      </div>
    </div>
  </div>
</template>
