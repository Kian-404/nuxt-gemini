<template>
  <div class="item-speak">
    <UIcon class="icon-item" :class="isSpeaking && index === speakCurrentIndex ? 'speaking' : ''" name="i-heroicons-speaker-wave" @click="startRead" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["speakContent", 'index']);
const speakStatus = useSpeakStore();
const { isSpeaking , speakCurrentIndex} = storeToRefs(speakStatus);

const UtteranceProps = {
  lang: "zh-CN",
  volume: 1,
  pitch: 1,
  rate: 1,
  text: "",
};

const startRead = () => {
  if(isSpeaking.value && props.index === speakCurrentIndex.value) {
    speakStatus.stopSpeak();
    return;
  }
  speakStatus.setCurrentIndex(props.index);
  speakStatus.startRead(props.speakContent);
};


</script>

<style lang="less" scoped>
.item-speak {
  .icon-item {
    width: 1.8rem;
    height: 1.8rem;
    margin: 0 0.5rem;
    transition: all 0.3s;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
    &.speaking {
      animation-name: speaking; 
      animation-duration: 2s; 
      animation-iteration-count: infinite;
      transition-timing-function: ease-in-out;
      background: rgb(89, 89, 244);
    }
  }
}
@keyframes speaking {
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
</style>
