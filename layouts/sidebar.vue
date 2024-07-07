<template>
  <div
    class="sidebar rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900"
  >
    <div class="sidebar-header h-12 leading-10">
      <span>new chat</span>
      <UTooltip text="create new chat" :popper="{ placement: 'right', arrow: true }">
        <UIcon class="icon-item" name="i-heroicons-pencil-square-solid" @click="conversation.createChat()" />
      </UTooltip>
    </div>
    <div class="sidebar-content">
      <div class="chat-content" v-for="item in chatList">
        <div v-show="item.id && item.title" class="chat-item" @click="conversation.changeChat(item.id)">
          <span> {{ item.title }}</span>
          <UDropdown :items="optionItems" :popper="{ arrow: true }" @click="currentItem(item.id)">
            <UButton variant="link" color="white" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </div>
      </div>
    </div>
    <div class="sidebar-footer h-12 leading-10">
      <UIcon class="icon-item" name="i-grommet-icons-github" @click="goToGithub" />
    </div>
  </div>
</template>

<script setup>
const conversation = useConversationStore();
const { chatList } = storeToRefs(conversation);
const github_url = "https://github.com/Kian-404/nuxt-gemini";
const optionItems = [
  [
    {
      icon: "i-heroicons-pencil-solid",
      label: "Rename",
      click: (item) => {
        console.log("Rename");
      },
    },
    {
      icon: "i-heroicons-trash-solid",
      label: "Delete",
      click: () => {
        conversation.deleteChat(currentItemIndex.value);
      },
    },
  ],
];
const currentItemIndex = ref("");
const currentItem = (itemIndex) => {
  currentItemIndex.value = itemIndex;
  console.log("currentItem");
};
const goToGithub = () => {
  window.open(github_url, "_blank");
};
</script>

<style lang="less" scoped>
.sidebar {
  font-family: "Josefin Sans", sans-serif;
  height: calc(100vh - 16px);
  margin-top: 20px;
  margin: 8px 10px;
  transition: all 1s ease;
  width: 260px;
  display: flex;
  flex-direction: column;
  text-align: center;
  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .sidebar-content {
    flex: 1;
    overflow: scroll;
    .chat-item {
      cursor: pointer;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover {
        background-color: #f0f0f0;
        color: #000;
      }
    }
  }
  .sidebar-footer {
    .icon-item {
      vertical-align: middle;
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
