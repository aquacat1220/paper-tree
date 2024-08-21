<script setup lang="ts"></script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center overflow-hidden bg-neutral-900"
  >
    <div class="flex h-10 w-full flex-none items-center justify-center">
      <div class="flex min-w-[40rem] basis-[50rem] justify-between">
        <div class="flex-none p-2 text-xl font-bold text-white">paper-tree</div>
        <div class="flex-none p-2 text-xl font-bold text-white">
          @play/lc/simple
        </div>
      </div>
    </div>
    <NuxtPage class="w-full max-w-[75rem] grow basis-0" />
  </div>
</template>
