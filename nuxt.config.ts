// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiKey: process.env.NUXT_API_KEY,
    public: {
      apiKey: process.env.NUXT_API_KEY,
    },
  },
  ui: {
    icons: ['grommet-icons']
  },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxt/content", "@nuxtjs/color-mode"],
});
