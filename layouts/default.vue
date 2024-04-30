<template>
  <div class="default">
    <Sidebar class="slidebar" v-show="SlideBar.showSlideBar" />
    <UContainer class="layout">
      <Header />
      <div class="content">
        <div class="main">
          <UButton class="show-slidebar" size="'sm'" variant="solid">
            <UIcon
              class="icon-item"
              :name="SlideBar.showSlideBar ? 'i-heroicons-chevron-left-20-solid' : 'i-heroicons-chevron-right-20-solid'"
              @click="SlideBar.toggleSlideBar()"
            />
          </UButton>
          <slot />
        </div>
      </div>
      <setSlideover />
    </UContainer>
  </div>
</template>

<script setup>
import Header from "./header.vue";
import Sidebar from "./sidebar.vue";
import setSlideover from "~/components/setSlideover.vue";
const SlideBar = useSlideBarStore();
</script>

<style lang="less" scoped>
.default{
  display: flex;
}
.layout {
  height: 100vh;
  padding: 0;
  flex:1;
  // margin: 0;
  // display: flex;
  .content {
    height: calc(100% - 48px);
    display: flex;
    .main {
      flex: 1;
      .show-slidebar {
        top: 50%;
        position: absolute;
        border-top-right-radius: 9999px;
        border-bottom-right-radius: 9999px;
        .icon-item {
          font-size: 36px;
          transition: all 0.5s ease;
          cursor: pointer;
          &:hover {
            transform: scale(1.2);
          }
        }
      }
    }
  }
}
</style>
