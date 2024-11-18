// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  // 元件自動導入
  components: true,
  // vue-tsc 之後使用 dev 會自動檢查型別
  typescript: {
    strict: true,
    typeCheck: true,
  },
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
});
