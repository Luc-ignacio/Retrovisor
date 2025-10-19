<template>
  <div class="flex flex-col min-h-screen bg-gray-200 dark:bg-neutral-800">
    <BaseNavbar />

    <main class="flex flex-col flex-1">
      <slot />
    </main>
  </div>
</template>
