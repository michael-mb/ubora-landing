import { fallbackConfig, fallbackPages } from '~/content'

/** Storyblok est actif dès qu'un token d'accès est configuré. */
export function useStoryblokEnabled() {
  return Boolean(useRuntimeConfig().public.storyblok?.accessToken)
}

/** Charge une page depuis Storyblok, ou depuis le contenu local si Storyblok n'est pas encore connecté. */
export async function usePageStory(slug: string) {
  if (!useStoryblokEnabled()) {
    const content = fallbackPages[slug]
    return {
      story: computed(() => (content ? { name: content.seo_title, full_slug: slug, content } : undefined)),
    }
  }

  const { storyblokVersion } = useRuntimeConfig().public
  const { story } = await useAsyncStoryblok(slug, {
    api: { version: storyblokVersion as 'draft' | 'published' },
  })
  return { story }
}

/**
 * Configuration globale (menu, contact, footer) : story « config » dans Storyblok.
 * Retombe sur le contenu local si Storyblok n'est pas connecté ou si la story n'existe pas.
 */
export function useSiteConfig() {
  const enabled = useStoryblokEnabled()
  const { storyblokVersion } = useRuntimeConfig().public

  return useAsyncData('site-config', async () => {
    if (!enabled) return fallbackConfig
    try {
      const { data } = await useStoryblokApi().get('cdn/stories/config', {
        version: storyblokVersion as 'draft' | 'published',
      })
      return data.story.content as Record<string, any>
    }
    catch {
      return fallbackConfig
    }
  }, { default: () => fallbackConfig })
}
