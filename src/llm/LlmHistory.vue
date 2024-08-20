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
  <div class="flex min-h-[4rem] min-w-[30rem] flex-col items-center overflow-auto">
    <template v-for="message in history" :key="message.content">
      <div
        class="my-4 max-w-[70%] rounded-[1.75rem] bg-neutral-800 px-4 py-3 text-neutral-300"
        :class="message.role === 'human' ? 'self-end' : 'self-start'"
      >
        {{ message.content }}
      </div>
    </template>
  </div>
</template>
