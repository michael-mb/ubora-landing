<script setup lang="ts">
import { locales } from '~/i18n/messages'

const route = useRoute()
const { siteUrl, storyblokVersion } = useRuntimeConfig().public
const { locale, t, switchLocalePath } = useLocale()

const segments = ((route.params.slug as string[] | undefined) ?? []).filter(Boolean)
if (segments[0] === 'en') segments.shift()
const slug = segments.join('/') || 'home'

const { story } = await usePageStory(slug, locale.value)

const isPreviewableConfig = story.value?.content.component === 'config' && storyblokVersion === 'draft'
if (!story.value || (story.value.content.component !== 'page' && !isPreviewableConfig)) {
  throw createError({ statusCode: 404, statusMessage: t.value.pageNotFound, fatal: true })
}

const title = computed(() => story.value?.content.seo_title || story.value?.name)
const description = computed(() => story.value?.content.seo_description)
const absolute = (path: string) => `${siteUrl}${path === '/' ? '' : path}`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogLocale: t.value.ogLocale,
  ogImage: `${siteUrl}/brand/og-image.png`,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: absolute(route.path) },
    ...locales.map(code => ({ rel: 'alternate' as const, hreflang: code, href: absolute(switchLocalePath(code)) })),
    { rel: 'alternate' as const, hreflang: 'x-default', href: absolute(switchLocalePath('fr')) },
  ],
})
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
