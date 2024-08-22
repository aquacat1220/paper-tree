<template>
  <div class="flex items-center justify-center">
    <div
      class="border-primary-400 h-full max-h-full w-full max-w-full flex-none resize overflow-auto border"
    >
      <LlmChat
        :messages="[
          { role: 'human', content: 'Hello, world!' },
          { role: 'AI', content: 'Hello, human!' },
        ]"
        class="size-full"
        placeholder="Chat with LLM"
        :loading="false"
        @send="(input: string) => console.log(input)"
      />
    </div>
  </div>
</template>
