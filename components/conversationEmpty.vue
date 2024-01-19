<template>
  <UCard class="conversation-empty">
    <div class="content">
      <div class="animate" style="width: 300px; height: 300px">
        <dotlottie-player
          src="/json/empty-desc.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px"
          loop
          autoplay
        ></dotlottie-player>
      </div>
      <div class="desc">
        <p>Input your question</p>
        <p>I will give you the answer</p>
      </div>
    </div>
  </UCard>
</template>
<script setup>
useHead({
  script: [
    {
      src: " https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs",
      type: "module",
    },
  ],
  link: [
    {
      href: "https://fonts.googleapis.com",
      rel: "preconnect",
    },
    {
      href: "https://fonts.gstatic.com",
      rel: "preconnect",
      type: "text/css",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap",
      rel: "stylesheet",
      type: "text/css",
    },
  ],
});
</script>

<style lang="less" scoped>
.conversation-empty {
  margin: 20px;
  .content {
    font-family: "Josefin Sans", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    text-shadow: 4px 4px 4px #aaa;
    font-size: 36px;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
