<template>
  <div class="conversation-list">
    <UCard class="conversation-item">
      <template #header>
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
        {{ item.question }}
      </template>
      <div v-html="item.answer"></div>
      <div class="restart my-4" v-if="item.code ===500">
        <UButton @click="RegenerateAnswer(item)" :loading="btnLoading">Regenerate</UButton>
      </div>
    </UCard>
    <conversation-empty v-if="conversationList.length === 0"></conversation-empty>
  </div>
</template>
<script setup>
const props = defineProps(['item', 'index'])
const conversation = useConversationStore();
const { conversationList } = storeToRefs(conversation);
const btnLoading = ref(false);
const RegenerateAnswer = async (resetItem) => {
  console.log(resetItem);
  console.log(props.index);
  btnLoading.value = true;
  await conversation.regenerateConversation(resetItem.question, props.index);
  btnLoading.value = false;
}
</script>

<style lang="less" scoped>
.conversation-list {
  height: 100%;
  overflow: scroll;
  .conversation-item {
    margin: 20px;
    .restart{
      text-align: center;
    }
  }
}
</style>