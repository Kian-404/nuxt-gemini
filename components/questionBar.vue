<template>
  <div class="question-bar">
    <UTextarea
      :loading="isLoading"
      :disabled="isLoading"
      autoresize
      autofocus
      :rows="2"
      :maxrows="5"
      icon="i-heroicons-magnifying-glass-20-solid"
      placeholder="Input your question..."
      v-model="question"
      @keyup.enter="submit"
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
  margin: 0 20px;
}
</style>
