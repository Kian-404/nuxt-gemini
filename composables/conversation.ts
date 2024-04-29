import { marked } from "marked";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface conversationItem {
  id: number;
  question: string;
  originText: string;
  answer: string | Promise<string>;
  time: Date;
  isAnswerLoading?: boolean;
  code?: number;
}
interface chatListType {
  id: number;
  chatHistory: historyType[];
  responseHistory: historyType[];
  chatItem: conversationItem[];
}
interface historyType {
  text: string;
}
export const useConversationStore = defineStore("ConversationStore", () => {
  const runtimeConfig = useRuntimeConfig();
  const API_KEY = runtimeConfig.public.apiKey;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const conversationList: conversationItem[] = reactive([]);
  let chatIndex = Math.random() * 1000000000000000000;
  const chatList: chatListType[] = reactive([
    {
      id: chatIndex,
      chatHistory: [],
      responseHistory: [],
      chatItem: [],
    },
  ]);
  const chatHistory: historyType[] = reactive([{ text: "Hello" }]);
  const responseHistory: historyType[] = reactive([{ text: "Great to meet you" }]);
  async function addConversation(question: string) {
    const conversationItem: conversationItem = reactive({
      id: Math.random(),
      time: new Date(),
      question: question,
      originText: "",
      answer: "",
      isAnswerLoading: true,
    });
    conversationList.push(conversationItem);

    // const conversation = await getConversation(question);
    const conversation = await MultipleConversation(question);
    conversationItem.originText = conversation.originText;
    conversationItem.answer = conversation.answer;
    conversationItem.isAnswerLoading = false;
    conversationItem.code = conversation.code;
    console.log(conversationList);
    chatList[chatList.length - 1].chatItem = conversationList;
    console.log(chatList);

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
    conversationList[index].isAnswerLoading = true;
    conversationList[index].answer = "";
    // const conversation = await getConversation(question);
    const conversation = await MultipleConversation(question);
    conversationList[index].answer = conversation.answer;
    conversationList[index].originText = conversation.originText;
    conversationList[index].isAnswerLoading = false;
    conversationList[index].code = conversation.code;
    chatList[chatList.length - 1].chatItem = conversationList;
  }
  function clearnConversation() {
    chatList;
    conversationList.splice(0, conversationList.length);
  }
  async function getConversation(question: string) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let text = "response answer...";
    let code = 200;
    try {
      const result = await model.generateContentStream(question);
      // const response = await result.response;
      text = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
      }
      // text = response.text();
      console.log(text);
    } catch (error: any) {
      text = "resopese error: " + error;
      console.info(error);
      code = 500;
    }

    console.log(text);
    const conversation = {
      id: Math.random(),
      time: new Date(),
      question: question,
      originText: text,
      answer: marked(text),
      code,
    };
    console.log(conversation);
    return conversation;
  }
  async function MultipleConversation(question: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let code = 200;
    let text = "response answer...";
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: chatHistory,
        },
        {
          role: "model",
          parts: responseHistory,
        },
      ],
      generationConfig: {
        // maxOutputTokens: 100,
      },
    });
    console.log(chat);
    try {
      const result = await chat.sendMessage(question);

      const response = await result.response;
      text = response.text();
      console.log(text);
      chatHistory.push({
        text: question,
      });
      responseHistory.push({
        text: text,
      });
    } catch (error) {
      text = "resopese error: " + error;
      console.info(error);
      code = 500;
    }
    const conversation = {
      id: Math.random(),
      time: new Date(),
      question: question,
      originText: text,
      answer: marked(text),
      code,
    };

    chatList[chatList.length - 1].chatHistory = chatHistory;
    chatList[chatList.length - 1].responseHistory = responseHistory;
    chatList[chatList.length - 1].id = chatIndex;
    console.log(conversation);
    return conversation;
  }
  // ...其他操作和状态
  return { conversationList, addConversation, regenerateConversation, getConversation, clearnConversation };
});
