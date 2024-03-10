<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
useHead({
  title: 'Y Gemini',
  meta: [
    { name: 'description', content: 'YourSelf Gemini' },
    { name: 'keywords', content: 'gemini, yourself' },
    {name: 'viewport', content: 'width=device-width, initial-scale=1, , maximum-scale=1.0, user-scalable=0'}
  ],

  link: [ { rel: 'icon', type: 'image/x-icon', href: '/svg/gemini.svg' } ]
})

</script>