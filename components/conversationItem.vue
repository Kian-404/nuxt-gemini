<template>
  <UCard class="conversation-item">
    <template #header>
      <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
      {{ conversationItem.question }}
    </template>
    <div>{{ conversation.code }}</div>
    <div v-show="!conversationItem.isAnswerLoading" v-html="conversationItem.answer"></div>
    <div v-show="conversationItem.isAnswerLoading" class="flex items-center space-x-4">
      <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
    </div>
    <div class="restart my-4" v-if="conversationItem.code === 500">
      <UButton @click="RegenerateAnswer(item)" :loading="btnLoading">Regenerate</UButton>
    </div>
  </UCard>
  <conversation-empty v-if="conversationList.length === 0"></conversation-empty>
</template>
<script setup>
const props = defineProps(["item", "index"]);
const conversation = useConversationStore();
const { conversationList } = storeToRefs(conversation);
const btnLoading = ref(false);
const conversationItem = reactive(props.item);
const RegenerateAnswer = async (resetItem) => {
  console.log(resetItem);
  console.log(props.index);
  btnLoading.value = true;
  await conversation.regenerateConversation(resetItem.question, props.index);
  btnLoading.value = false;
};
</script>

<style lang="less" scoped>
.conversation-list {
  height: 100%;
  overflow: scroll;
  .conversation-item {
    margin: 20px;
    word-wrap: break-word;
    .restart {
      text-align: center;
    }
  }
}
</style>
