import { fallbackConfig, fallbackPages } from '~/content'
import { defaultLocale, type Locale } from '~/i18n/messages'

export function useStoryblokEnabled() {
  return Boolean(useRuntimeConfig().public.storyblok?.accessToken)
}

type Version = 'draft' | 'published'

function useStoryblokVersion() {
  return useRuntimeConfig().public.storyblokVersion as Version
}

function storyblokParams(version: Version, locale: Locale) {
  return { version, ...(locale === defaultLocale ? {} : { language: locale }) }
}

async function getStory(slug: string, version: Version, locale: Locale) {
  const api = useStoryblokApi()
  try {
    return (await api.get(`cdn/stories/${slug}`, storyblokParams(version, locale))).data.story
  }
  catch (error) {
    if (locale === defaultLocale) throw error
    return (await api.get(`cdn/stories/${slug}`, storyblokParams(version, defaultLocale))).data.story
  }
}

export async function usePageStory(slug: string, locale: Locale) {
  if (!useStoryblokEnabled()) {
    const content = fallbackPages[locale][slug]
    return {
      story: computed(() => (content ? { name: content.seo_title, full_slug: slug, content } : undefined)),
    }
  }

  const version = useStoryblokVersion()
  if (locale === defaultLocale || version === 'draft') {
    const { story } = await useAsyncStoryblok(slug, { api: storyblokParams(version, locale) })
    return { story }
  }

  const { data } = await useAsyncData(`story-${locale}-${slug}`, async () => {
    try {
      return await getStory(slug, version, locale)
    }
    catch {
      return null
    }
  })
  return { story: computed(() => data.value ?? undefined) }
}

export function useSiteConfig() {
  const enabled = useStoryblokEnabled()
  const version = useStoryblokVersion()
  const { locale } = useLocale()

  return useAsyncData(() => `site-config-${locale.value}`, async () => {
    const current = locale.value
    if (!enabled) return fallbackConfig[current]
    try {
      return (await getStory('config', version, current)).content as Record<string, any>
    }
    catch {
      return fallbackConfig[current]
    }
  }, { default: () => fallbackConfig[locale.value] })
}
