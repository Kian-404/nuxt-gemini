export const useSpeakStore = defineStore("useSpeakStore", () => {
  const UtteranceProps = reactive({
    lang: "zh-CN",
    volume: 1,
    pitch: 1,
    rate: 1,
    text: ""
  });
  const isSpeaking = useState(() => false);
  const speakCurrentIndex = useState(() => 0);
  const startRead = (speakContent: string = '') => {
    window.speechSynthesis.cancel();
    const speechInstance = new SpeechSynthesisUtterance();
    speechInstance.text = speakContent;
    speechInstance.lang = UtteranceProps.lang;
    speechInstance.volume = UtteranceProps.volume;
    speechInstance.pitch = UtteranceProps.pitch;
    speechInstance.rate = UtteranceProps.rate;

    window.speechSynthesis.speak(speechInstance);
    console.log("123123");

    speechInstance.onstart = () => {
      console.log("start");
      isSpeaking.value = true;
    };
    speechInstance.onend = () => {
      console.log("ended");
      isSpeaking.value = false;
    };
    
  };
  const stopSpeak = () => {
    isSpeaking.value = false;
    window.speechSynthesis.cancel();
  }
  const setCurrentIndex = (index: number) => {
    speakCurrentIndex.value = index;
  };
  return {
    isSpeaking,
    speakCurrentIndex,
    setCurrentIndex,
    startRead,
    stopSpeak,
  };
});
