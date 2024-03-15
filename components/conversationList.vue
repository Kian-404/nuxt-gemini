<template>
  <div class="conversation-list">
    <div v-for="(item, index) in conversationList">
      <ConversationItem :key="item.id" :item="item" :index="index"></ConversationItem>
    </div>
    <conversation-empty v-show="conversationList.length === 0"></conversation-empty>
  </div>
</template>
<script setup>
const conversation = useConversationStore();
const { conversationList } = storeToRefs(conversation);
const btnLoading = ref(false);
const resetAnswer = async (resetItem) => {
  console.log(resetItem);
  btnLoading.value = true;
  await conversation.restartConversation(resetItem.question);
  btnLoading.value = false;
};
</script>

<style lang="less" scoped>
.conversation-list {
  height: 100%;
  overflow-y: scroll;
  .conversation-item {
    margin: 20px;
  }
}
</style>
