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
  title?: string;
}
interface historyType {
  text: string;
}
export const useConversationStore = defineStore("ConversationStore", () => {
  const runtimeConfig = useRuntimeConfig();
  const API_KEY = runtimeConfig.public.apiKey;
  const genAI = new GoogleGenerativeAI(API_KEY);
  let conversationList = ref<conversationItem[]>([]);
  let chatIndex = ref(Math.random() * 1000000000000000000);
  let chatList: chatListType[] = reactive([
    {
      id: chatIndex,
      chatHistory: [],
      responseHistory: [],
      chatItem: [],
    },
  ]);
  let chatHistory: historyType[] = reactive([{ text: "Hello" }]);
  let responseHistory: historyType[] = reactive([{ text: "Great to meet you" }]);
  async function addConversation(question: string) {
    const conversationItem: conversationItem = reactive({
      id: Math.random(),
      time: new Date(),
      question: question,
      originText: "",
      answer: "",
      isAnswerLoading: true,
    });
    conversationList.value.push(conversationItem);

    // const conversation = await getConversation(question);
    const conversation = await MultipleConversation(question);
    conversationItem.originText = conversation.originText;
    conversationItem.answer = conversation.answer;
    conversationItem.isAnswerLoading = false;
    conversationItem.code = conversation.code;
    console.log(conversationList);
    chatList.forEach((item) => {
      if (item.id === chatIndex.value) {
        item.title = item.title === undefined || item.title?.length === 0 ? question : item.title;
        item.chatItem = [...conversationList.value];
        item.chatHistory = chatHistory;
        item.responseHistory = responseHistory;
        console.log(item);
      }
    });
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
    conversationList.value[index].isAnswerLoading = true;
    conversationList.value[index].answer = "";
    // const conversation = await getConversation(question);
    const conversation = await MultipleConversation(question);
    conversationList.value[index].answer = conversation.answer;
    conversationList.value[index].originText = conversation.originText;
    conversationList.value[index].isAnswerLoading = false;
    conversationList.value[index].code = conversation.code;
     chatList.forEach((item) => {
       if (item.id === chatIndex.value) {
         console.log(item);
        //  chatHistory = item.chatHistory;
        //  responseHistory = item.responseHistory;
         conversationList.value = [...item.chatItem];
       }
     });
    // chatList[chatIndex.value].chatItem = [...conversationList.value];
  }
  function clearnConversation() {
    chatList.length = 0;
    chatList.push({
      id: chatIndex.value,
      chatHistory: [],
      responseHistory: [],
      chatItem: [],
    });
    conversationList.value.splice(0, conversationList.value.length);
  }
  async function getConversation(question: string) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let text = "response answer...";
    let code = 200;
    try {
      const result: any = await model.generateContent(question);
      // const response = await result.response;
      text = "";
      // for await (const chunk of result.stream) {
      //   const chunkText = chunk.text();
      //   console.log(chunkText);
      //   text += chunkText;
      // }
      text = result.text();
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
    console.log(conversation);
    return conversation;
  }
  function createChat() {
    if (chatList[chatList.length - 1].chatItem.length === 0) {
      return;
    }
    chatIndex.value = Math.random() * 1000000000000000000;

    chatList.push({
      id: chatIndex.value,
      chatHistory,
      responseHistory,
      chatItem: [],
      title: ``,
    });
    conversationList.value = [];
    console.log(conversationList);
  }
  function changeChat(currentChatIndex: number) {
    console.log(currentChatIndex);
    conversationList.value = [];
    chatIndex.value = currentChatIndex;
    chatList.forEach((item) => {
      if (item.id === chatIndex.value) {
        console.log(item);
        chatHistory = item.chatHistory;
        responseHistory = item.responseHistory;
        conversationList.value = [...item.chatItem];
      }
    });
    console.log(conversationList);
  }
  function deleteChat(currentChatIndex: number) {
    chatList.forEach((item, index) => {
      if (item.id === currentChatIndex) {
        chatList.splice(index, 1);
      }
    });
    if (chatList.length === 0) {
      chatHistory = [{ text: "你好" }];
      responseHistory = [{ text: "我是一个AI助手" }];
      chatList.push({
        id: chatIndex.value,
        chatHistory,
        responseHistory,
        chatItem: [],
      });
    }
    createChat();
  }

  // ...其他操作和状态
  return {
    chatList,
    conversationList,
    chatIndex,
    addConversation,
    regenerateConversation,
    getConversation,
    clearnConversation,
    createChat,
    changeChat,
    deleteChat,
  };
});
