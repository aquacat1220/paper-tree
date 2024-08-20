<script setup lang="ts">
import { ref, inject } from 'vue'
import LlmApiKeyInput from './LlmApiKeyInput.vue'
import LlmInput from './LlmInput.vue'
import LlmHistory from './LlmHistory.vue'
import type { VueCookies } from 'vue-cookies'

const $cookies = inject<VueCookies>('$cookies') as VueCookies
const openaiApiKey = ref(($cookies.get('openaiApiKey') as string) ?? '')

let onLlmApiKeyInput = (input: string) => {
  let apiKey = input.trim()
  openaiApiKey.value = apiKey
  $cookies.set('openaiApiKey', apiKey)
}

const history = ref([
  { role: 'Ai', content: 'Hi I am an AI assistant.' },
  { role: 'Human', content: 'Tell me about your favorite joke.' }
])

let onLlmInput = (input: string) => {
  history.value.push({ role: 'Human', content: input })
}
</script>

<template>
  <div class="flex min-h-[15rem] min-w-[30rem] flex-col items-center justify-center">
    <template v-if="openaiApiKey === ''">
      <LlmApiKeyInput class="basis-[20rem]" @input="onLlmApiKeyInput" />
    </template>
    <template v-else>
      <LlmHistory class="w-full max-w-[75rem] grow basis-0" :history="history" />
      <LlmInput class="mb-14 max-h-[20rem] w-full max-w-[50rem] flex-none" @input="onLlmInput" />
    </template>
  </div>
</template>
