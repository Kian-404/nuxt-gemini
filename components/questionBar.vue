<template>
  <div class="question-bar">
    <UInput
      :loading="isLoading"
      :disabled="isLoading"
      icon="i-heroicons-magnifying-glass-20-solid"
      placeholder="Input your question..."
      v-model="question"
      @keyup.enter="submit"
      style="height: 48px;"
    />
  </div>
</template>

<script setup>
const isLoading = ref(false);
const conversation = useConversationStore();
const question = ref("");

const submit = async () => {
  isLoading.value = true;

  await conversation.addConversation(question.value);
  isLoading.value = false;
  console.log("result");
  question.value = "";
  
};
</script>

<style less scoped>
.question-bar{
  width: 96%;
  margin: 0 auto;
}
</style>
