<template>
  <div class="header">
    <UIcon v-show="colorMode.preference !== 'dark'" class="icon-item" name="i-heroicons-moon"  @click="changeTheme('dark')"/>
    <UIcon v-show="colorMode.preference === 'dark'" class="icon-item" name="i-heroicons-sun"   @click="changeTheme('light')"/>
  </div>
</template>

<script setup>
const colorMode = useColorMode()

console.log(colorMode.preference)
const changeTheme = (colorTheme) => {
  console.log(colorTheme)
  console.log(colorMode)

  colorMode.preference = colorTheme
}
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
  }
}
body {
  background-color: #fff;
  color: rgba(0,0,0,0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
