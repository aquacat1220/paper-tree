<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import LlmApiKeyInput from './LlmApiKeyInput.vue'
import LlmInput from './LlmInput.vue'
import LlmHistory from './LlmHistory.vue'
import type { VueCookies } from 'vue-cookies'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatOpenAI } from '@langchain/openai'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables'

const $cookies = inject<VueCookies>('$cookies') as VueCookies
const openaiApiKey = ref(($cookies.get('openaiApiKey') as string) ?? '')

const onLlmApiKeyInput = (input: string) => {
  let apiKey = input.trim()
  openaiApiKey.value = apiKey
  $cookies.set('openaiApiKey', apiKey)
}

const createSimpleChain = () => {
  const chatPrompt = ChatPromptTemplate.fromMessages([
    ['system', 'Translate the following into korean:'],
    ['human', '{input}']
  ])

  const model = new ChatOpenAI({
    model: 'gpt-4o-mini',
    apiKey: openaiApiKey.value
  })

  const parser = new StringOutputParser()

  const simpleChain = RunnableSequence.from([
    { input: new RunnablePassthrough() },
    chatPrompt,
    model,
    parser
  ])
  return simpleChain
}

const simpleChain = computed(createSimpleChain)

const history = ref([] as { role: string; content: string }[])

const onLlmInput = async (input: string) => {
  history.value.push({ role: 'human', content: input })
  const answer = await simpleChain.value.invoke(input)
  history.value.push({ role: 'LLM', content: answer })
}
</script>

<template>
  <div class="flex min-h-[15rem] min-w-[30rem] flex-col items-center justify-center">
    <template v-if="openaiApiKey === ''">
      <LlmApiKeyInput class="basis-[20rem]" @input="onLlmApiKeyInput" />
    </template>
    <template v-else>
      <LlmHistory class="w-full max-w-[75rem] grow basis-0" :history="history" />
      <LlmInput class="mb-14 max-h-[20rem] w-full max-w-[75rem] flex-none" @input="onLlmInput" />
    </template>
  </div>
</template>
