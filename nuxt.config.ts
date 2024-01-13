import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/ionic', '@pinia/nuxt', '@vee-validate/nuxt'],
  build: {
    transpile: ['vee-validate/dist/rules']
  },
  ssr: false,
  css: ['~/assets/css/main.css'],
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
  // routeRules: {
  //   '/api/**': {
  //     proxy: `${process.env.API_URL}/api/**`
  //   }
  // },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: process.env.API_URL + '/api',
          changeOrigin: true
          // rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  },
  experimental: {
    payloadExtraction: false
  }
});
