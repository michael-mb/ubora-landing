import { fallbackConfig, fallbackPages } from '~/content'
import { defaultLocale, type Locale } from '~/i18n/messages'

export function useStoryblokEnabled() {
  return Boolean(useRuntimeConfig().public.storyblok?.accessToken)
}

function storyblokParams(locale: Locale) {
  const { storyblokVersion } = useRuntimeConfig().public
  return {
    version: storyblokVersion as 'draft' | 'published',
    ...(locale === defaultLocale ? {} : { language: locale }),
  }
}

export async function usePageStory(slug: string, locale: Locale) {
  if (!useStoryblokEnabled()) {
    const content = fallbackPages[locale][slug]
    return {
      story: computed(() => (content ? { name: content.seo_title, full_slug: slug, content } : undefined)),
    }
  }

  const { story } = await useAsyncStoryblok(slug, { api: storyblokParams(locale) })
  return { story }
}

export function useSiteConfig() {
  const enabled = useStoryblokEnabled()
  const { locale } = useLocale()

  return useAsyncData(() => `site-config-${locale.value}`, async () => {
    const current = locale.value
    if (!enabled) return fallbackConfig[current]
    try {
      const { data } = await useStoryblokApi().get('cdn/stories/config', storyblokParams(current))
      return data.story.content as Record<string, any>
    }
    catch {
      return fallbackConfig[current]
    }
  }, { default: () => fallbackConfig[locale.value] })
}
