export const useSetStore = defineStore("useSetStore", () => {
  const showSlideOver = useState(() => false);
  const toggleSlide = () => {
    showSlideOver.value =!showSlideOver.value;
  };
  return {
    showSlideOver,
    toggleSlide,
  };
});
