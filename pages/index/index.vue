<template>
  <div class="layout">
    <div class="content">
      <ConversationList />
    </div>
    <div class="input">
      <QuestionBar />
    </div>
  </div>
</template>
<script setup>
import QuestionBar from "../../components/questionBar.vue";
import ConversationList from "../../components/conversationList.vue";
</script>

<style less scoped>
.layout{
  height: 100vh;
  margin: 0 20px;
  .content{
    height: 90vh;
    overflow: scroll;
  }
  .input{
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
