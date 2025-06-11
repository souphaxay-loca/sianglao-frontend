// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  app: {
    head: {
      title: "SiangLao - Lao Speech to Text",
      meta: [
        {
          name: "description",
          content:
            "Convert Lao speech to text with advanced AI technology. Accurate transcription for Lao language audio recordings.",
        },
      ],
    },
  },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/fonts", "@nuxt/icon", "@pinia/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // Add proxy configuration for development
  // nitro: {
  //   devProxy: {
  //     '/api': {
  //       target: 'http://localhost:5000',
  //       changeOrigin: true
  //     }
  //   }
  // }
});
