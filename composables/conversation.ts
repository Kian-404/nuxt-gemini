interface conversationItem {
  question: string;
  answer: string;
}

export const useConversationStore = defineStore("ConversationStore", () => {
  const conversationList: conversationItem[] = reactive([]);
function addConversation(conversation: conversationItem) {
    conversationList.push(conversation);
  }
  function clearnConversation() {
    conversationList.splice(0, conversationList.length);
  }
  // ...其他操作和状态
  return { conversationList, addConversation, clearnConversation };
});
