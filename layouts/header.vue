<template>
  <div class="header">
    <div class="title">Y Gemini</div>
    <UIcon class="icon-item" name="i-heroicons-cog-6-tooth"  @click="toggleSlideOver.toggleSlide()" />
    <UIcon v-show="colorTheme.theme !== 'dark'" class="icon-item" name="i-heroicons-moon"  @click="colorTheme.changeTheme('dark')"/>
    <UIcon v-show="colorTheme.theme === 'dark'" class="icon-item" name="i-heroicons-sun"   @click="colorTheme.changeTheme('light')"/>
  </div>
</template>

<script setup>
const colorTheme = useThemeStore();
const toggleSlideOver = useSetStore();
</script>

<style lang="less" scoped>
.header {
    margin: 0px 20px;
    display: flex;
    align-items: center;
    height: 48px;
    .title {
      font-family: "Josefin Sans", sans-serif;
      font-size: 24px;
      font-weight: 700;
      margin-right: auto;
      flex: 1;
    }
  .icon-item{
    width: 1.8rem;
    height: 1.8rem;
    margin: 0 0.5rem;
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
