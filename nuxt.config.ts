// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: process.env.DEPLOY === "github-pages" ? "paper-tree" : "/",
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint", "@nuxt/ui"],
});
