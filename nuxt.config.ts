import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/ionic', '@pinia/nuxt', '@vee-validate/nuxt'],
  build: {
    transpile: ['vee-validate/dist/rules']
  },
  ssr: false,
  css: ['~/app/assets/css/main.css'],
  srcDir: 'src',
  vite: {
    root: 'src'
  },
  dir: {
    pages: 'app/pages',
    middleware: 'app/middleware',
    assets: 'app/assets',
    public: 'app/public'
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    public: {
      googleClientId: process.env.GOOGLE_SERVER_CLIENT_ID,
      apiUrl: process.env.API_URL
    }
  },
  experimental: {
    payloadExtraction: false
  }
});
