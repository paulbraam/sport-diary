import { createRequire } from 'module';
import path from 'path';
import { defineNuxtConfig } from 'nuxt/config';

const require = createRequire(import.meta.url);

const prismaClient = require
  .resolve('@prisma/client')
  .replace(/@prisma(\/|\\)client(\/|\\)index\.js/, '.prisma/client/index-browser.js');

const prismaIndexBrowser = path.normalize(path.relative(process.cwd(), prismaClient));

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
    root: 'src',
    resolve: { alias: { '.prisma/client/index-browser': prismaIndexBrowser } }
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
