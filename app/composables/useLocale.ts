import { defaultLocale, messages, type Locale } from '~/i18n/messages'

export function localeFromPath(path: string): Locale {
  return path === '/en' || path.startsWith('/en/') || path.startsWith('/en#') ? 'en' : defaultLocale
}

export function stripLocale(path: string): string {
  return localeFromPath(path) === 'en' ? path.slice(3) || '/' : path
}

export function localizePath(path: string, locale: Locale): string {
  if (locale === defaultLocale || !path.startsWith('/') || localeFromPath(path) === 'en') return path
  if (path === '/') return '/en'
  if (path.startsWith('/#') || path.startsWith('/?')) return `/en${path.slice(1)}`
  return `/en${path}`
}

export function useLocale() {
  const route = useRoute()
  const locale = computed(() => localeFromPath(route.path))
  const t = computed(() => messages[locale.value])

  return {
    locale,
    t,
    localePath: (path: string) => localizePath(path, locale.value),
    switchLocalePath: (target: Locale) => localizePath(stripLocale(route.path), target),
  }
}
