import { marked } from "marked";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface conversationItem {
  id: number;
  question: string;
  answer: string | Promise<string>;
  time: Date;
  isAnswerLoading?: boolean;
  code?: number;
}

export const useConversationStore = defineStore("ConversationStore", () => {
  const runtimeConfig = useRuntimeConfig();
  const API_KEY = runtimeConfig.public.apiKey;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const conversationList: conversationItem[] = reactive([]);

  async function addConversation(question: string) {
    const conversationItem: conversationItem = reactive({
      id: Math.random(),
      time: new Date(),
      question: question,
      answer: "",
      isAnswerLoading: true,
    });
    conversationList.push(conversationItem);

    const conversation = await getConversation(question);
    conversationItem.answer = conversation.answer;
    conversationItem.isAnswerLoading = false;
    conversationItem.code = conversation.code;
    console.log(conversationList);
    nextTick(() => {
      let list = document.querySelector(".conversation-list");
      let lestChild =
        document.querySelectorAll(".conversation-item")[document.querySelectorAll(".conversation-item").length - 1];
      console.log(list?.scrollHeight);
      if (list && list.scrollHeight > lestChild.clientHeight) {
        list.scrollTop = list?.scrollHeight - lestChild.clientHeight - 30;
      }
    });
  }
  async function regenerateConversation(question: string, index: number) {
    const conversation = await getConversation(question);
    conversationList[index] = conversation;
  }
  function clearnConversation() {
    conversationList.splice(0, conversationList.length);
  }
  async function getConversation(question: string) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let text = "response answer...";
    let code = 200;
    try {
      const result = await model.generateContent(question);
      const response = await result.response;
      text = response.text();
      console.log(text);
    } catch (error: any) {
      text = "resopese error: " + error.message;
      console.info(error);
      code = 500;
    }

    console.log(text);
    const conversation = {
      id: Math.random(),
      time: new Date(),
      question: question,
      answer: marked(text),
      code,
    };
    console.log(conversation);
    return conversation;
  }
  // ...其他操作和状态
  return { conversationList, addConversation, regenerateConversation, getConversation, clearnConversation };
});
