<template>
  <div class="flex items-center justify-center">
    <div
      class="border-primary-500 max-h-full max-w-full flex-none resize overflow-auto border-0"
    >
      <LlmChat
        :messages="[
          { role: 'human', content: 'Hello, world!' },
          { role: 'AI', content: 'Hello, human!' },
        ]"
        class="size-full border-2 border-red-300"
        placeholder="Chat with LLM"
        :loading="false"
        @send="(input: string) => console.log(input)"
      />
    </div>
  </div>
</template>
