import { marked } from "marked";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface conversationItem {
  question: string;
  answer: string;
  time: Date;
}

export const useConversationStore = defineStore("ConversationStore", () => {
  const runtimeConfig = useRuntimeConfig();
  const API_KEY = runtimeConfig.public.apiKey;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const conversationList: conversationItem[] = reactive([]);

  function addConversation(conversation: conversationItem) {
    conversationList.push(conversation);
  }
  function clearnConversation() {
    conversationList.splice(0, conversationList.length);
  }
  async function getConversation(question: string) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let text = "response answer...";
    try {
      const result = await model.generateContent(question);
      const response = await result.response;
      text = response.text();
      console.log(text);
    } catch (error: Error) {
      text = "resopese error: " + error.message;
      console.info(error);
    }

    console.log(text);
    const conversation = {
      time: new Date(),
      question: question,
      answer: marked(text),
    };
    // return conversation;
    addConversation(conversation);
  }
  // ...其他操作和状态
  return { conversationList, addConversation, getConversation, clearnConversation };
});
