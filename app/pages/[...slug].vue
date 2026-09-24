<script setup lang="ts">
// Route unique pour toutes les pages : /  → story « home », /a-propos → story « a-propos », etc.
// Pour ajouter une page, il suffit de créer une story de type « Page » dans Storyblok.
const route = useRoute()
const { siteUrl, storyblokVersion } = useRuntimeConfig().public

const slug = (route.params.slug as string[] | undefined)?.filter(Boolean).join('/') || 'home'
const { story } = await usePageStory(slug)

const isPreviewableConfig = story.value?.content.component === 'config' && storyblokVersion === 'draft'
if (!story.value || (story.value.content.component !== 'page' && !isPreviewableConfig)) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable', fatal: true })
}

const title = computed(() => story.value?.content.seo_title || story.value?.name)
const description = computed(() => story.value?.content.seo_description)

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'fr_FR',
  ogImage: `${siteUrl}/brand/og-image.png`,
  twitterCard: 'summary_large_image',
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}${route.path === '/' ? '' : route.path}` }] })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
