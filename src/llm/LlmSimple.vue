<script setup lang="ts">
import { ref } from 'vue'
import LlmInput from './LlmInput.vue'
import LlmHistory from './LlmHistory.vue'

let onSent = (input: string) => {
  history.value.push({ role: 'Human', content: input })
}

const history = ref([
  { role: 'Ai', content: 'Hi I am an AI assistant.' },
  { role: 'Human', content: 'Tell me about your favorite joke.' }
])
</script>

<template>
  <div class="flex min-h-[15rem] flex-col items-center">
    <LlmHistory class="w-full max-w-[75rem] grow" :history="history" />
    <LlmInput class="mb-14 max-h-[20rem] w-full max-w-[50rem] flex-none" @sent="onSent" />
  </div>
</template>
