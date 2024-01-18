<template>
  <div>
    <UInput
    :loading="isLoading"
    :disabled="isLoading"
    icon="i-heroicons-magnifying-glass-20-solid"
    placeholder="Searching..."
    v-model="question"
    @keyup.enter="submit"
  />
   <UCard v-for="item in speakList">
    <template #header>
         <UAvatar
    src="https://avatars.githubusercontent.com/u/739984?v=4"
    alt="Avatar"
  />
       {{ item.question }}
    </template>
    <div v-html="item.answer"></div>
    
  </UCard>
  </div>
</template>

<script setup>
import {marked} from 'marked';
import { GoogleGenerativeAI } from "@google/generative-ai";
const runtimeConfig = useRuntimeConfig()
let API_KEY = runtimeConfig.public.apiKey;
// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});


  const result = await model.generateContent(question.value);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  speakList.push({
    question: question.value,
    answer: marked(text)
  })
}
  const isLoading = ref(false);
  let speakList  = reactive([]);
  const question = ref('');
  const submit = async () => {
    isLoading.value = true;
    await run()
    isLoading.value = false;
    console.log('result')
    question.value = ''
  }
</script>

<style scoped>

</style>