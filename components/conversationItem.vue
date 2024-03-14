<template>
  <UCard class="conversation-item">
    <template #header>
      <div class="question-details">
        <div class="question-author">
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
        </div>
        <div class="question-text">
          {{ conversationItem.question }}
        </div>
      </div>
    </template>
    <div>{{ conversation.code }}</div>
    <div class="gemini">
      <div class="gemini-pic" v-show="!conversationItem.isAnswerLoading">
        <img class="gemini-img" :class="isActive ? 'active':'paused'" 
        src="~/assets/svg/gemini.svg" alt="gemini" />
      </div>
      <div class="gemini-text" v-show="!conversationItem.isAnswerLoading" v-html="answer"></div>
    </div>
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
<script setup lang="ts">
const props = defineProps(["item", "index"]);
const conversation = useConversationStore();
const { conversationList } = storeToRefs(conversation);
const btnLoading = ref(false);
const conversationItem = reactive(props.item);
const answer = ref("");
let textIndex = 0;
const isActive = ref(false);
let timer: any = null;
const TextSpeed = 10;

watch(
  () => conversationItem.isAnswerLoading,
  () => {
    textIndex = 0;
    isActive.value = true;
    timer = setTimeout(writeText, 300 / TextSpeed);
  }
);
const writeText = () => {
  answer.value = conversationItem.answer.slice(0, textIndex);
  textIndex++;
  if (textIndex >= conversationItem.answer.length) {
    clearTimeout(timer);
    isActive.value = false;
  }
  timer = setTimeout(writeText, 300 / TextSpeed);
  // console.log(answer);
};
const RegenerateAnswer = async (resetItem: { question: string }) => {
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
    .question-details {
      display: flex;
      align-items: center;
      .question-author {
        margin-right: 20px;
      }
    }
    .restart {
      text-align: center;
    }
    .gemini {
      display: flex;
      .gemini-pic {
        width: 50px;
        .gemini-img {
          animation-name: scaleAnimation; // 动画名
          animation-duration: 2s; // 动画时长
          animation-iteration-count: infinite; // 永久动画
          transition-timing-function: ease-in-out; // 动画过渡
          &.active {
            animation-play-state: running;
          }
          &.paused {
            animation-iteration-count: 0;
            // animation-play-state: paused;
          }
        }
      }
      .gemini-text {
        margin-left: 20px;
      }
    }
  }
}
@keyframes scaleAnimation {
  // 动画设置
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(0.5);
  }

  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
