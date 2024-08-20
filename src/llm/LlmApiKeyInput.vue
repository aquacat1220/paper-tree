<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'

const { textarea, input } = useTextareaAutosize()

const emit = defineEmits<{
  input: [input: string]
}>()

// Callback to trigger `input` event, so the parent can react accordingly.
const notifyInput = () => {
  emit('input', input.value)
  input.value = ''
}

// Send input on "Enter", but not "Shift+Enter".
const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    notifyInput()
  }
}
</script>

<template>
  <div class="flex min-h-[15rem] min-w-[30rem] items-center justify-center">
    <textarea
      class="max-h-full w-full flex-none resize-none bg-inherit p-2 text-center text-2xl text-white placeholder:text-3xl placeholder:text-neutral-500 focus-visible:outline-none"
      placeholder="Enter your OpenAI API key"
      autofocus
      ref="textarea"
      v-model="input"
      @keydown="onKeyDown"
    ></textarea>
  </div>
</template>
