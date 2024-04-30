<template>
  <div
    class="sidebar rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900"
  >
    <div class="sidebar-header h-12 leading-10">
      <span>new chat</span>
      <UTooltip text="create new chat" :popper="{ placement: 'right', arrow: true }">
      <UIcon class="icon-item" 
      name="i-heroicons-pencil-square-solid"  @click="conversation.createChat()"/>
      </UTooltip>
      
    </div>
    <div class="sidebar-content">
      <p class="chat-item" v-for="item in chatList" @click="conversation.changeChat(item.id)">{{item.title}}</p>
    </div>
    <div class="sidebar-footer h-12 leading-10">
      <UIcon class="icon-item" name="i-grommet-icons-github" @click="goToGithub" />
    </div>
  </div>
</template>

<script setup>
const conversation = useConversationStore();
const {chatList } = storeToRefs(conversation);
const github_url = "https://github.com/Kian-404/nuxt-gemini";

const goToGithub = () => {
  window.open(github_url, "_blank");
};
</script>

<style lang="less" scoped>
.sidebar {
  height: calc(100vh - 16px);
  margin-top: 20px;
  margin: 8px 0;
  transition: all 1s ease;
  width: 260px;
  display: flex;
  flex-direction: column;
  text-align: center;
  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .sidebar-content {
    flex: 1;
    overflow: scroll;
    .chat-item{
      cursor: pointer;
      padding: 10px;
      &:hover {
        background-color: #f0f0f0;
        color: #000;
      }
    }
  }
  .sidebar-footer {
    display: flex;
    justify-content: center;
    align-self: center;
    .icon-item {
      height: 48px;
    }
  }
  .icon-item {
    flex-basis: 100px;
    cursor: pointer;
    font-size: 24px;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
