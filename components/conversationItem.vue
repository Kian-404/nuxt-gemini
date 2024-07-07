<template>
  <UCard class="conversation-item">
    <template #header>
      <div class="question-details">
        <div class="question-author">
          <UAvatar icon="i-heroicons-user-solid" alt="Avatar" />
        </div>
        <div class="question-text">
          {{ conversationItem.question }}
        </div>
        <div class="answer-speak">
          <itemSpeak :speakContent="conversationItem.originText" :index="props.index" />
        </div>
      </div>
    </template>
    <div class="gemini">
      <div class="gemini-pic">
        <img class="gemini-img" :class="isActive ? 'active' : 'paused'" src="~/assets/svg/gemini.svg" alt="gemini" />
      </div>
      <div class="gemini-text" v-if="!conversationItem.isAnswerLoading" v-html="answer"></div>
      <div  v-if="conversationItem.isAnswerLoading" class="flex items-center flex-1">
        <div class="space-y-5 flex-1">
          <UProgress animation="carousel" />
          <UProgress animation="swing" color="lime" />
          <UProgress animation="elastic" color="blue" />
        </div>
      </div>
    </div>

    <div class="restart my-4" v-if="conversationItem.code === 500">
      <UButton @click="RegenerateAnswer(item)" :loading="btnLoading">Regenerate</UButton>
    </div>
  </UCard>
  <conversation-empty v-if="conversationList.length === 0"></conversation-empty>
</template>
<script setup lang="ts">
import itemSpeak from "./itemSpeak.vue";
const props = defineProps(["item", "index"]);
const conversation = useConversationStore();
const { conversationList } = storeToRefs(conversation);
const btnLoading = ref(false);
const conversationItem = reactive(props.item);
const answer = ref("");
let textIndex = 0;
const isActive = ref(true);
let timer: any = null;
const TextSpeed = 10;

watch(
  () => conversationItem.isAnswerLoading,
  (value) => {
    console.log(value);
    textIndex = 0;
    isActive.value = true;
    timer = setTimeout(writeText, 300 / TextSpeed);
  }
);
watchEffect(() => {
  console.log(props.item);
  if (props.item.isAnswerLoading === false && isActive.value === false) {
    answer.value = props.item.answer;
  }
});
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
      .question-text {
        flex: 1;
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
            transform: scale(1) rotate(0deg);
            // animation-play-state: paused
            // animation-play-state: paused;
          }
        }
      }
      .gemini-text {
        margin-left: 20px;
        flex: 1;
      }
    }
  }
}
@keyframes scaleAnimation {
  // 动画设置
  0% {
    transform: scale(1) rotate(45deg);
  }

  25% {
    transform: scale(0.5) rotate(90deg);
  }

  50% {
    transform: scale(1) rotate(180deg);
  }
  75% {
    transform: scale(0.5) rotate(270deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}
</style>
