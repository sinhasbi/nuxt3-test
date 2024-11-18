// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  // ssr: false,
  // nitro: {
  //   prerender: {
  //     routes: ['/'], // 預渲染的路由
  //   },
  // },
  components: true,
  // vue-tsc 之後使用 dev 會自動檢查型別
  typescript: {
    strict: true,
    typeCheck: true,
  },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@element-plus/nuxt",
  ],
  // 選擇要引入甚麼東西
  elementPlus: {
    // importStyle: 'css',
    // components: ['ElButton', 'ElInput'],
  },

  css: ["@/assets/styles/main.scss"],
  // vite 目前不支持 legacy 的 API
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
  },
});
