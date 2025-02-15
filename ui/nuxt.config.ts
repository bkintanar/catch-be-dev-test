import {routes} from './routes.js'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL_API,
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  hooks: {
    'pages:extend': (pages) => {
      routes.forEach((route) => {
        pages.push(route)
      })
    }
  }
})
