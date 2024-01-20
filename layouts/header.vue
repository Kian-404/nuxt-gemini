<template>
  <div class="header">
    <UIcon v-show="colorTheme.theme !== 'dark'" class="icon-item" name="i-heroicons-moon"  @click="colorTheme.changeTheme('dark')"/>
    <UIcon v-show="colorTheme.theme === 'dark'" class="icon-item" name="i-heroicons-sun"   @click="colorTheme.changeTheme('light')"/>
  </div>
</template>

<script setup>
const colorTheme = useThemeStore();
</script>

<style lang="less" scoped>
.header {
    margin: 0px 20px;
    display: flex;
    align-items: center;
    height: 48px;
    justify-content: right;
  .icon-item{
    width: 1.8rem;
    height: 1.8rem;
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
