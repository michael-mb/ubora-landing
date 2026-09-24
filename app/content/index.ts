// Contenu local utilisé tant que Storyblok n'est pas connecté (pas de NUXT_STORYBLOK_TOKEN).
// Même structure que le contenu des stories Storyblok : `scripts/storyblok-setup.mjs`
// s'en sert pour créer les stories initiales dans l'espace.
import home from './home.json'
import config from './config.json'

export const fallbackPages: Record<string, any> = { home }
export const fallbackConfig: Record<string, any> = config
