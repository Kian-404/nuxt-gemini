export const useSlideBarStore = defineStore("useSlideBarStore", () => {
  const showSlideBar = useState(() => false);
  const toggleSlideBar = () => {
    showSlideBar.value = !showSlideBar.value;
  };
  return {
    showSlideBar,
    toggleSlideBar,
  };
});
