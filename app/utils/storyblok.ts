export interface StoryblokLink {
  linktype?: 'url' | 'story' | 'email' | 'asset'
  url?: string
  cached_url?: string
  email?: string
  anchor?: string
  target?: '_blank' | '_self'
}

export function toLines(text?: string): string[] {
  return (text ?? '').split(/\r?\n/).map(line => line.trim()).filter(Boolean)
}

export function linkHref(link?: StoryblokLink): string {
  if (!link) return '#'

  if (link.linktype === 'email') {
    const address = link.email || link.url || ''
    return address.startsWith('mailto:') ? address : `mailto:${address}`
  }

  if (link.linktype === 'story') {
    const slug = (link.cached_url || '').replace(/^\/|\/$/g, '')
    const path = slug === 'home' ? '/' : `/${slug}`
    return link.anchor ? `${path}#${link.anchor}` : path
  }

  return link.url || link.cached_url || '#'
}
