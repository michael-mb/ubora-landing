import { StoryblokVue } from '@storyblok/vue'

export default defineNuxtPlugin(({ vueApp }) => {
  if (useRuntimeConfig().public.storyblok?.accessToken) return
  vueApp.use(StoryblokVue, { bridge: false })
})
