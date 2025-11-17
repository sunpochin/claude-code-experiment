// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@pinia/nuxt'],

  app: {
    head: {
      title: '時尚服飾館 - 精選服飾購物平台',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: '提供最新流行服飾、潮流穿搭，品質優良，價格實惠。精選男裝、女裝、童裝等多樣選擇。'
        },
        { name: 'keywords', content: '服飾, 購物, 電商, 服裝, 潮流, 時尚, 穿搭' },
        { property: 'og:title', content: '時尚服飾館 - 精選服飾購物平台' },
        { property: 'og:description', content: '提供最新流行服飾、潮流穿搭，品質優良，價格實惠。' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    prerender: {
      routes: ['/']
    }
  }
})
