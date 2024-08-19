<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'

const emit = defineEmits<{
  sent: [input: string]
}>()

// Callback to trigger `sent` event, so the parent can react accordingly.
const sendInput = () => {
  emit('sent', input.value)
  input.value = ''
}

// Send input on "Enter", but not "Shift+Enter".
const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendInput()
  }
}

// Have the textarea autosize.
const { textarea, input } = useTextareaAutosize()
</script>

<template>
  <div class="flex min-h-14 min-w-[30rem] items-center rounded-[1.75rem] bg-neutral-700">
    <div class="flex h-full shrink-0 grow basis-[20rem] items-center px-4 py-2">
      <textarea
        class="max-h-full grow basis-0 resize-none bg-neutral-700 text-base text-white placeholder:text-base focus-visible:outline-none"
        placeholder="Chat with LLM"
        ref="textarea"
        v-model="input"
        @keydown="onKeyDown"
      ></textarea>
    </div>
    <button
      class="mr-2 size-10 flex-none rounded-full bg-white p-2 hover:bg-neutral-200"
      @click="sendInput"
    >
      <svg class="fill-neutral-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g id="_01_align_center" data-name="01 align center">
          <path
            d="M1.444,6.669a2,2,0,0,0-.865,3.337l3.412,3.408V20h6.593l3.435,3.43a1.987,1.987,0,0,0,1.408.588,2.034,2.034,0,0,0,.51-.066,1.978,1.978,0,0,0,1.42-1.379L23.991.021ZM2,8.592l17.028-5.02L5.993,16.586v-4Zm13.44,13.424L11.413,18h-4L20.446,4.978Z"
          />
        </g>
      </svg>
    </button>
  </div>
</template>
