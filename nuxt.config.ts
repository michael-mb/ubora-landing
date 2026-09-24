const storyblokToken = process.env.NUXT_STORYBLOK_TOKEN || ''

export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: true },

  modules: ['@storyblok/nuxt', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  storyblok: {
    accessToken: storyblokToken,
    usePlugin: Boolean(storyblokToken),
    apiOptions: {
      region: (process.env.NUXT_STORYBLOK_REGION || 'eu') as 'eu',
      cache: { type: 'none', cv: 'manual' },
    },
    componentsDir: '~/storyblok',
  },

  runtimeConfig: {
    public: {
      storyblokVersion: process.env.NUXT_PUBLIC_STORYBLOK_VERSION
        || (process.env.NODE_ENV === 'production' ? 'published' : 'draft'),
      contactFormEndpoint: '',
      siteUrl: 'https://www.uboracapital.com',
    },
  },

  fonts: {
    families: [
      { name: 'K2D', provider: 'google', weights: [300, 400, 500, 600, 700, 800] },
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/brand/mark.svg' }],
      meta: [{ name: 'theme-color', content: '#443700' }],
    },
  },
})
