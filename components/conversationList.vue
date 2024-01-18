<template>
  <div class="conversation-list">
    <UCard class="conversation-item" v-for="item in conversationList">
      <template #header>
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
        {{ item.question }}
      </template>
      <div v-html="item.answer"></div>
    </UCard>
  </div>
</template>

<script setup>
const conversation = useConversationStore();
const { conversationList } = storeToRefs(conversation);
</script>

<style lang="less" scoped>
.conversation-list {
  .conversation-item {
    margin: 20px;
  }
}
</style>
