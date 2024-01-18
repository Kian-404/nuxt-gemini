<template>
  <div class="question-bar">
    <UInput
      :loading="isLoading"
      :disabled="isLoading"
      icon="i-heroicons-magnifying-glass-20-solid"
      placeholder="Searching..."
      v-model="question"
      @keyup.enter="submit"
    />
  </div>
</template>

<script setup>
import { marked } from "marked";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ConversationList from "../../components/conversationList.vue";
const runtimeConfig = useRuntimeConfig();
let API_KEY = runtimeConfig.public.apiKey;
// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(question.value);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  const group = {
    question: question.value,
    answer: marked(text),
  };
  conversation.addConversation(group);
  console.log(conversation);
}
const isLoading = ref(false);
const conversation = useConversationStore();
const question = ref("");
const submit = async () => {
  isLoading.value = true;
  await run();
  isLoading.value = false;
  console.log("result");
  question.value = "";
};
</script>

<style less scoped>
.question-bar{
  width: 100%;
}
</style>
