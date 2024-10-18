import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

const apiBaseUrl = "http://localhost:3001";

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-10-13",
  css: ["~/assets/css/main.css"],
  ssr: true,
  build: {
    transpile: ["vuetify"],
  },
  runtimeConfig: {
    TMDB_KEY: process.env.TMDB_KEY,
    public: {
      TINYMCE_KEY: process.env.TINYMCE_KEY,
    },
  },
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
