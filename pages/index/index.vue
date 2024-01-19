<template>
  <div class="index">
    <div class="content">
      <ConversationList />
    </div>
    <div class="input-area">
      <QuestionBar />
    </div>
  </div>
</template>
<script setup>
import QuestionBar from "../../components/questionBar.vue";
import ConversationList from "../../components/conversationList.vue";
</script>

<style less scoped>
.index{
  height: 100%;
  margin: 0 20px;
  .header{
    height: 10vh;
  }
  .content{
    height: 90%;
    /* overflow: scroll; */
  }
  .input-area{
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
