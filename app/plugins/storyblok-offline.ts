import { StoryblokVue } from '@storyblok/vue'

// Mode « hors Storyblok » (pas de token) : on garde StoryblokComponent et v-editable
// pour rendre le contenu local, sans initialiser le client API qui exige un token.
export default defineNuxtPlugin(({ vueApp }) => {
  if (useRuntimeConfig().public.storyblok?.accessToken) return
  vueApp.use(StoryblokVue, { bridge: false })
})
