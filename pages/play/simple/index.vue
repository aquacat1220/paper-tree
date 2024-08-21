<script setup lang="ts">
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";

const openaiApiKey = useCookie("openaiApiKey");
openaiApiKey.value = openaiApiKey.value || "";

const forgetApiKey = () => {
  openaiApiKey.value = "";
};

const createSimpleChain = () => {
  const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant."],
    ["human", "{input}"],
  ]);

  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: openaiApiKey.value as string, // The cast won't fail, since the value is never `null` or `undefined`.
  });

  const parser = new StringOutputParser();

  const simpleChain = RunnableSequence.from([
    { input: new RunnablePassthrough() },
    chatPrompt,
    model,
    parser,
  ]);
  return simpleChain;
};

const simpleChain = computed(createSimpleChain);

const history = ref([] as { role: string; content: string }[]);
const loading = ref(false);

const invokeChain = async (input: string) => {
  loading.value = true;
  history.value.push({ role: "human", content: input });

  try {
    const answer = await simpleChain.value.invoke(input);
    history.value.push({ role: "LLM", content: answer });
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
    history.value.push({ role: "System", content: errorMessage });
  }

  loading.value = false;
};
</script>

<template>
  <div
    class="flex min-h-[15rem] min-w-[30rem] flex-col items-center justify-center"
  >
    <template v-if="openaiApiKey === ''">
      <LlmApiKeyInput class="basis-[20rem]" />
    </template>
    <template v-else>
      <LlmChat
        :messages="history"
        placeholder="Ask LLM"
        :loading
        class="mb-4 w-full max-w-[50rem] grow basis-0"
        @send="invokeChain"
      />
      <UButton
        class="mb-4 flex-none"
        size="xl"
        label="Forget OpenAI API key"
        variant="link"
        @click="forgetApiKey"
      />
    </template>
  </div>
</template>
