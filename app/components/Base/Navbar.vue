<template>
  <div class="navbar bg-accent text-accent-content">
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        Retrovisor
      </NuxtLink>
    </div>

    <div class="navbar-end items-center gap-2">
      <BaseThemeToggle />
      <a class="btn btn-primary">
        Sign In With Github
        <Icon name="tabler:brand-github" size="24" />
      </a>
    </div>
  </div>
</template>
