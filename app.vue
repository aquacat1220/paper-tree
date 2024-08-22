<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center overflow-hidden bg-gray-100 dark:bg-gray-900"
  >
    <div class="flex h-10 w-full flex-none items-center justify-center">
      <div class="flex min-w-[20rem] basis-[80rem] justify-between">
        <NuxtLink
          class="flex-none p-2 text-2xl font-bold text-black dark:text-white"
          to="/"
        >
          paper-tree
        </NuxtLink>
        <div
          class="flex-none p-2 text-2xl font-bold text-black dark:text-white"
        >
          {{ route.fullPath }}
        </div>
      </div>
    </div>
    <NuxtPage class="w-full max-w-[75rem] grow basis-0" />
  </div>
</template>
