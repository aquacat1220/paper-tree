<script setup lang="ts">
const props = defineProps<{
  messages: { alignRight: boolean; content: string }[]; // History of messages to display.
  placeholder: string; // Placeholder for chat input.
  loading: boolean;
}>();
const emit = defineEmits<{
  send: [input: string]; // Triggered when user sends an input.
}>();

const messages = props.messages;
const placeholder = props.placeholder;

const input = ref("");

const send = () => {
  if (input.value === "") return;
  emit("send", input.value);
  input.value = "";
};

// Send input on "Enter", but not "Shift+Enter".
const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    send();
  }
};
</script>

<template>
  <div class="flex min-h-[15rem] min-w-[20rem] flex-col items-center">
    <div
      class="flex w-full max-w-[75rem] grow basis-0 flex-col items-center justify-start overflow-auto"
    >
      <template v-for="message in messages" :key="message.content">
        <div
          class="bg-primary-500 dark:bg-primary-500 my-4 max-w-[70%] whitespace-pre-wrap break-words rounded-[1.75rem] px-4 py-3 text-white dark:text-white"
          :class="message.alignRight ? 'self-end' : 'self-start'"
        >
          {{ message.content }}
        </div>
      </template>
    </div>
    <div class="flex max-h-[10rem] w-full max-w-[50rem] flex-none items-end">
      <UTextarea
        v-model="input"
        class="h-full grow basis-0"
        textarea-class="max-h-full"
        color="primary"
        variant="outline"
        :placeholder
        autoresize
        :rows="1"
        size="xl"
        @keydown="onKeyDown"
      />
      <UButton
        class="ml-2 flex-none"
        icon="i-heroicons-chat-bubble-oval-left"
        size="xl"
        square
        :loading
        :disabled="loading"
        @click="send"
      />
    </div>
  </div>
</template>
