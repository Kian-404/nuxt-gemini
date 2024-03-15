<template>
  <UContainer class="layout">
    <Header />
    <div class="content">
      <Sidebar  v-if="false"/>
      <div class="main">
        <slot />
      </div>
    </div>
    <setSlideover/>
  </UContainer>
</template>

<script setup>
import Header from "./header.vue";
import Sidebar from "./sidebar.vue";
import setSlideover from "~/components/setSlideover.vue";
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;
  padding: 0;
  .content {
    height: calc(100% - 48px);
    display: flex;
    .main {
      flex: 1;
    }
  }
}
</style>
