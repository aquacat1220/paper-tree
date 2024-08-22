<script setup lang="ts">
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnableSequence,
  RunnablePassthrough,
  RunnableWithMessageHistory,
} from "@langchain/core/runnables";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";

const openaiApiKey = useCookie("openaiApiKey");
openaiApiKey.value = openaiApiKey.value || "";

const forgetApiKey = () => {
  openaiApiKey.value = "";
};

const histories = ref(new Map<string, ChatMessageHistory>());

const getMessageHistory = (sessionId: string) => {
  if (!histories.value.has(sessionId)) {
    histories.value.set(sessionId, new ChatMessageHistory());
  }
  return histories.value.get(sessionId) as ChatMessageHistory; // The cast never fails, since we checked for the existance of the key.
};

const createConversationalChain = () => {
  const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant."],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: openaiApiKey.value as string, // The cast won't fail, since the value is never `null` or `undefined`.
  });

  const parser = new StringOutputParser();

  // Takes `{ input: string, chat_history: BaseMessage[] }` and outputs `string`.
  const simpleChain = RunnableSequence.from([chatPrompt, model, parser]);

  // Takes `string` and outputs `string`.
  const conversationalChain = RunnableSequence.from([
    { input: new RunnablePassthrough() },
    new RunnableWithMessageHistory({
      runnable: simpleChain,
      getMessageHistory,
      inputMessagesKey: "input",
      historyMessagesKey: "chat_history",
    }),
  ]);

  return conversationalChain;
};

const conversationalChain = computed(createConversationalChain);

const sessionId = ref("made-by-aquacat1220");
const messages = ref([] as { alignRight: boolean; content: string }[]);
const loading = ref(false);

const invokeChain = async (input: string) => {
  loading.value = true;
  messages.value.push({ alignRight: true, content: input });

  try {
    const answer = await conversationalChain.value.invoke(input, {
      configurable: { sessionId: sessionId.value },
    });
    messages.value.push({
      alignRight: false,
      content: answer,
    });
  } catch (e) {
    let errorMessage = "";
    if (e instanceof Error) {
      errorMessage = e.message;
    } else if (typeof e === "string") {
      errorMessage = e;
    } else {
      errorMessage =
        "Unknown error has occured! Try refreshing your browser, and delete the cookies.";
    }
    messages.value.push({
      alignRight: false,
      content:
        "**System**: Something went wrong processing your last request. Check the console for more information.",
    });
    console.log(errorMessage);
  }

  loading.value = false;
};
</script>

<template>
  <div
    class="flex min-h-[20rem] min-w-[22rem] flex-col items-center justify-center gap-4 px-4 pb-4"
  >
    <template v-if="openaiApiKey === ''">
      <LlmApiKeyInput class="w-full basis-[20rem]" />
    </template>
    <template v-else>
      <LlmChat
        :messages="messages"
        placeholder="Ask LLM"
        :loading
        class="w-full grow basis-0"
        @send="invokeChain"
      />
      <UButton
        class="flex-none"
        size="xl"
        label="Forget OpenAI API key"
        variant="link"
        @click="forgetApiKey"
      />
    </template>
  </div>
</template>
