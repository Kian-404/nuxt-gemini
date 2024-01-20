export const useThemeStore = defineStore("useThemeStore", () => {
  const colorMode = useColorMode();
  const theme = useState(colorMode.preference);
  const changeTheme = (colorTheme: string = 'light') => {
    console.log(colorTheme);
    console.log(colorMode);
    colorMode.preference = colorTheme;
    theme.value = colorTheme;
  };
  return {
    theme,
    changeTheme,
  };
});
