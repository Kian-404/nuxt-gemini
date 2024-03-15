<template>
  <div class="set-slideover">
    <USlideover v-model="showSlideOver" >
      <UCard
        class="flex flex-col flex-1"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
      >
        <template #header>
          <div class="flex">
            <p class="flex-1">setting header</p>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="setSlideover.toggleSlide" />
          </div>
          
           
        </template>
        <div class="flex">
          <p class="flex-1">reset conversation</p>
            <UButton @click="clearData">clearData</UButton>
          </div>
        <Placeholder class="h-full" />

        <!-- <template #footer>
          <Placeholder class="h-8" />
        </template> -->
      </UCard>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const setSlideover = useSetStore();
const { showSlideOver } = storeToRefs(setSlideover);
const conversation =  useConversationStore()
const clearData = () => {
  conversation.clearnConversation()
}
</script>

<style scoped></style>
