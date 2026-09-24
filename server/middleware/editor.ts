const CDN_HOSTS: Record<string, string> = {
  eu: 'https://api.storyblok.com'
}

export default defineEventHandler(async (event) => {
  const { pathname } = getRequestURL(event)
  if (!pathname.endsWith('/editor.html')) return

  const { storyblok, storyblokVersion } = useRuntimeConfig(event).public
  const token = storyblok?.accessToken
  if (!token) {
    throw createError({ statusCode: 404, statusMessage: 'Storyblok is not connected (NUXT_STORYBLOK_TOKEN is empty)' })
  }

  const pagePath = pathname.replace(/\/?editor\.html$/, '').replace(/^\/en(?=\/|$)/, '')
  const slug = pagePath.replace(/^\//, '') || 'home'
  const cdn = `${CDN_HOSTS[storyblok.apiOptions?.region ?? 'eu'] ?? CDN_HOSTS.eu}/v2/cdn`

  const { space } = await $fetch<{ space: { id: number } }>(`${cdn}/spaces/me`, { query: { token } })
  const spaces = `https://app.storyblok.com/#/me/spaces/${space.id}`

  try {
    const { story } = await $fetch<{ story: { id: number } }>(`${cdn}/stories/${slug}`, {
      query: { token, version: storyblokVersion },
    })
    return sendRedirect(event, `${spaces}/stories/0/0/${story.id}`, 302)
  }
  catch {
    return sendRedirect(event, `${spaces}/stories`, 302)
  }
})
