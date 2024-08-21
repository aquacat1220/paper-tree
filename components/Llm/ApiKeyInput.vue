<script setup lang="ts">
const input = ref("");

// Send input on "Enter", but not "Shift+Enter".
const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    if (input.value.trim() === "") return;
    const openaiApiKey = useCookie("openaiApiKey");
    openaiApiKey.value = input.value;
  }
};
</script>

<template>
  <div class="flex min-h-[15rem] min-w-[30rem] items-center justify-center">
    <UTextarea
      v-model="input"
      class="flex h-full grow basis-0 items-center justify-center"
      textarea-class="max-h-full text-center text-2xl text-black dark:text-white placeholder:text-3xl placeholder:text-primary-500 placeholder:dark:text-primary-400"
      color="primary"
      variant="none"
      placeholder="Enter your OpenAI API key"
      autoresize
      :rows="1"
      size="xl"
      @keydown="onKeyDown"
    />
  </div>
</template>
