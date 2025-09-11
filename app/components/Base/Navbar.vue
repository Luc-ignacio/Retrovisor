<template>
  <div class="flex p-4 bg-accent text-accent-content">
    <div class="container mx-auto flex items-center justify-between">
      <div>
        <NuxtLink to="/" class="text-xl font-semibold">
          Retrovisor
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <BaseThemeToggle />

        <a class="btn btn-primary">
          Sign In With Github
          <Icon name="tabler:brand-github" size="24" />
        </a>
      </div>
    </div>
  </div>
</template>
git
