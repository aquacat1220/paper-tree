<script setup lang="ts">
import { ref } from 'vue'
import LlmInput from './LlmInput.vue'

const onSent = (input: string) => {
  placeholder.value += ` New input: ${input}`
}

const placeholder = ref('Placeholder for LLM responses.')
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="w-full max-w-[75rem] grow bg-red-200">{{ placeholder }}</div>
    <LlmInput class="mb-14 max-h-[20rem] w-full max-w-[50rem] flex-none" @sent="onSent" />
  </div>
</template>
