// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/ionic', '@sidebase/nuxt-auth'],
  auth: {
    provider: {
      type: 'authjs',
    },
    globalAppMiddleware: true,
  },
  ssr: false
})
