<script setup lang="ts">
const props = defineProps<{
  history: {
    role: string
    content: string
  }[]
}>()

const history = props.history
</script>

<template>
  <div class="flex min-h-16 min-w-[30rem] flex-col overflow-auto bg-red-300">
    <template v-for="message in history" :key="message.content">
      <div class="bg-blue-300">{{ message }}</div>
    </template>
  </div>
</template>
